import { spawn } from "node:child_process";
import { once } from "node:events";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { afterEach, describe, expect, it } from "vitest";
import { createScheduleServer } from "../src/http.js";
import { request, schedule } from "./fixtures.js";

const openServers: ReturnType<typeof createScheduleServer>[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
});

describe("CLI runtime", () => {
  it("returns structured success and stable invalid failure", async () => {
    const valid = await runCli(
      JSON.stringify(request("union", [schedule("a", [{ start: 1, end: 2 }])])),
    );
    expect(valid.code).toBe(0);
    expect(JSON.parse(valid.stdout)).toMatchObject({ ok: true, operation: "union" });

    const invalid = await runCli("{}");
    expect(invalid.code).toBe(2);
    expect(invalid.stdout).toContain("INVALID_INPUT");
  });
});

async function runCli(input: string): Promise<{ code: number | null; stdout: string; stderr: string }> {
  const child = spawn("node", ["dist/cli.js"], {
    cwd: process.cwd(),
    stdio: ["pipe", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk: string) => (stdout += chunk));
  child.stderr.setEncoding("utf8").on("data", (chunk: string) => (stderr += chunk));
  child.stdin.end(input);
  const [code] = (await once(child, "close")) as [number | null];
  return { code, stdout, stderr };
}

describe("stdio MCP runtime", () => {
  it("lists one read-only tool, calls it, rejects invalid input, and recovers", async () => {
    const transport = new StdioClientTransport({
      command: "node",
      args: ["dist/mcp.js"],
      cwd: process.cwd(),
      stderr: "pipe",
    });
    const client = new Client({ name: "schedule-algebra-test", version: "0.1.0" });
    await client.connect(transport);
    try {
      const listed = await client.listTools();
      expect(listed.tools).toHaveLength(1);
      expect(listed.tools[0]).toMatchObject({
        name: "schedule_run",
        annotations: { readOnlyHint: true, idempotentHint: true },
      });
      expect(listed.tools[0]?.inputSchema).toMatchObject({ additionalProperties: false });

      const valid = await client.callTool({
        name: "schedule_run",
        arguments: request("union", [schedule("a", [{ start: 1, end: 2 }])]),
      });
      expect(valid.isError).toBe(false);
      expect(valid.structuredContent).toMatchObject({ ok: true, operation: "union" });

      const invalid = await client.callTool({ name: "schedule_run", arguments: {} });
      expect(invalid.isError).toBe(true);
      expect(invalid.structuredContent).toMatchObject({ ok: false, error: { code: "INVALID_INPUT" } });

      const recovered = await client.callTool({
        name: "schedule_run",
        arguments: request("gaps", [schedule("a", [{ start: 1, end: 9 }])]),
      });
      expect(recovered.isError).toBe(false);
    } finally {
      await client.close();
    }
  });
});

describe("HTTP and human UI runtime", () => {
  it("serves the UI, runs a request, exposes invalid state, and recovers", async () => {
    const server = createScheduleServer();
    openServers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("missing address");
    const base = `http://127.0.0.1:${address.port}`;

    const page = await fetch(base);
    expect(page.status).toBe(200);
    expect(await page.text()).toContain("Schedule Algebra");

    const valid = await fetch(`${base}/api/run`, {
      method: "POST",
      body: JSON.stringify(request("intersection", [schedule("a", [{ start: 1, end: 4 }]), schedule("b", [{ start: 2, end: 3 }])])),
    });
    expect(valid.status).toBe(200);
    expect(await valid.json()).toMatchObject({ ok: true, intervals: [{ start: "2025-01-01T02:00:00Z" }] });

    const invalid = await fetch(`${base}/api/run`, { method: "POST", body: "{" });
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toMatchObject({ ok: false, error: { code: "INVALID_JSON" } });

    const oversized = await fetch(`${base}/api/run`, {
      method: "POST",
      body: "x".repeat(262_145),
    });
    expect(oversized.status).toBe(413);
    expect(await oversized.json()).toMatchObject({
      ok: false,
      error: { code: "LIMIT_EXCEEDED" },
    });

    const recovered = await fetch(`${base}/api/run`, {
      method: "POST",
      body: JSON.stringify(request("union", [schedule("a", [{ start: 1, end: 2 }])])),
    });
    expect(recovered.status).toBe(200);
  });
});
