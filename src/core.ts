import {
  type ScheduleFailure,
  type ScheduleRequest,
  ScheduleRequestSchema,
  type ScheduleResult,
  type ScheduleSuccess,
} from "./contract.js";
import { formatInstant, parseInstant } from "./instants.js";
import { clipInterval, executeOperation, normalize } from "./interval-algebra.js";
import {
  type ExpandedSchedule,
  type ExpansionContext,
  type InternalInterval,
  MAX_HORIZON_NS,
  MAX_REQUEST_BYTES,
  MAX_RESPONSE_BYTES,
  MAX_TOTAL_SOURCE_INTERVALS,
  ScheduleError,
} from "./internal-model.js";
import { expandRecurrence } from "./recurrence.js";

export function runSchedule(input: unknown): ScheduleResult {
  try {
    const requestBytes = Buffer.byteLength(JSON.stringify(input), "utf8");
    if (requestBytes > MAX_REQUEST_BYTES) {
      throw new ScheduleError("LIMIT_EXCEEDED", "request exceeds 262144 UTF-8 bytes", {
        requestBytes,
        limitBytes: MAX_REQUEST_BYTES,
      });
    }

    const parsed = ScheduleRequestSchema.safeParse(input);
    if (!parsed.success) {
      throw new ScheduleError(
        "INVALID_INPUT",
        "request does not match the closed schedule contract",
        parsed.error.issues.slice(0, 20).map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      );
    }

    const request = parsed.data;
    const horizon = parseHorizon(request);
    validateOperationContract(request);
    const context: ExpansionContext = {
      horizon,
      recurrence: [],
      warnings: new Set<string>(),
      totalGenerated: 0,
    };
    const schedules = request.schedules.map((schedule, index) =>
      expandSchedule(schedule, index, context),
    );
    const intervals = executeOperation(request.operation, schedules, horizon);
    if (intervals.length > request.maxResultIntervals) {
      throw new ScheduleError(
        "LIMIT_EXCEEDED",
        `result contains more than ${request.maxResultIntervals} intervals`,
        { resultIntervals: intervals.length, maxResultIntervals: request.maxResultIntervals },
      );
    }

    const result: ScheduleSuccess = {
      ok: true,
      operation: request.operation,
      semantics: {
        interval: "[start,end)",
        touchingEndpointsOverlap: false,
        normalized: true,
        recurrenceGapPolicy: "reject",
        recurrenceFoldPolicy: "earlier",
      },
      horizon: { start: formatInstant(horizon.start), end: formatInstant(horizon.end) },
      intervals: intervals.map((interval) => ({
        start: formatInstant(interval.start),
        end: formatInstant(interval.end),
        sources: [...interval.sources].sort(),
      })),
      recurrence: context.recurrence,
      truncated: context.recurrence.some(
        (item) => item.truncatedBeforeHorizon || item.truncatedAfterHorizon,
      ),
      warnings: [...context.warnings].sort(),
      provenance: {
        recurrenceEngine: "rrule@2.8.1",
        temporalEngine: "@js-temporal/polyfill@0.5.1",
        timeZoneAuthority: "runtime Intl/ICU tzdb",
        runtime: process.version,
        icu: process.versions.icu ?? "unknown",
        tzdb: process.versions.tz ?? "unknown",
      },
    };

    const responseBytes = Buffer.byteLength(JSON.stringify(result), "utf8");
    if (responseBytes > MAX_RESPONSE_BYTES) {
      throw new ScheduleError(
        "OUTPUT_LIMIT",
        `response exceeds ${MAX_RESPONSE_BYTES} UTF-8 bytes`,
        {
          responseBytes,
          limitBytes: MAX_RESPONSE_BYTES,
        },
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ScheduleError) {
      const result: ScheduleFailure = {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details === undefined ? {} : { details: error.details }),
        },
      };
      return result;
    }
    return {
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: error instanceof Error ? error.message : "unknown schedule error",
      },
    };
  }
}

function validateOperationContract(request: ScheduleRequest): void {
  if (request.operation === "intersection" && request.schedules.length < 2) {
    throw new ScheduleError(
      "OPERATION_CONTRACT",
      "intersection requires at least two schedules",
    );
  }
  if (request.operation === "difference" && request.schedules.length !== 2) {
    throw new ScheduleError(
      "OPERATION_CONTRACT",
      "difference requires exactly two schedules: left then subtractor",
    );
  }
}

function parseHorizon(request: ScheduleRequest): InternalInterval {
  const start = parseInstant(request.horizon.start, "horizon.start");
  const end = parseInstant(request.horizon.end, "horizon.end");
  if (end <= start) {
    throw new ScheduleError("INVALID_INTERVAL", "horizon must be a positive half-open interval", [
      { path: "horizon.end", message: "must be after the horizon start" },
    ]);
  }
  if (end - start > MAX_HORIZON_NS) {
    throw new ScheduleError("LIMIT_EXCEEDED", "horizon cannot exceed 366 elapsed days");
  }
  return { start, end, sources: new Set<string>() };
}

function expandSchedule(
  schedule: ScheduleRequest["schedules"][number],
  scheduleIndex: number,
  context: ExpansionContext,
): ExpandedSchedule {
  const raw: InternalInterval[] = [];
  for (const [index, interval] of (schedule.intervals ?? []).entries()) {
    const start = parseInstant(interval.start, `${schedule.id}.intervals.${index}.start`);
    const end = parseInstant(interval.end, `${schedule.id}.intervals.${index}.end`);
    if (end <= start) {
      throw new ScheduleError(
        "INVALID_INTERVAL",
        `${schedule.id}.intervals.${index} must have end after start`,
        [{ path: `schedules.${scheduleIndex}.intervals.${index}.end`, message: "must be after the interval start" }],
      );
    }
    const clipped = clipInterval(
      {
        start,
        end,
        sources: new Set([
          `${schedule.id}/interval/${interval.id ?? `item-${index + 1}`}`,
        ]),
      },
      context.horizon,
    );
    if (clipped) raw.push(clipped);
  }
  for (const recurrence of schedule.recurrences ?? []) {
    raw.push(...expandRecurrence(schedule.id, recurrence, context));
  }
  context.totalGenerated += schedule.intervals?.length ?? 0;
  if (context.totalGenerated > MAX_TOTAL_SOURCE_INTERVALS) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `request expands beyond ${MAX_TOTAL_SOURCE_INTERVALS} source intervals`,
    );
  }
  return { raw, normalized: normalize(raw) };
}
