import assert from "node:assert/strict";
import { access, cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const root = process.cwd();
if (process.argv.length !== 2) {
  throw new Error("check-plugin validates only the repository-owned plugin and accepts no path arguments");
}
const pluginRoot = resolve(root, "plugins/schedule-algebra");
const manifest = JSON.parse(await readFile(resolve(pluginRoot, ".codex-plugin/plugin.json"), "utf8"));
const mcp = JSON.parse(await readFile(resolve(pluginRoot, ".mcp.json"), "utf8"));
const skill = await readFile(
  resolve(pluginRoot, "skills/calculate-schedules/SKILL.md"),
  "utf8",
);

assert.equal(manifest.name, "schedule-algebra");
assert.equal(manifest.license, "Apache-2.0");
assert.deepEqual(mcp.mcpServers?.["schedule-algebra"]?.args, ["runtime/schedule-algebra-mcp.mjs"]);
assert.match(skill, /Do not derive the horizon from interval endpoints/);
assert.match(skill, /`COUNT` or `UNTIL` does not replace `maxOccurrences`/);
assert.match(skill, /Make no `schedule_run` call and do not calculate or infer an answer/);
const marketplace = JSON.parse(
  await readFile(resolve(root, ".agents/plugins/marketplace.json"), "utf8"),
);
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
assert.equal(manifest.version, packageJson.version);
assert.equal(marketplace.name, "schedule-algebra");
assert.equal(marketplace.plugins?.[0]?.source?.path, "./plugins/schedule-algebra");
await access(resolve(pluginRoot, "runtime/schedule-algebra-mcp.mjs"));
await access(resolve(pluginRoot, "runtime/worker-entry.mjs"));
for (const legalFile of ["LICENSE", "NOTICE", "THIRD_PARTY_NOTICES.md"]) {
  assert.equal(
    await readFile(resolve(pluginRoot, legalFile), "utf8"),
    await readFile(resolve(root, legalFile), "utf8"),
  );
}

const temporaryRoot = await mkdtemp(join(tmpdir(), "schedule-algebra-plugin-check-"));
const isolatedPlugin = resolve(temporaryRoot, "schedule-algebra");
try {
  await cp(pluginRoot, isolatedPlugin, { recursive: true });
  const transport = new StdioClientTransport({
    command: "node",
    args: ["runtime/schedule-algebra-mcp.mjs"],
    cwd: isolatedPlugin,
    stderr: "pipe",
  });
  const client = new Client({ name: "schedule-algebra-plugin-check", version: "0.1.0" });
  await client.connect(transport);
  try {
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 1);
    assert.equal(tools.tools[0]?.name, "schedule_run");
    assert.equal(tools.tools[0]?.inputSchema.additionalProperties, false);
    assert.match(
      tools.tools[0]?.inputSchema.properties?.schedules?.items?.properties?.id?.description ?? "",
      /ASCII technical identifier/,
    );
    const result = await client.callTool({
      name: "schedule_run",
      arguments: {
        operation: "intersection",
        horizon: { start: "2026-09-01T00:00:00Z", end: "2026-09-02T00:00:00Z" },
        schedules: [
          { id: "a", intervals: [{ start: "2026-09-01T09:00:00Z", end: "2026-09-01T12:00:00Z" }] },
          { id: "b", intervals: [{ start: "2026-09-01T10:00:00Z", end: "2026-09-01T11:00:00Z" }] },
        ],
      },
    });
    assert.equal(result.isError, false);
    assert.deepEqual(result.structuredContent?.intervals?.[0], {
      start: "2026-09-01T10:00:00Z",
      end: "2026-09-01T11:00:00Z",
      sources: ["a/interval/item-1", "b/interval/item-1"],
    });
    const invalid = await client.callTool({ name: "schedule_run", arguments: {} });
    assert.equal(invalid.isError, true);
    assert.equal(invalid.structuredContent?.error?.code, "INVALID_INPUT");
    const recovered = await client.callTool({
      name: "schedule_run",
      arguments: {
        operation: "gaps",
        horizon: { start: "2026-09-01T00:00:00Z", end: "2026-09-02T00:00:00Z" },
        schedules: [
          { id: "a", intervals: [{ start: "2026-09-01T09:00:00Z", end: "2026-09-01T12:00:00Z" }] },
        ],
      },
    });
    assert.equal(recovered.isError, false);
  } finally {
    await client.close();
  }
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write("isolated plugin structure and MCP runtime: PASS\n");
