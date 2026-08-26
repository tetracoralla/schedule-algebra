#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ScheduleRequestSchema } from "./contract.js";
import type { ScheduleResult } from "./contract.js";
import { ScheduleExecutor } from "./executor.js";
import { MAX_RESPONSE_BYTES } from "./internal-model.js";
import { outputLimitFailure } from "./response-budget.js";

const inputSchema = zodToJsonSchema(ScheduleRequestSchema, {
  $refStrategy: "none",
  target: "jsonSchema7",
});

const server = new Server(
  { name: "schedule-algebra", version: "0.1.5" },
  { capabilities: { tools: {} } },
);
const executor = new ScheduleExecutor();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "schedule_run",
      title: "Run bounded schedule algebra",
      description:
        "Union, intersect, subtract, find gaps, or find real overlaps in explicit intervals and bounded zoned recurrences. Use for exact availability and schedule-set computation, not natural-language planning.",
      inputSchema: inputSchema as Record<string, unknown>,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
  if (request.params.name !== "schedule_run") {
    return {
      isError: true,
      content: [{ type: "text", text: "Unknown tool" }],
    };
  }
  const result = await executor.run(request.params.arguments, { signal: extra.signal });
  const response = toolResponse(result);
  const wireBytes = jsonRpcLineBytes(response);
  if (wireBytes > MAX_RESPONSE_BYTES) {
    return toolResponse(outputLimitFailure(wireBytes));
  }
  return response;
});

function jsonRpcLineBytes(response: unknown): number {
  // The stdio transport frames each result as one JSON-RPC line, so the
  // budget must cover the complete line rather than the tool envelope alone.
  // The handler never sees the request id, so budget a 10-digit numeric id
  // as its worst case.
  return Buffer.byteLength(
    `${JSON.stringify({ jsonrpc: "2.0", id: 1234567890, result: response })}\n`,
    "utf8",
  );
}

function toolResponse(result: ScheduleResult) {
  return {
    isError: !result.ok,
    structuredContent: result as unknown as Record<string, unknown>,
    content: [
      {
        type: "text",
        text: result.ok
          ? `${result.operation}: ${result.intervals.length} interval(s), ${result.semantics.interval}`
          : `${result.error.code}: ${result.error.message}`,
      },
    ],
  };
}

await server.connect(new StdioServerTransport());

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    executor.close();
    process.exit(0);
  });
}
