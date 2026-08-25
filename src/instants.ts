import { Temporal } from "@js-temporal/polyfill";
import { ScheduleError } from "./internal-model.js";

export function parseInstant(value: string, field: string): bigint {
  try {
    return Temporal.Instant.from(value).epochNanoseconds;
  } catch {
    throw new ScheduleError("INVALID_INPUT", `${field} is not a valid RFC 3339 instant`);
  }
}

export function formatInstant(epochNanoseconds: bigint): string {
  return Temporal.Instant.fromEpochNanoseconds(epochNanoseconds).toString();
}
