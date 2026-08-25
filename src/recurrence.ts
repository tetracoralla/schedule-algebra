import { Temporal } from "@js-temporal/polyfill";
import RRulePackage from "rrule";
import type { ScheduleRequest } from "./contract.js";
import { clipInterval } from "./interval-algebra.js";
import {
  type ExpansionContext,
  type InternalInterval,
  MAX_RECURRENCE_LOOKBACK_NS,
  ScheduleError,
} from "./internal-model.js";

const { rrulestr } = RRulePackage;
const NANOSECONDS_PER_SECOND = 1_000_000_000n;
const ALLOWED_RRULE_KEYS = new Set([
  "FREQ",
  "INTERVAL",
  "COUNT",
  "UNTIL",
  "BYDAY",
  "BYMONTHDAY",
  "BYMONTH",
  "WKST",
]);
const ALLOWED_FREQUENCIES = new Set(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);

export function expandRecurrence(
  scheduleId: string,
  recurrence: NonNullable<ScheduleRequest["schedules"][number]["recurrences"]>[number],
  context: ExpansionContext,
): InternalInterval[] {
  const source = `${scheduleId}/recurrence/${recurrence.id}`;
  const dtstart = parseLocalDateTime(recurrence.dtstart, source);
  const dtstartResolution = resolveLocal(dtstart, recurrence.timeZone, source);
  if (dtstartResolution.fold) {
    context.warnings.add(`${source}: ambiguous DTSTART used the earlier instant`);
  }
  if (
    dtstartResolution.instant < context.horizon.start - MAX_RECURRENCE_LOOKBACK_NS ||
    dtstartResolution.instant >= context.horizon.end
  ) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `${source} DTSTART must fall within one year before the horizon and before its end`,
    );
  }

  const normalizedRule = normalizeRRule(recurrence.rrule, recurrence.timeZone);
  if (
    normalizedRule.untilInstant !== undefined &&
    normalizedRule.untilInstant < dtstartResolution.instant
  ) {
    throw new ScheduleError("INVALID_RRULE", `${source} UNTIL precedes DTSTART`);
  }
  let rule: ReturnType<typeof rrulestr>;
  try {
    rule = rrulestr(
      `DTSTART:${plainToCompact(dtstart)}Z\nRRULE:${normalizedRule.engineRule}`,
      { forceset: false, compatible: true },
    );
  } catch (error) {
    throw new ScheduleError(
      "INVALID_RRULE",
      `${source} has an invalid RRULE`,
      error instanceof Error ? error.message : undefined,
    );
  }

  const durationNs = BigInt(recurrence.durationSeconds) * NANOSECONDS_PER_SECOND;
  const queryStart = instantToPseudoDate(
    context.horizon.start - durationNs,
    recurrence.timeZone,
  );
  const queryEnd = instantToPseudoDate(context.horizon.end, recurrence.timeZone);
  const candidates = rule.between(
    queryStart,
    queryEnd,
    true,
    (_date, length) => length <= recurrence.maxOccurrences + 2,
  );

  const intervals: InternalInterval[] = [];
  let clippedBefore = false;
  let clippedAfter = false;
  for (const candidate of candidates) {
    const plain = pseudoDateToPlain(candidate);
    const resolved = resolveLocal(plain, recurrence.timeZone, source);
    if (
      normalizedRule.untilInstant !== undefined &&
      resolved.instant > normalizedRule.untilInstant
    ) {
      continue;
    }
    if (resolved.fold) {
      context.warnings.add(
        `${source}: ambiguous occurrence ${plain.toString()} used the earlier instant`,
      );
    }
    const occurrence = {
      start: resolved.instant,
      end: resolved.instant + durationNs,
      sources: new Set([source]),
    };
    if (occurrence.start < context.horizon.start) clippedBefore = true;
    if (occurrence.end > context.horizon.end) clippedAfter = true;
    const clipped = clipInterval(occurrence, context.horizon);
    if (clipped) intervals.push(clipped);
  }

  if (intervals.length > recurrence.maxOccurrences) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `${source} exceeds maxOccurrences inside the horizon`,
      { observedAtLeast: intervals.length, maxOccurrences: recurrence.maxOccurrences },
    );
  }

  context.totalGenerated += intervals.length;
  context.recurrence.push({
    source,
    generated: intervals.length,
    truncatedBeforeHorizon: clippedBefore || Boolean(rule.before(queryStart, true)),
    truncatedAfterHorizon:
      clippedAfter ||
      candidateIsWithinUntil(
        rule.after(queryEnd, true),
        recurrence.timeZone,
        normalizedRule.untilInstant,
      ),
  });
  return intervals;
}

function normalizeRRule(
  value: string,
  timeZone: string,
): { engineRule: string; untilInstant?: bigint } {
  const rule = value.trim().replace(/^RRULE:/i, "");
  if (rule.includes("\n") || rule.includes("\r")) {
    throw new ScheduleError("INVALID_RRULE", "RRULE must be a single content line");
  }
  const entries = new Map<string, string>();
  for (const part of rule.split(";")) {
    const separator = part.indexOf("=");
    if (separator <= 0 || separator === part.length - 1) {
      throw new ScheduleError("INVALID_RRULE", "RRULE parts must be KEY=VALUE");
    }
    const key = part.slice(0, separator).toUpperCase();
    const itemValue = part.slice(separator + 1).toUpperCase();
    if (!ALLOWED_RRULE_KEYS.has(key)) {
      throw new ScheduleError(
        "UNSUPPORTED_RRULE",
        `RRULE property ${key} is outside the bounded MVP subset`,
      );
    }
    if (entries.has(key)) {
      throw new ScheduleError("INVALID_RRULE", `RRULE property ${key} is duplicated`);
    }
    entries.set(key, itemValue);
  }
  const frequency = entries.get("FREQ");
  if (!frequency || !ALLOWED_FREQUENCIES.has(frequency)) {
    throw new ScheduleError(
      "UNSUPPORTED_RRULE",
      "FREQ must be DAILY, WEEKLY, MONTHLY, or YEARLY",
    );
  }
  if (!entries.has("COUNT") && !entries.has("UNTIL")) {
    throw new ScheduleError(
      "UNBOUNDED_RRULE",
      "RRULE requires COUNT or an inclusive UTC UNTIL in addition to the horizon",
    );
  }
  validateBoundedInteger(entries.get("COUNT"), "COUNT");
  validateBoundedInteger(entries.get("INTERVAL"), "INTERVAL");
  const until = entries.get("UNTIL");
  let untilInstant: bigint | undefined;
  if (until) {
    if (!/^\d{8}T\d{6}Z$/.test(until)) {
      throw new ScheduleError(
        "INVALID_RRULE",
        "RRULE UNTIL must be an inclusive UTC date-time like 20250131T120000Z",
      );
    }
    try {
      const untilValue = Temporal.Instant.from(compactUtcToIso(until));
      const untilLocal = untilValue
        .toZonedDateTimeISO(timeZone)
        .toPlainDateTime()
        .add({ days: 1 });
      entries.set("UNTIL", `${plainToCompact(untilLocal)}Z`);
      untilInstant = untilValue.epochNanoseconds;
    } catch {
      throw new ScheduleError("INVALID_RRULE", "RRULE UNTIL is not a valid UTC instant");
    }
  }
  return {
    engineRule: [...entries.entries()]
      .map(([key, itemValue]) => `${key}=${itemValue}`)
      .join(";"),
    ...(untilInstant === undefined ? {} : { untilInstant }),
  };
}

function candidateIsWithinUntil(
  candidate: Date | null,
  timeZone: string,
  untilInstant: bigint | undefined,
): boolean {
  if (!candidate) return false;
  if (untilInstant === undefined) return true;
  const plain = pseudoDateToPlain(candidate);
  const fields = {
    timeZone,
    year: plain.year,
    month: plain.month,
    day: plain.day,
    hour: plain.hour,
    minute: plain.minute,
    second: plain.second,
  };
  try {
    return (
      Temporal.ZonedDateTime.from(fields, { disambiguation: "earlier" }).epochNanoseconds <=
      untilInstant
    );
  } catch {
    return false;
  }
}

function validateBoundedInteger(value: string | undefined, name: string): void {
  if (value && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 10_000)) {
    throw new ScheduleError("LIMIT_EXCEEDED", `RRULE ${name} must be between 1 and 10000`);
  }
}

function parseLocalDateTime(value: string, source: string): Temporal.PlainDateTime {
  try {
    return Temporal.PlainDateTime.from(value);
  } catch {
    throw new ScheduleError("INVALID_INPUT", `${source} DTSTART is invalid`);
  }
}

function resolveLocal(
  plain: Temporal.PlainDateTime,
  timeZone: string,
  source: string,
): { instant: bigint; fold: boolean } {
  const fields = {
    timeZone,
    year: plain.year,
    month: plain.month,
    day: plain.day,
    hour: plain.hour,
    minute: plain.minute,
    second: plain.second,
  };
  try {
    const earlier = Temporal.ZonedDateTime.from(fields, { disambiguation: "earlier" });
    const later = Temporal.ZonedDateTime.from(fields, { disambiguation: "later" });
    const earlierMatches = Temporal.PlainDateTime.compare(earlier.toPlainDateTime(), plain) === 0;
    const laterMatches = Temporal.PlainDateTime.compare(later.toPlainDateTime(), plain) === 0;
    if (!earlierMatches || !laterMatches) {
      throw new ScheduleError(
        "DST_GAP",
        `${source} occurrence ${plain.toString()} does not exist in ${timeZone}`,
      );
    }
    return {
      instant: earlier.epochNanoseconds,
      fold: earlier.epochNanoseconds !== later.epochNanoseconds,
    };
  } catch (error) {
    if (error instanceof ScheduleError) throw error;
    const message = error instanceof Error ? error.message : "invalid time zone";
    if (/time zone|timezone|identifier/i.test(message)) {
      throw new ScheduleError("INVALID_TIME_ZONE", `${source} has an invalid IANA time zone`);
    }
    throw new ScheduleError(
      "DST_GAP",
      `${source} occurrence ${plain.toString()} does not exist in ${timeZone}`,
    );
  }
}

function instantToPseudoDate(epochNanoseconds: bigint, timeZone: string): Date {
  let local: Temporal.PlainDateTime;
  try {
    local = Temporal.Instant.fromEpochNanoseconds(epochNanoseconds)
      .toZonedDateTimeISO(timeZone)
      .toPlainDateTime();
  } catch {
    throw new ScheduleError("INVALID_TIME_ZONE", `invalid IANA time zone: ${timeZone}`);
  }
  return new Date(
    Date.UTC(local.year, local.month - 1, local.day, local.hour, local.minute, local.second),
  );
}

function pseudoDateToPlain(value: Date): Temporal.PlainDateTime {
  return new Temporal.PlainDateTime(
    value.getUTCFullYear(),
    value.getUTCMonth() + 1,
    value.getUTCDate(),
    value.getUTCHours(),
    value.getUTCMinutes(),
    value.getUTCSeconds(),
  );
}

function plainToCompact(value: Temporal.PlainDateTime): string {
  return [
    String(value.year).padStart(4, "0"),
    String(value.month).padStart(2, "0"),
    String(value.day).padStart(2, "0"),
    "T",
    String(value.hour).padStart(2, "0"),
    String(value.minute).padStart(2, "0"),
    String(value.second).padStart(2, "0"),
  ].join("");
}

function compactUtcToIso(value: string): string {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(
    9,
    11,
  )}:${value.slice(11, 13)}:${value.slice(13, 15)}Z`;
}
