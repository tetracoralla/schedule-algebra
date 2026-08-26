import { readFile, stat } from "node:fs/promises";

const required = [
  "AGENTS.md",
  "README.md",
  "docs/PRODUCT_MODEL.md",
  "docs/REVIEW_CONTRACT.md",
  "src/core.ts",
  "src/contract.ts",
  "src/instants.ts",
  "src/internal-model.ts",
  "src/interval-algebra.ts",
  "src/recurrence.ts",
  "src/executor.ts",
  "src/response-budget.ts",
  "src/worker-entry.ts",
  "src/cli.ts",
  "src/mcp.ts",
  "src/http.ts",
  "src/ui/client.ts",
  "src/ui/form.ts",
  "src/ui/instant.ts",
  "src/ui/page.ts",
  "src/ui/results.ts",
  "src/ui/run-coordinator.ts",
  "src/ui/styles.ts",
  "src/ui/time-canvas.ts",
  "scripts/measure-baseline.mjs",
  "plugins/schedule-algebra/.codex-plugin/plugin.json",
  "plugins/schedule-algebra/.mcp.json",
  "plugins/schedule-algebra/skills/calculate-schedules/SKILL.md",
  "plugins/schedule-algebra/runtime/schedule-algebra-mcp.mjs",
  "plugins/schedule-algebra/runtime/worker-entry.mjs",
  ".agents/plugins/marketplace.json",
];
for (const file of required) await stat(file);

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
if (packageJson.private !== true || packageJson.license !== "UNLICENSED") {
  throw new Error("MVP must remain private and UNLICENSED until the owner chooses release terms");
}
const mcp = await readFile("src/mcp.ts", "utf8");
if ((mcp.match(/name: "schedule_run"/g) ?? []).length !== 1) {
  throw new Error("the public MCP catalog must expose exactly one schedule_run tool");
}
if (!mcp.includes("readOnlyHint: true") || !mcp.includes("openWorldHint: false")) {
  throw new Error("MCP annotations drifted from the read-only closed-world contract");
}
const core = (
  await Promise.all(
    ["src/core.ts", "src/instants.ts", "src/interval-algebra.ts", "src/recurrence.ts"].map(
      (file) => readFile(file, "utf8"),
    ),
  )
).join("\n");
if (/\beval\s*\(|new Function\s*\(/.test(core)) {
  throw new Error("raw source evaluation is forbidden");
}
const externalAdapters = await Promise.all(
  ["src/cli.ts", "src/mcp.ts", "src/http.ts"].map((file) => readFile(file, "utf8")),
);
for (const adapter of externalAdapters) {
  if (!adapter.includes("ScheduleExecutor") || adapter.includes('from "./core.js"')) {
    throw new Error("every external adapter must route through the isolated ScheduleExecutor");
  }
}
const executor = await readFile("src/executor.ts", "utf8");
for (const invariant of ["new Worker", "resourceLimits", "EXECUTION_TIMEOUT", "SERVER_BUSY"]) {
  if (!executor.includes(invariant)) {
    throw new Error(`executor boundary lost required invariant: ${invariant}`);
  }
}
console.log("repository invariants: PASS");
