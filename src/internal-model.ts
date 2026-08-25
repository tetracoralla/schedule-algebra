import type { RecurrenceSummary, ScheduleFailure } from "./contract.js";

export const MAX_REQUEST_BYTES = 262_144;
export const MAX_RESPONSE_BYTES = 524_288;
export const MAX_TOTAL_SOURCE_INTERVALS = 10_000;
export const MAX_HORIZON_NS = 366n * 86_400n * 1_000_000_000n;
export const MAX_RECURRENCE_LOOKBACK_NS = MAX_HORIZON_NS;

export type ErrorCode = ScheduleFailure["error"]["code"];

export class ScheduleError extends Error {
  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
  }
}

export interface InternalInterval {
  start: bigint;
  end: bigint;
  sources: Set<string>;
}

export interface ExpandedSchedule {
  raw: InternalInterval[];
  normalized: InternalInterval[];
}

export interface ExpansionContext {
  horizon: InternalInterval;
  recurrence: RecurrenceSummary[];
  warnings: Set<string>;
  totalGenerated: number;
}
