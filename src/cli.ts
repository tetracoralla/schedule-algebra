#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { ScheduleExecutor } from "./executor.js";

const MAX_INPUT_BYTES = 262_144;

async function main(): Promise<void> {
  const arguments_ = process.argv.slice(2);
  const pretty = arguments_.includes("--pretty");
  const inputIndex = arguments_.indexOf("--input");
  const supported = new Set(["--pretty", "--input"]);
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--input") {
      index += 1;
      if (!arguments_[index]) fail("--input requires a file path");
      continue;
    }
    if (!supported.has(argument ?? "")) fail(`unknown argument: ${argument}`);
  }

  const raw = inputIndex >= 0 ? await readInputFile(arguments_[inputIndex + 1] ?? "") : await readStdin();
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    fail("input must be valid JSON");
  }
  const executor = new ScheduleExecutor({ maxConcurrent: 1, maxQueue: 0 });
  const controller = new AbortController();
  const abort = () => controller.abort();
  process.once("SIGINT", abort);
  process.once("SIGTERM", abort);
  const result = await executor.run(input, { signal: controller.signal });
  executor.close();
  process.removeListener("SIGINT", abort);
  process.removeListener("SIGTERM", abort);
  process.stdout.write(`${JSON.stringify(result, null, pretty ? 2 : undefined)}\n`);
  process.exitCode = result.ok ? 0 : 2;
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  let length = 0;
  for await (const chunk of process.stdin) {
    const buffer = Buffer.from(chunk);
    length += buffer.length;
    if (length > MAX_INPUT_BYTES) fail("input exceeds 262144 UTF-8 bytes");
    chunks.push(buffer);
  }
  if (chunks.length === 0) fail("provide one JSON request on stdin or with --input");
  return Buffer.concat(chunks).toString("utf8");
}

async function readInputFile(path: string): Promise<string> {
  const file = await stat(path);
  if (!file.isFile()) fail("--input must name a regular file");
  if (file.size > MAX_INPUT_BYTES) fail("input exceeds 262144 UTF-8 bytes");
  return readFile(path, "utf8");
}

function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(2);
}

await main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : "schedule failure"}\n`);
  process.exit(1);
});
