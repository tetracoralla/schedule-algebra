import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { ScheduleExecutor } from "../src/executor.js";
import { request, schedule } from "./fixtures.js";

const validRequest = () => request("union", [schedule("a", [{ start: 1, end: 2 }])]);
const processSource = await readFile(
  new URL("../plugins/schedule-algebra/runtime/process-entry.mjs", import.meta.url),
  "utf8",
);

describe("isolated schedule executor", () => {
  it("rejects non-JSON input before starting a worker", async () => {
    const executor = new ScheduleExecutor();
    try {
      await expect(executor.run(undefined)).resolves.toMatchObject({
        ok: false,
        error: { code: "INVALID_INPUT" },
      });
    } finally {
      executor.close();
    }
  });

  it("terminates a timed-out worker and recovers on the same executor", async () => {
    const executor = new ScheduleExecutor();
    try {
      await expect(executor.run(validRequest(), { timeoutMs: 1 })).resolves.toMatchObject({
        ok: false,
        error: { code: "EXECUTION_TIMEOUT" },
      });
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: true,
        operation: "union",
      });
    } finally {
      executor.close();
    }
  });

  it("terminates a cancelled worker and recovers on the same executor", async () => {
    const executor = new ScheduleExecutor();
    const controller = new AbortController();
    try {
      const cancelled = executor.run(validRequest(), { signal: controller.signal });
      controller.abort();
      await expect(cancelled).resolves.toMatchObject({
        ok: false,
        error: { code: "EXECUTION_CANCELLED" },
      });
      await expect(executor.run(validRequest())).resolves.toMatchObject({ ok: true });
    } finally {
      executor.close();
    }
  });

  it("bounds concurrent work and rejects overflow without growing the queue", async () => {
    const executor = new ScheduleExecutor({
      maxConcurrent: 1,
      maxQueue: 1,
      timeoutMs: 1_000,
      workerUrl: new URL("./fixtures/slow-worker.mjs", import.meta.url),
    });
    try {
      const active = executor.run(validRequest());
      const queued = executor.run(validRequest());
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: false,
        error: { code: "SERVER_BUSY" },
      });
      await Promise.all([active, queued]);
    } finally {
      executor.close();
    }
  });

  it("cancels queued work when the executor closes", async () => {
    const executor = new ScheduleExecutor({
      maxConcurrent: 1,
      maxQueue: 1,
      timeoutMs: 1_000,
      workerUrl: new URL("./fixtures/slow-worker.mjs", import.meta.url),
    });
    const active = executor.run(validRequest());
    const queued = executor.run(validRequest());
    executor.close();
    await expect(active).resolves.toMatchObject({
      ok: false,
      error: { code: "EXECUTION_CANCELLED" },
    });
    await expect(queued).resolves.toMatchObject({
      ok: false,
      error: { code: "EXECUTION_CANCELLED" },
    });
  });

  it("keeps worker failure details out of the Agent result and logs them for operators", async () => {
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const executor = new ScheduleExecutor({
      workerUrl: new URL("./fixtures/failing-worker.mjs", import.meta.url),
    });
    try {
      const result = await executor.run(validRequest());
      expect(result).toMatchObject({
        ok: false,
        error: { code: "EXECUTION_FAILED", message: "schedule worker failed" },
      });
      expect(result.error).not.toHaveProperty("details");
      expect(stderr).toHaveBeenCalledWith(expect.stringContaining("intentional worker failure"));
    } finally {
      executor.close();
      stderr.mockRestore();
    }
  });
});

describe("isolated process executor", () => {
  it("terminates a timed-out process and recovers on the same executor", async () => {
    const executor = new ScheduleExecutor({ processSource });
    try {
      await expect(executor.run(validRequest(), { timeoutMs: 1 })).resolves.toMatchObject({
        ok: false,
        error: { code: "EXECUTION_TIMEOUT" },
      });
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: true,
        operation: "union",
      });
    } finally {
      executor.close();
    }
  });

  it("terminates a cancelled process and recovers on the same executor", async () => {
    const executor = new ScheduleExecutor({ processSource });
    const controller = new AbortController();
    try {
      const cancelled = executor.run(validRequest(), { signal: controller.signal });
      controller.abort();
      await expect(cancelled).resolves.toMatchObject({
        ok: false,
        error: { code: "EXECUTION_CANCELLED" },
      });
      await expect(executor.run(validRequest())).resolves.toMatchObject({ ok: true });
    } finally {
      executor.close();
    }
  });

  it("bounds process work and rejects queue overflow", async () => {
    const slowProcessSource = `
      await new Promise((resolve) => setTimeout(resolve, 25));
      process.stdout.write(JSON.stringify({
        ok: false,
        error: { code: "EXECUTION_FAILED", message: "slow process fixture completed" }
      }));
    `;
    const executor = new ScheduleExecutor({
      maxConcurrent: 1,
      maxQueue: 1,
      timeoutMs: 1_000,
      processSource: slowProcessSource,
    });
    try {
      const active = executor.run(validRequest());
      const queued = executor.run(validRequest());
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: false,
        error: { code: "SERVER_BUSY" },
      });
      await Promise.all([active, queued]);
    } finally {
      executor.close();
    }
  });

  it("keeps process failure details out of the Agent result and logs them for operators", async () => {
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const executor = new ScheduleExecutor({
      processSource: 'throw new Error("intentional process failure");',
    });
    try {
      const result = await executor.run(validRequest());
      expect(result).toMatchObject({
        ok: false,
        error: {
          code: "EXECUTION_FAILED",
          message: "schedule process exited before returning a result",
        },
      });
      expect(result.error).not.toHaveProperty("details");
      expect(stderr).toHaveBeenCalledWith(expect.stringContaining("intentional process failure"));
    } finally {
      executor.close();
      stderr.mockRestore();
    }
  });

  it("rejects a successful process exit whose JSON is not a schedule result", async () => {
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const executor = new ScheduleExecutor({ processSource: 'process.stdout.write("null");' });
    try {
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: false,
        error: {
          code: "EXECUTION_FAILED",
          message: "schedule process returned an invalid result",
        },
      });
      expect(stderr).toHaveBeenCalledWith(
        expect.stringContaining("isolated process returned a non-result JSON value"),
      );
    } finally {
      executor.close();
      stderr.mockRestore();
    }
  });

  it("retries one abnormal process exit within the cumulative deadline", async () => {
    const temporaryRoot = await mkdtemp(join(tmpdir(), "schedule-algebra-process-retry-"));
    const marker = join(temporaryRoot, "attempted");
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const executor = new ScheduleExecutor({
      timeoutMs: 1_000,
      processSource: `
        import { existsSync, writeFileSync } from "node:fs";
        const marker = ${JSON.stringify(marker)};
        if (!existsSync(marker)) {
          writeFileSync(marker, "attempted");
          throw new Error("transient process exit");
        }
        process.stdout.write(JSON.stringify({
          ok: false,
          error: { code: "INVALID_INPUT", message: "retry recovered" }
        }));
      `,
    });
    try {
      await expect(executor.run(validRequest())).resolves.toMatchObject({
        ok: false,
        error: { code: "INVALID_INPUT", message: "retry recovered" },
      });
      expect(stderr).toHaveBeenCalledWith(expect.stringContaining("process retry"));
    } finally {
      executor.close();
      stderr.mockRestore();
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  });
});
