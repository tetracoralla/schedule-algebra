import { readFile, stat } from "node:fs/promises";

const required = [
  "AGENTS.md",
  "README.md",
  "LICENSE",
  "NOTICE",
  "THIRD_PARTY_NOTICES.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  ".github/workflows/ci.yml",
  ".github/dependabot.yml",
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
  "src/process-entry.ts",
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
  "plugins/schedule-algebra/runtime/process-entry.mjs",
  "plugins/schedule-algebra/runtime/worker-entry.mjs",
  "plugins/schedule-algebra/LICENSE",
  "plugins/schedule-algebra/NOTICE",
  "plugins/schedule-algebra/THIRD_PARTY_NOTICES.md",
  ".agents/plugins/marketplace.json",
];
for (const file of required) await stat(file);

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
if (packageJson.private !== true || packageJson.license !== "Apache-2.0") {
  throw new Error("source is Apache-2.0; the package remains private to prevent accidental npm publication");
}
if (packageJson.author?.name !== "openAdam") {
  throw new Error("public package attribution must name openAdam");
}
if (packageJson.repository?.url !== "https://github.com/tetracoralla/schedule-algebra.git") {
  throw new Error("public repository identity drifted");
}
const thirdPartyNotices = await readFile("THIRD_PARTY_NOTICES.md", "utf8");
for (const bundledInstance of ["## zod-to-json-schema@3.25.2"]) {
  if (!thirdPartyNotices.includes(bundledInstance)) {
    throw new Error(`third-party notices lost a bundled package instance: ${bundledInstance}`);
  }
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
for (const invariant of [
  "new Worker",
  "spawn(process.execPath",
  "allowDirectFallback",
  "runDirect",
  "resourceLimits",
  "EXECUTION_TIMEOUT",
  "SERVER_BUSY",
]) {
  if (!executor.includes(invariant)) {
    throw new Error(`executor boundary lost required invariant: ${invariant}`);
  }
}
console.log("repository invariants: PASS");
