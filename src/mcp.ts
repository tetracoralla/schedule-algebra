#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ScheduleRequestSchema } from "./contract.js";
import { ScheduleExecutor } from "./executor.js";

const inputSchema = zodToJsonSchema(ScheduleRequestSchema, {
  $refStrategy: "none",
  target: "jsonSchema7",
});

const server = new Server(
  { name: "schedule-algebra", version: "0.1.0" },
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
});

await server.connect(new StdioServerTransport());

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    executor.close();
    process.exit(0);
  });
}
