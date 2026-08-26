import type { ScheduleFailure } from "./contract.js";
import { MAX_RESPONSE_BYTES } from "./internal-model.js";

export function outputLimitFailure(responseBytes: number): ScheduleFailure {
  return {
    ok: false,
    error: {
      code: "OUTPUT_LIMIT",
      message: `response exceeds ${MAX_RESPONSE_BYTES} UTF-8 bytes`,
      details: { responseBytes, limitBytes: MAX_RESPONSE_BYTES },
    },
  };
}

export function encodeJsonLine<T>(
  value: T,
  space?: number,
): { body: string; value: T | ScheduleFailure; exceeded: boolean } {
  const body = `${JSON.stringify(value, null, space)}\n`;
  const responseBytes = Buffer.byteLength(body, "utf8");
  if (responseBytes <= MAX_RESPONSE_BYTES) return { body, value, exceeded: false };

  const failure = outputLimitFailure(responseBytes);
  return {
    body: `${JSON.stringify(failure, null, space)}\n`,
    value: failure,
    exceeded: true,
  };
}
