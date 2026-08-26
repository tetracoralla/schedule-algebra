import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { Writable } from "node:stream";
import { Worker, type ResourceLimits } from "node:worker_threads";
import type { ScheduleFailure, ScheduleResult } from "./contract.js";
import { MAX_REQUEST_BYTES, MAX_RESPONSE_BYTES } from "./internal-model.js";

declare const __SCHEDULE_ALGEBRA_WORKER_URL__: string;
declare const __SCHEDULE_ALGEBRA_PROCESS_SOURCE__: string;

const DEFAULT_TIMEOUT_MS = 2_000;
const DEFAULT_MAX_CONCURRENT = 2;
const DEFAULT_MAX_QUEUE = 32;
const DEFAULT_RESOURCE_LIMITS: ResourceLimits = {
  maxOldGenerationSizeMb: 64,
  maxYoungGenerationSizeMb: 16,
  stackSizeMb: 4,
};

export interface ScheduleExecutorOptions {
  timeoutMs?: number;
  maxConcurrent?: number;
  maxQueue?: number;
  resourceLimits?: ResourceLimits;
  processSource?: string;
  workerUrl?: URL;
}

export interface ScheduleRunOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

interface QueueJob {
  serialized: string;
  deadline: number;
  controller: AbortController;
  externalSignal?: AbortSignal;
  externalAbort?: () => void;
  resolve: (result: ScheduleResult) => void;
  started: boolean;
  settled: boolean;
}

export class ScheduleExecutor {
  private readonly timeoutMs: number;
  private readonly maxConcurrent: number;
  private readonly maxQueue: number;
  private readonly resourceLimits: ResourceLimits;
  private readonly processSource: string | undefined;
  private readonly workerUrl: URL | undefined;
  private readonly jobs = new Set<QueueJob>();
  private queue: QueueJob[] = [];
  private active = 0;
  private closed = false;

  constructor(options: ScheduleExecutorOptions = {}) {
    this.timeoutMs = positiveInteger(options.timeoutMs, DEFAULT_TIMEOUT_MS, "timeoutMs");
    this.maxConcurrent = positiveInteger(
      options.maxConcurrent,
      DEFAULT_MAX_CONCURRENT,
      "maxConcurrent",
    );
    this.maxQueue = nonNegativeInteger(options.maxQueue, DEFAULT_MAX_QUEUE, "maxQueue");
    this.resourceLimits = options.resourceLimits ?? DEFAULT_RESOURCE_LIMITS;
    this.processSource = options.processSource ?? (options.workerUrl ? undefined : defaultProcessSource());
    this.workerUrl = this.processSource === undefined ? (options.workerUrl ?? defaultWorkerUrl()) : undefined;
  }

  run(input: unknown, options: ScheduleRunOptions = {}): Promise<ScheduleResult> {
    if (this.closed) {
      return Promise.resolve(failure("EXECUTION_FAILED", "schedule executor is closed"));
    }
    if (options.signal?.aborted) {
      return Promise.resolve(failure("EXECUTION_CANCELLED", "schedule execution was cancelled"));
    }

    let serialized: string | undefined;
    try {
      serialized = JSON.stringify(input);
    } catch {
      return Promise.resolve(failure("INVALID_INPUT", "request must be JSON serializable"));
    }
    if (serialized === undefined) {
      return Promise.resolve(failure("INVALID_INPUT", "request must be a JSON value"));
    }
    const requestBytes = Buffer.byteLength(serialized, "utf8");
    if (requestBytes > MAX_REQUEST_BYTES) {
      return Promise.resolve(
        failure("LIMIT_EXCEEDED", "request exceeds 262144 UTF-8 bytes", {
          requestBytes,
          limitBytes: MAX_REQUEST_BYTES,
        }),
      );
    }
    if (this.active >= this.maxConcurrent && this.queue.length >= this.maxQueue) {
      return Promise.resolve(
        failure("SERVER_BUSY", "schedule executor queue is full", {
          maxConcurrent: this.maxConcurrent,
          maxQueue: this.maxQueue,
        }),
      );
    }

    const timeoutMs = positiveInteger(options.timeoutMs, this.timeoutMs, "timeoutMs");
    return new Promise<ScheduleResult>((resolve) => {
      const controller = new AbortController();
      const job: QueueJob = {
        serialized,
        deadline: performance.now() + timeoutMs,
        controller,
        resolve,
        started: false,
        settled: false,
        ...(options.signal ? { externalSignal: options.signal } : {}),
      };
      if (options.signal) {
        const abort = () => controller.abort();
        job.externalAbort = abort;
        options.signal.addEventListener("abort", abort, { once: true });
      }
      this.jobs.add(job);
      if (this.active < this.maxConcurrent) this.start(job);
      else this.queue.push(job);
    });
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    for (const job of this.jobs) {
      job.controller.abort();
      if (!job.started) {
        this.complete(job, failure("EXECUTION_CANCELLED", "schedule execution was cancelled"));
      }
    }
    this.queue = [];
  }

  private start(job: QueueJob): void {
    if (job.settled) return;
    if (job.controller.signal.aborted) {
      this.complete(job, failure("EXECUTION_CANCELLED", "schedule execution was cancelled"));
      this.pump();
      return;
    }
    const remainingMs = Math.ceil(job.deadline - performance.now());
    if (remainingMs <= 0) {
      this.complete(job, failure("EXECUTION_TIMEOUT", "schedule execution timed out in queue"));
      this.pump();
      return;
    }

    job.started = true;
    this.active += 1;
    const execution = this.processSource === undefined
      ? runWorker(
          job.serialized,
          this.workerUrl as URL,
          this.resourceLimits,
          remainingMs,
          job.controller.signal,
        )
      : runProcess(
          job.serialized,
          this.processSource,
          this.resourceLimits,
          job.deadline,
          job.controller.signal,
        );
    void execution.then((result) => {
      this.complete(job, result);
      this.active -= 1;
      this.pump();
    });
  }

  private pump(): void {
    while (this.active < this.maxConcurrent && this.queue.length > 0) {
      const job = this.queue.shift();
      if (job && !job.settled) this.start(job);
    }
  }

  private complete(job: QueueJob, result: ScheduleResult): void {
    if (job.settled) return;
    job.settled = true;
    this.jobs.delete(job);
    if (job.externalSignal && job.externalAbort) {
      job.externalSignal.removeEventListener("abort", job.externalAbort);
    }
    job.resolve(result);
  }
}

function runProcess(
  serialized: string,
  processSource: string,
  resourceLimits: ResourceLimits,
  deadline: number,
  signal: AbortSignal,
): Promise<ScheduleResult> {
  return runProcessAttempt(
    serialized,
    processSource,
    resourceLimits,
    Math.max(1, Math.ceil(deadline - performance.now())),
    signal,
  ).then(async (result) => {
    if (!isRetryableProcessFailure(result) || signal.aborted) return result;
    const remainingMs = Math.ceil(deadline - performance.now());
    if (remainingMs <= 0) {
      return failure("EXECUTION_TIMEOUT", "schedule execution exceeded its deadline");
    }
    operatorDiagnostic("process retry", "retrying one abnormal installed-process exit");
    return runProcessAttempt(serialized, processSource, resourceLimits, remainingMs, signal);
  });
}

function runProcessAttempt(
  serialized: string,
  processSource: string,
  resourceLimits: ResourceLimits,
  timeoutMs: number,
  signal: AbortSignal,
): Promise<ScheduleResult> {
  return new Promise((resolve) => {
    let settled = false;
    let timeout: NodeJS.Timeout | undefined;
    let child: ChildProcessWithoutNullStreams;
    let stdoutBytes = 0;
    const stdoutChunks: Buffer[] = [];
    let stderr = "";

    const finish = (result: ScheduleResult, terminate = false) => {
      if (settled) return;
      settled = true;
      if (timeout) clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      if (terminate && !child.killed) child.kill("SIGKILL");
      resolve(result);
    };
    const onAbort = () =>
      finish(failure("EXECUTION_CANCELLED", "schedule execution was cancelled"), true);

    try {
      child = spawn(process.execPath, processResourceArgs(resourceLimits), {
        stdio: ["pipe", "pipe", "pipe", "pipe"],
        windowsHide: true,
      });
    } catch (error) {
      operatorDiagnostic("process start failed", error);
      resolve(failure("EXECUTION_FAILED", "schedule process failed to start"));
      return;
    }

    child.stdout.on("data", (chunk: Buffer) => {
      if (settled) return;
      stdoutBytes += chunk.byteLength;
      if (stdoutBytes > MAX_RESPONSE_BYTES) {
        operatorDiagnostic("process output failed", "response exceeded the configured byte limit");
        finish(failure("EXECUTION_FAILED", "schedule process returned an invalid result"), true);
        return;
      }
      stdoutChunks.push(chunk);
    });
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
      if (stderr.length < 8_192) stderr += chunk.slice(0, 8_192 - stderr.length);
    });
    child.stdin.on("error", () => undefined);
    const inputStream = child.stdio[3] as Writable | null;
    if (!inputStream) {
      operatorDiagnostic("process start failed", "dedicated input pipe is unavailable");
      finish(failure("EXECUTION_FAILED", "schedule process failed to start"), true);
      return;
    }
    inputStream.on("error", () => undefined);
    child.once("error", (error) => {
      operatorDiagnostic("process error", error);
      finish(failure("EXECUTION_FAILED", "schedule process failed"), true);
    });
    child.once("close", (code, processSignal) => {
      if (settled) return;
      if (code !== 0) {
        operatorDiagnostic(
          "process exit failed",
          `${stderr || "no stderr"}; code=${String(code)}; signal=${String(processSignal)}`,
        );
        const resourceLimit = /heap out of memory|allocation failed/i.test(stderr);
        finish(
          failure(
            resourceLimit ? "EXECUTION_RESOURCE_LIMIT" : "EXECUTION_FAILED",
            resourceLimit
              ? "schedule execution exceeded its memory limit"
              : "schedule process exited before returning a result",
          ),
        );
        return;
      }
      try {
        const result = scheduleResultFromUnknown(
          JSON.parse(Buffer.concat(stdoutChunks).toString("utf8")),
        );
        if (!result) throw new Error("isolated process returned a non-result JSON value");
        finish(result);
      } catch (error) {
        operatorDiagnostic("process result failed", error);
        finish(failure("EXECUTION_FAILED", "schedule process returned an invalid result"));
      }
    });
    signal.addEventListener("abort", onAbort, { once: true });
    timeout = setTimeout(
      () => finish(failure("EXECUTION_TIMEOUT", "schedule execution exceeded its deadline"), true),
      timeoutMs,
    );
    child.stdin.end(processSource);
    inputStream.end(serialized);
  });
}

function isRetryableProcessFailure(result: ScheduleResult): boolean {
  return (
    !result.ok &&
    result.error.code === "EXECUTION_FAILED" &&
    [
      "schedule process failed to start",
      "schedule process failed",
      "schedule process exited before returning a result",
    ].includes(result.error.message)
  );
}

function scheduleResultFromUnknown(value: unknown): ScheduleResult | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  if (record.ok === true && typeof record.operation === "string" && Array.isArray(record.intervals)) {
    return value as ScheduleResult;
  }
  if (record.ok !== false || !record.error || typeof record.error !== "object") return undefined;
  const error = record.error as Record<string, unknown>;
  return typeof error.code === "string" && typeof error.message === "string"
    ? (value as ScheduleResult)
    : undefined;
}

function processResourceArgs(resourceLimits: ResourceLimits): string[] {
  const args: string[] = [];
  if (resourceLimits.maxOldGenerationSizeMb !== undefined) {
    args.push(`--max-old-space-size=${Math.max(1, Math.floor(resourceLimits.maxOldGenerationSizeMb))}`);
  }
  if (resourceLimits.maxYoungGenerationSizeMb !== undefined) {
    args.push(
      `--max-semi-space-size=${Math.max(1, Math.floor(resourceLimits.maxYoungGenerationSizeMb / 2))}`,
    );
  }
  if (resourceLimits.stackSizeMb !== undefined) {
    args.push(`--stack-size=${Math.max(1, Math.floor(resourceLimits.stackSizeMb * 1_024))}`);
  }
  args.push("--input-type=module");
  return args;
}

function runWorker(
  serialized: string,
  workerUrl: URL,
  resourceLimits: ResourceLimits,
  timeoutMs: number,
  signal: AbortSignal,
): Promise<ScheduleResult> {
  return new Promise((resolve) => {
    let settled = false;
    let timeout: NodeJS.Timeout | undefined;
    let worker: Worker;

    const finish = (result: ScheduleResult, terminate = false) => {
      if (settled) return;
      settled = true;
      if (timeout) clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      if (terminate) void worker.terminate();
      resolve(result);
    };
    const onAbort = () =>
      finish(failure("EXECUTION_CANCELLED", "schedule execution was cancelled"), true);

    try {
      worker = new Worker(workerUrl, { workerData: serialized, resourceLimits });
    } catch (error) {
      resolve(
        failure(
          "EXECUTION_FAILED",
          error instanceof Error ? error.message : "schedule worker failed to start",
        ),
      );
      return;
    }

    worker.once("message", (result: ScheduleResult) => finish(result));
    worker.once("error", (error) => {
      const resourceLimit = (error as NodeJS.ErrnoException).code === "ERR_WORKER_OUT_OF_MEMORY";
      const errorCode = (error as NodeJS.ErrnoException).code;
      const diagnostic = error instanceof Error ? (error.stack ?? error.message) : String(error);
      process.stderr.write(
        `[schedule-algebra] worker error${errorCode ? ` (${errorCode})` : ""}: ${diagnostic}\n`,
      );
      finish(
        failure(
          resourceLimit ? "EXECUTION_RESOURCE_LIMIT" : "EXECUTION_FAILED",
          resourceLimit ? "schedule execution exceeded its memory limit" : "schedule worker failed",
        ),
      );
    });
    worker.once("exit", (code) => {
      if (!settled && code !== 0) {
        finish(failure("EXECUTION_FAILED", "schedule worker exited before returning a result"));
      }
    });
    signal.addEventListener("abort", onAbort, { once: true });
    timeout = setTimeout(
      () => finish(failure("EXECUTION_TIMEOUT", "schedule execution exceeded its deadline"), true),
      timeoutMs,
    );
  });
}

function defaultWorkerUrl(): URL {
  if (typeof __SCHEDULE_ALGEBRA_WORKER_URL__ === "string") {
    return new URL(__SCHEDULE_ALGEBRA_WORKER_URL__);
  }
  if (import.meta.url.endsWith(".ts")) {
    return new URL("../dist/worker-entry.js", import.meta.url);
  }
  const entry = import.meta.url.endsWith(".mjs") ? "./worker-entry.mjs" : "./worker-entry.js";
  return new URL(entry, import.meta.url);
}

function defaultProcessSource(): string | undefined {
  if (typeof __SCHEDULE_ALGEBRA_PROCESS_SOURCE__ === "string") {
    return __SCHEDULE_ALGEBRA_PROCESS_SOURCE__;
  }
  return undefined;
}

function operatorDiagnostic(context: string, error: unknown): void {
  const diagnostic = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`[schedule-algebra] ${context}: ${diagnostic.slice(0, 8_192)}\n`);
}

function positiveInteger(value: number | undefined, fallback: number, name: string): number {
  const resolved = value ?? fallback;
  if (!Number.isInteger(resolved) || resolved <= 0) throw new Error(`${name} must be positive`);
  return resolved;
}

function nonNegativeInteger(value: number | undefined, fallback: number, name: string): number {
  const resolved = value ?? fallback;
  if (!Number.isInteger(resolved) || resolved < 0) throw new Error(`${name} must be non-negative`);
  return resolved;
}

function failure(
  code: ScheduleFailure["error"]["code"],
  message: string,
  details?: unknown,
): ScheduleFailure {
  return {
    ok: false,
    error: { code, message, ...(details === undefined ? {} : { details }) },
  };
}
