import type { ScheduleRequest } from "./contract.js";
import type { ExpandedSchedule, InternalInterval } from "./internal-model.js";

export function clipInterval(
  interval: InternalInterval,
  horizon: InternalInterval,
): InternalInterval | undefined {
  const start = interval.start > horizon.start ? interval.start : horizon.start;
  const end = interval.end < horizon.end ? interval.end : horizon.end;
  if (end <= start) return undefined;
  return { start, end, sources: new Set(interval.sources) };
}

export function executeOperation(
  operation: ScheduleRequest["operation"],
  schedules: ExpandedSchedule[],
  horizon: InternalInterval,
): InternalInterval[] {
  switch (operation) {
    case "union":
      return normalize(schedules.flatMap((schedule) => schedule.normalized));
    case "intersection":
      return attachContributors(
        schedules.slice(1).reduce(
          (current, schedule) => intersectTwo(current, schedule.normalized),
          schedules[0]?.normalized ?? [],
        ),
        schedules.flatMap((schedule) => schedule.raw),
      );
    case "difference":
      return attachContributors(
        subtract(schedules[0]?.normalized ?? [], schedules[1]?.normalized ?? []),
        schedules[0]?.raw ?? [],
      );
    case "gaps":
      return complement(
        normalize(schedules.flatMap((schedule) => schedule.normalized)),
        horizon,
      );
    case "overlaps":
      return overlapSegments(schedules.flatMap((schedule) => schedule.raw));
  }
}

function attachContributors(
  intervals: InternalInterval[],
  sourceIntervals: InternalInterval[],
): InternalInterval[] {
  return intervals.map((interval) => {
    const sources = new Set<string>();
    for (const sourceInterval of sourceIntervals) {
      if (sourceInterval.start >= interval.end || sourceInterval.end <= interval.start) continue;
      for (const source of sourceInterval.sources) sources.add(source);
    }
    return { start: interval.start, end: interval.end, sources };
  });
}

export function normalize(intervals: InternalInterval[]): InternalInterval[] {
  const sorted = intervals
    .map((interval) => ({ ...interval, sources: new Set(interval.sources) }))
    .sort(compareIntervals);
  const result: InternalInterval[] = [];
  for (const interval of sorted) {
    const previous = result.at(-1);
    if (previous && interval.start <= previous.end) {
      previous.end = previous.end > interval.end ? previous.end : interval.end;
      for (const source of interval.sources) previous.sources.add(source);
    } else {
      result.push(interval);
    }
  }
  return result;
}

function intersectTwo(
  left: InternalInterval[],
  right: InternalInterval[],
): InternalInterval[] {
  const result: InternalInterval[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    const a = left[leftIndex];
    const b = right[rightIndex];
    if (!a || !b) break;
    const start = a.start > b.start ? a.start : b.start;
    const end = a.end < b.end ? a.end : b.end;
    if (start < end) {
      result.push({ start, end, sources: new Set([...a.sources, ...b.sources]) });
    }
    if (a.end <= b.end) leftIndex += 1;
    else rightIndex += 1;
  }
  return normalize(result);
}

function subtract(left: InternalInterval[], right: InternalInterval[]): InternalInterval[] {
  const result: InternalInterval[] = [];
  for (const interval of left) {
    let pieces: InternalInterval[] = [
      { start: interval.start, end: interval.end, sources: new Set(interval.sources) },
    ];
    for (const blocker of right) {
      if (blocker.end <= interval.start) continue;
      if (blocker.start >= interval.end) break;
      pieces = pieces.flatMap((piece) => {
        if (blocker.end <= piece.start || blocker.start >= piece.end) return [piece];
        const next: InternalInterval[] = [];
        if (blocker.start > piece.start) {
          next.push({
            start: piece.start,
            end: blocker.start,
            sources: new Set(piece.sources),
          });
        }
        if (blocker.end < piece.end) {
          next.push({ end: piece.end, start: blocker.end, sources: new Set(piece.sources) });
        }
        return next;
      });
      if (pieces.length === 0) break;
    }
    result.push(...pieces);
  }
  return normalize(result);
}

function complement(intervals: InternalInterval[], horizon: InternalInterval): InternalInterval[] {
  const gaps: InternalInterval[] = [];
  let cursor = horizon.start;
  for (const interval of intervals) {
    if (interval.start > cursor) {
      gaps.push({ start: cursor, end: interval.start, sources: new Set<string>() });
    }
    if (interval.end > cursor) cursor = interval.end;
  }
  if (cursor < horizon.end) {
    gaps.push({ start: cursor, end: horizon.end, sources: new Set<string>() });
  }
  return gaps;
}

function overlapSegments(intervals: InternalInterval[]): InternalInterval[] {
  const events = new Map<bigint, { starts: InternalInterval[]; ends: InternalInterval[] }>();
  for (const interval of intervals) {
    const startEvent = events.get(interval.start) ?? { starts: [], ends: [] };
    startEvent.starts.push(interval);
    events.set(interval.start, startEvent);
    const endEvent = events.get(interval.end) ?? { starts: [], ends: [] };
    endEvent.ends.push(interval);
    events.set(interval.end, endEvent);
  }
  const times = [...events.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const active = new Set<InternalInterval>();
  const result: InternalInterval[] = [];
  let previous: bigint | undefined;
  for (const time of times) {
    if (previous !== undefined && previous < time && active.size >= 2) {
      result.push({
        start: previous,
        end: time,
        sources: new Set([...active].flatMap((interval) => [...interval.sources])),
      });
    }
    const event = events.get(time);
    if (!event) continue;
    for (const interval of event.ends) active.delete(interval);
    for (const interval of event.starts) active.add(interval);
    previous = time;
  }
  return mergeEquivalentSegments(result);
}

function mergeEquivalentSegments(intervals: InternalInterval[]): InternalInterval[] {
  const result: InternalInterval[] = [];
  for (const interval of intervals) {
    const previous = result.at(-1);
    if (
      previous &&
      previous.end === interval.start &&
      sameSources(previous.sources, interval.sources)
    ) {
      previous.end = interval.end;
    } else {
      result.push(interval);
    }
  }
  return result;
}

function sameSources(left: Set<string>, right: Set<string>): boolean {
  return left.size === right.size && [...left].every((source) => right.has(source));
}

function compareIntervals(left: InternalInterval, right: InternalInterval): number {
  if (left.start < right.start) return -1;
  if (left.start > right.start) return 1;
  if (left.end < right.end) return -1;
  if (left.end > right.end) return 1;
  return [...left.sources].sort().join("\0").localeCompare([...right.sources].sort().join("\0"));
}
