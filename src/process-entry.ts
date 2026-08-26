import { readFileSync } from "node:fs";
import { runSchedule } from "./core.js";

let input: unknown;
try {
  input = JSON.parse(readFileSync(3, "utf8"));
} catch {
  input = undefined;
}

process.stdout.write(JSON.stringify(runSchedule(input)));
