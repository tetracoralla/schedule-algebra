import { parentPort, workerData } from "node:worker_threads";
import { runSchedule } from "./core.js";

if (!parentPort) {
  throw new Error("schedule worker requires a parent port");
}

let input: unknown;
try {
  input = JSON.parse(String(workerData));
} catch {
  input = undefined;
}

parentPort.postMessage(runSchedule(input));
