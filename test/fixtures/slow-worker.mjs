import { parentPort } from "node:worker_threads";

setTimeout(() => {
  parentPort?.postMessage({
    ok: false,
    error: { code: "EXECUTION_FAILED", message: "slow worker fixture completed" },
  });
}, 100);
