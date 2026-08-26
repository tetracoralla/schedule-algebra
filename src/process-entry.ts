import { readFileSync } from "node:fs";
import { runSchedule } from "./core.js";

let input: unknown;
try {
  input = JSON.parse(readFileSync(3, "utf8"));
} catch {
  input = undefined;
}

try {
  process.stdout.write(JSON.stringify(runSchedule(input)));
} catch (error) {
  const diagnostic = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`[schedule-algebra] isolated core error: ${diagnostic.slice(0, 8_192)}\n`);
  process.stdout.write(
    JSON.stringify({
      ok: false,
      error: { code: "EXECUTION_FAILED", message: "schedule execution failed" },
    }),
  );
}
