import { performance } from "node:perf_hooks";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ScheduleRequestSchema } from "../dist/contract.js";
import { runSchedule } from "../dist/core.js";
import { ScheduleExecutor } from "../dist/executor.js";
import { createScheduleServer } from "../dist/http.js";

const request = {
  operation: "intersection",
  horizon: { start: "2026-09-01T00:00:00Z", end: "2026-09-02T00:00:00Z" },
  schedules: [
    {
      id: "team-a",
      intervals: [{ start: "2026-09-01T09:00:00Z", end: "2026-09-01T12:00:00Z" }],
    },
    {
      id: "team-b",
      intervals: [{ start: "2026-09-01T10:00:00Z", end: "2026-09-01T11:00:00Z" }],
    },
  ],
};

const coreRuns = 20_000;
const coreStart = performance.now();
for (let index = 0; index < coreRuns; index += 1) runSchedule(request);
const coreElapsed = performance.now() - coreStart;

const coldExecutor = new ScheduleExecutor();
const coldStart = performance.now();
const coldResult = await coldExecutor.run(request);
const coldMs = performance.now() - coldStart;
coldExecutor.close();

const executor = new ScheduleExecutor();
const sequential = [];
for (let index = 0; index < 30; index += 1) {
  const start = performance.now();
  const result = await executor.run(request);
  if (!result.ok) throw new Error(`sequential run failed: ${result.error.code}`);
  sequential.push(performance.now() - start);
}

const burstStart = performance.now();
const burst = await Promise.all(Array.from({ length: 64 }, () => executor.run(request)));
const burstElapsed = performance.now() - burstStart;
const burstCounts = Object.create(null);
for (const result of burst) {
  const key = result.ok ? "ok" : result.error.code;
  burstCounts[key] = (burstCounts[key] ?? 0) + 1;
}
const recoveryStart = performance.now();
const recovery = await executor.run(request);
const recoveryMs = performance.now() - recoveryStart;
executor.close();

const server = createScheduleServer();
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const address = server.address();
if (!address || typeof address === "string") throw new Error("HTTP server did not expose a port");
const httpTimings = [];
try {
  for (let index = 0; index < 20; index += 1) {
    const start = performance.now();
    const response = await fetch(`http://127.0.0.1:${address.port}/api/run`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(`HTTP run failed: ${response.status}`);
    httpTimings.push(performance.now() - start);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

const schema = zodToJsonSchema(ScheduleRequestSchema, {
  $refStrategy: "none",
  target: "jsonSchema7",
});
const representative = runSchedule(request);

console.log(
  JSON.stringify(
    {
      label: "baseline-only-no-slo",
      core: {
        runs: coreRuns,
        totalMs: round(coreElapsed),
        microsecondsPerRun: round((coreElapsed * 1_000) / coreRuns),
      },
      isolatedExecutor: {
        coldMs: round(coldMs),
        coldOk: coldResult.ok,
        sequentialRuns: sequential.length,
        p50Ms: round(percentile(sequential, 0.5)),
        p95Ms: round(percentile(sequential, 0.95)),
        maxMs: round(Math.max(...sequential)),
      },
      burst: {
        requested: burst.length,
        elapsedMs: round(burstElapsed),
        counts: burstCounts,
        recoveryOk: recovery.ok,
        recoveryMs: round(recoveryMs),
      },
      loopbackHttp: {
        sequentialRuns: httpTimings.length,
        p50Ms: round(percentile(httpTimings, 0.5)),
        p95Ms: round(percentile(httpTimings, 0.95)),
        maxMs: round(Math.max(...httpTimings)),
      },
      payloadBytes: {
        request: Buffer.byteLength(JSON.stringify(request)),
        toolInputSchema: Buffer.byteLength(JSON.stringify(schema)),
        representativeResult: Buffer.byteLength(JSON.stringify(representative)),
      },
    },
    null,
    2,
  ),
);

function percentile(values, fraction) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)];
}

function round(value) {
  return Math.round(value * 100) / 100;
}
