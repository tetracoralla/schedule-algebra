import { Worker, type ResourceLimits } from "node:worker_threads";
import type { ScheduleFailure, ScheduleResult } from "./contract.js";
import { MAX_REQUEST_BYTES } from "./internal-model.js";

declare const __SCHEDULE_ALGEBRA_WORKER_URL__: string;

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
  private readonly workerUrl: URL;
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
    this.workerUrl = options.workerUrl ?? defaultWorkerUrl();
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
    void runWorker(
      job.serialized,
      this.workerUrl,
      this.resourceLimits,
      remainingMs,
      job.controller.signal,
    ).then((result) => {
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
