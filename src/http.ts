#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { pathToFileURL } from "node:url";
import { ScheduleExecutor } from "./executor.js";
import { PAGE } from "./ui/page.js";
import { STYLES } from "./ui/styles.js";

const MAX_BODY_BYTES = 262_144;
const UI_MODULES = new Set(["client.js", "form.js", "results.js", "time-canvas.js"]);

class BodyLimitError extends Error {}

export function createScheduleServer(executor = new ScheduleExecutor()) {
  const server = createServer(async (request, response) => {
    try {
      await handleRequest(request, response, executor);
    } catch (error) {
      const isLimit = error instanceof BodyLimitError;
      sendJson(response, isLimit ? 413 : 500, {
        ok: false,
        error: {
          code: isLimit ? "LIMIT_EXCEEDED" : "HTTP_ERROR",
          message: error instanceof Error ? error.message : "error",
        },
      });
    }
  });
  server.once("close", () => executor.close());
  return server;
}

async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse,
  executor: ScheduleExecutor,
): Promise<void> {
  if (request.method === "GET" && request.url === "/") {
    sendText(response, 200, PAGE, "text/html; charset=utf-8", {
      "content-security-policy":
        "default-src 'none'; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'",
    });
    return;
  }
  if (request.method === "GET" && request.url === "/app.css") {
    sendText(response, 200, STYLES, "text/css; charset=utf-8");
    return;
  }
  if (request.method === "GET" && request.url?.startsWith("/ui/")) {
    const moduleName = request.url.slice("/ui/".length);
    if (UI_MODULES.has(moduleName)) {
      sendText(
        response,
        200,
        await readFile(uiModuleUrl(moduleName), "utf8"),
        "text/javascript; charset=utf-8",
      );
      return;
    }
    sendJson(response, 404, { ok: false, error: { code: "NOT_FOUND", message: "not found" } });
    return;
  }
  if (request.method === "POST" && request.url === "/api/run") {
    const raw = await readBody(request);
    let input: unknown;
    try {
      input = JSON.parse(raw);
    } catch {
      sendJson(response, 400, {
        ok: false,
        error: { code: "INVALID_JSON", message: "request body must be JSON" },
      });
      return;
    }
    const controller = new AbortController();
    const abort = () => controller.abort();
    request.once("aborted", abort);
    response.once("close", () => {
      if (!response.writableEnded) abort();
    });
    const result = await executor.run(input, { signal: controller.signal });
    request.removeListener("aborted", abort);
    if (response.destroyed) return;
    sendJson(response, result.ok ? 200 : 400, result);
    return;
  }
  sendJson(response, 404, { ok: false, error: { code: "NOT_FOUND", message: "not found" } });
}

async function readBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let length = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    length += buffer.length;
    if (length > MAX_BODY_BYTES) throw new BodyLimitError("request body exceeds 262144 bytes");
    chunks.push(buffer);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(response: ServerResponse, status: number, value: unknown): void {
  const body = `${JSON.stringify(value)}\n`;
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(body);
}

function sendText(
  response: ServerResponse,
  status: number,
  body: string,
  contentType: string,
  headers: Record<string, string> = {},
): void {
  response.writeHead(status, {
    "content-type": contentType,
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...headers,
  });
  response.end(body);
}

function uiModuleUrl(moduleName: string): URL {
  if (import.meta.url.endsWith(".ts")) {
    return new URL(`../dist/ui/${moduleName}`, import.meta.url);
  }
  return new URL(`./ui/${moduleName}`, import.meta.url);
}

function isEntrypoint(): boolean {
  return process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;
}

if (isEntrypoint()) {
  const portIndex = process.argv.indexOf("--port");
  const requestedPort = portIndex >= 0 ? Number(process.argv[portIndex + 1]) : 4317;
  if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65_535) {
    process.stderr.write("--port must be an integer from 0 to 65535\n");
    process.exit(2);
  }
  const server = createScheduleServer();
  server.listen(requestedPort, "127.0.0.1", () => {
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : requestedPort;
    process.stdout.write(`${JSON.stringify({ event: "listening", url: `http://127.0.0.1:${port}` })}\n`);
  });
  for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.on(signal, () => server.close(() => process.exit(0)));
  }
}
