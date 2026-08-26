import { describe, expect, it, vi } from "vitest";
import { ScheduleExecutor } from "../src/executor.js";
import { request, schedule } from "./fixtures.js";

const validRequest = () => request("union", [schedule("a", [{ start: 1, end: 2 }])]);

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
