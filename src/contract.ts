import { z } from "zod";

const InstantSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/,
    "must be an RFC 3339 timestamp with Z or an explicit offset",
  );

const LocalDateTimeSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    "must be a local date-time without an offset",
  );

const StableIdSchema = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[A-Za-z0-9._-]+$/, "must use letters, numbers, dot, underscore, or hyphen");

export const IntervalInputSchema = z
  .object({
    id: StableIdSchema.optional(),
    start: InstantSchema,
    end: InstantSchema,
  })
  .strict();

export const RecurrenceInputSchema = z
  .object({
    id: StableIdSchema,
    dtstart: LocalDateTimeSchema,
    timeZone: z.string().min(1).max(80),
    rrule: z.string().min(1).max(1024),
    durationSeconds: z.number().int().positive().max(604_800),
    maxOccurrences: z.number().int().positive().max(2_000),
  })
  .strict();

export const ScheduleInputSchema = z
  .object({
    id: StableIdSchema,
    intervals: z.array(IntervalInputSchema).max(1_000).optional(),
    recurrences: z.array(RecurrenceInputSchema).max(32).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if ((value.intervals?.length ?? 0) + (value.recurrences?.length ?? 0) === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "a schedule must contain at least one interval or recurrence",
      });
    }
    const ids = new Set<string>();
    for (const [index, interval] of (value.intervals ?? []).entries()) {
      if (!interval.id) continue;
      if (ids.has(interval.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["intervals", index, "id"],
          message: "item ids must be unique within a schedule",
        });
      }
      ids.add(interval.id);
    }
    for (const [index, recurrence] of (value.recurrences ?? []).entries()) {
      if (ids.has(recurrence.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["recurrences", index, "id"],
          message: "item ids must be unique within a schedule",
        });
      }
      ids.add(recurrence.id);
    }
  });

export const ScheduleRequestSchema = z
  .object({
    operation: z.enum(["union", "intersection", "difference", "gaps", "overlaps"]),
    horizon: z
      .object({
        start: InstantSchema,
        end: InstantSchema,
      })
      .strict(),
    schedules: z.array(ScheduleInputSchema).min(1).max(16),
    maxResultIntervals: z.number().int().positive().max(2_000).default(1_000),
  })
  .strict()
  .superRefine((value, context) => {
    const ids = new Set<string>();
    for (const [index, schedule] of value.schedules.entries()) {
      if (ids.has(schedule.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["schedules", index, "id"],
          message: "schedule ids must be unique",
        });
      }
      ids.add(schedule.id);
    }
  });

export type ScheduleRequest = z.infer<typeof ScheduleRequestSchema>;

export interface ScheduleInterval {
  start: string;
  end: string;
  sources: string[];
}

export interface RecurrenceSummary {
  source: string;
  generated: number;
  truncatedBeforeHorizon: boolean;
  truncatedAfterHorizon: boolean;
}

export interface ScheduleSuccess {
  ok: true;
  operation: ScheduleRequest["operation"];
  semantics: {
    interval: "[start,end)";
    touchingEndpointsOverlap: false;
    normalized: true;
    recurrenceGapPolicy: "reject";
    recurrenceFoldPolicy: "earlier";
  };
  horizon: { start: string; end: string };
  intervals: ScheduleInterval[];
  recurrence: RecurrenceSummary[];
  truncated: boolean;
  warnings: string[];
  provenance: {
    recurrenceEngine: "rrule@2.8.1";
    temporalEngine: "@js-temporal/polyfill@0.5.1";
    timeZoneAuthority: "runtime Intl/ICU tzdb";
    runtime: string;
    icu: string;
    tzdb: string;
  };
}

export interface ScheduleFailure {
  ok: false;
  error: {
    code:
      | "INVALID_INPUT"
      | "INVALID_INTERVAL"
      | "INVALID_TIME_ZONE"
      | "INVALID_RRULE"
      | "UNBOUNDED_RRULE"
      | "UNSUPPORTED_RRULE"
      | "DST_GAP"
      | "LIMIT_EXCEEDED"
      | "OUTPUT_LIMIT"
      | "OPERATION_CONTRACT"
      | "EXECUTION_TIMEOUT"
      | "EXECUTION_CANCELLED"
      | "EXECUTION_RESOURCE_LIMIT"
      | "EXECUTION_FAILED"
      | "SERVER_BUSY";
    message: string;
    details?: unknown;
  };
}

export type ScheduleResult = ScheduleSuccess | ScheduleFailure;
