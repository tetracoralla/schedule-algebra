import { describe, expect, it } from "vitest";
import { runSchedule } from "../src/core.js";
import { request, schedule } from "./fixtures.js";

describe("interval algebra", () => {
  it("sorts and merges touching union intervals while retaining sources", () => {
    const result = runSchedule(
      request("union", [schedule("a", [{ start: 3, end: 4 }]), schedule("b", [{ start: 1, end: 3 }])]),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.intervals).toEqual([
      {
        start: "2025-01-01T01:00:00Z",
        end: "2025-01-01T04:00:00Z",
        sources: ["a/interval/item-1", "b/interval/item-1"],
      },
    ]);
  });

  it("does not treat touching endpoints as intersection", () => {
    const result = runSchedule(
      request("intersection", [schedule("a", [{ start: 1, end: 2 }]), schedule("b", [{ start: 2, end: 3 }])]),
    );
    expect(result.ok && result.intervals).toEqual([]);
  });

  it("intersects every schedule", () => {
    const result = runSchedule(
      request("intersection", [schedule("a", [{ start: 1, end: 5 }]), schedule("b", [{ start: 2, end: 4 }])]),
    );
    expect(result.ok && result.intervals.map(({ start, end }) => [start, end])).toEqual([
      ["2025-01-01T02:00:00Z", "2025-01-01T04:00:00Z"],
    ]);
  });

  it("subtracts the second schedule from the first", () => {
    const result = runSchedule(
      request("difference", [schedule("a", [{ start: 1, end: 5 }]), schedule("b", [{ start: 2, end: 3 }])]),
    );
    expect(result.ok && result.intervals.map(({ start, end }) => [start, end])).toEqual([
      ["2025-01-01T01:00:00Z", "2025-01-01T02:00:00Z"],
      ["2025-01-01T03:00:00Z", "2025-01-01T05:00:00Z"],
    ]);
  });

  it("finds gaps inside the required horizon", () => {
    const result = runSchedule(request("gaps", [schedule("a", [{ start: 2, end: 8 }])]));
    expect(result.ok && result.intervals.map(({ start, end }) => [start, end])).toEqual([
      ["2025-01-01T00:00:00Z", "2025-01-01T02:00:00Z"],
      ["2025-01-01T08:00:00Z", "2025-01-01T10:00:00Z"],
    ]);
  });

  it("finds actual overlaps but excludes touching endpoints", () => {
    const result = runSchedule(
      request("overlaps", [
        schedule("a", [
          { start: 1, end: 3 },
          { start: 3, end: 4 },
        ]),
        schedule("b", [{ start: 2, end: 3 }]),
      ]),
    );
    expect(result.ok && result.intervals.map(({ start, end }) => [start, end])).toEqual([
      ["2025-01-01T02:00:00Z", "2025-01-01T03:00:00Z"],
    ]);
  });
});

describe("closed contract and bounds", () => {
  it("rejects offsets that are missing and unknown fields", () => {
    const missingOffset = request("union", [
      { id: "a", intervals: [{ start: "2025-01-01T01:00:00", end: "2025-01-01T02:00:00Z" }] },
    ]);
    expect(runSchedule(missingOffset)).toMatchObject({ ok: false, error: { code: "INVALID_INPUT" } });
    expect(runSchedule({ ...request("union", [schedule("a", [{ start: 1, end: 2 }])]), surprise: true })).toMatchObject({
      ok: false,
      error: { code: "INVALID_INPUT" },
    });
  });

  it("rejects zero and reversed intervals", () => {
    expect(runSchedule(request("union", [schedule("a", [{ start: 2, end: 2 }])]))).toMatchObject({
      ok: false,
      error: { code: "INVALID_INTERVAL" },
    });
  });

  it("enforces operation arity and result budgets", () => {
    expect(runSchedule(request("intersection", [schedule("a", [{ start: 1, end: 2 }])]))).toMatchObject({
      ok: false,
      error: { code: "OPERATION_CONTRACT" },
    });
    expect(
      runSchedule({
        ...request("gaps", [schedule("a", [{ start: 1, end: 2 }, { start: 3, end: 4 }])]),
        maxResultIntervals: 1,
      }),
    ).toMatchObject({ ok: false, error: { code: "LIMIT_EXCEEDED" } });
  });

  it("rejects ambiguous source identities and oversized requests", () => {
    expect(
      runSchedule(
        request("union", [
          schedule("same", [{ start: 1, end: 2 }]),
          schedule("same", [{ start: 3, end: 4 }]),
        ]),
      ),
    ).toMatchObject({ ok: false, error: { code: "INVALID_INPUT" } });
    expect(
      runSchedule({
        ...request("union", [schedule("a", [{ start: 1, end: 2 }])]),
        oversized: "x".repeat(262_145),
      }),
    ).toMatchObject({ ok: false, error: { code: "LIMIT_EXCEEDED" } });
  });
});

describe("bounded zoned recurrence", () => {
  it("expands wall time across spring DST with changing offsets", () => {
    const result = runSchedule({
      operation: "union",
      horizon: { start: "2025-03-08T00:00:00Z", end: "2025-03-12T00:00:00Z" },
      schedules: [
        {
          id: "office",
          recurrences: [
            {
              id: "opening",
              dtstart: "2025-03-08T01:30:00",
              timeZone: "America/New_York",
              rrule: "FREQ=DAILY;COUNT=3",
              durationSeconds: 3600,
              maxOccurrences: 10,
            },
          ],
        },
      ],
    });
    expect(result.ok && result.intervals.map((item) => item.start)).toEqual([
      "2025-03-08T06:30:00Z",
      "2025-03-09T06:30:00Z",
      "2025-03-10T05:30:00Z",
    ]);
  });

  it("rejects a spring gap and resolves a fall fold to the earlier instant", () => {
    const spring = runSchedule({
      operation: "union",
      horizon: { start: "2025-03-08T00:00:00Z", end: "2025-03-12T00:00:00Z" },
      schedules: [{
        id: "a",
        recurrences: [{ id: "r", dtstart: "2025-03-08T02:30:00", timeZone: "America/New_York", rrule: "FREQ=DAILY;COUNT=3", durationSeconds: 60, maxOccurrences: 10 }],
      }],
    });
    expect(spring).toMatchObject({ ok: false, error: { code: "DST_GAP" } });

    const fall = runSchedule({
      operation: "union",
      horizon: { start: "2025-11-01T00:00:00Z", end: "2025-11-04T00:00:00Z" },
      schedules: [{
        id: "a",
        recurrences: [{ id: "r", dtstart: "2025-11-02T01:30:00", timeZone: "America/New_York", rrule: "FREQ=DAILY;COUNT=1", durationSeconds: 60, maxOccurrences: 10 }],
      }],
    });
    expect(fall.ok && fall.intervals[0]?.start).toBe("2025-11-02T05:30:00Z");
    expect(fall.ok && fall.warnings[0]).toContain("earlier instant");
  });

  it("honors inclusive UTC UNTIL and reports horizon truncation", () => {
    const until = runSchedule({
      operation: "union",
      horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-05T00:00:00Z" },
      schedules: [{ id: "a", recurrences: [{ id: "r", dtstart: "2025-01-01T00:00:00", timeZone: "UTC", rrule: "FREQ=DAILY;UNTIL=20250103T000000Z", durationSeconds: 60, maxOccurrences: 10 }] }],
    });
    expect(until.ok && until.intervals).toHaveLength(3);

    const truncated = runSchedule({
      operation: "union",
      horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-03T00:00:00Z" },
      schedules: [{ id: "a", recurrences: [{ id: "r", dtstart: "2025-01-01T00:00:00", timeZone: "UTC", rrule: "FREQ=DAILY;COUNT=10", durationSeconds: 60, maxOccurrences: 10 }] }],
    });
    expect(truncated.ok && truncated.truncated).toBe(true);
    expect(truncated.ok && truncated.intervals).toHaveLength(2);
  });

  it("keeps UTC UNTIL exact through a fall-back fold", () => {
    const runUntil = (until: string) =>
      runSchedule({
        operation: "union",
        horizon: { start: "2025-11-01T00:00:00Z", end: "2025-11-03T00:00:00Z" },
        schedules: [{
          id: "a",
          recurrences: [{ id: "r", dtstart: "2025-11-02T01:30:00", timeZone: "America/New_York", rrule: `FREQ=DAILY;UNTIL=${until}`, durationSeconds: 60, maxOccurrences: 10 }],
        }],
      });
    const before = runUntil("20251102T050000Z");
    expect(before).toMatchObject({ ok: false, error: { code: "INVALID_RRULE" } });
    const after = runUntil("20251102T060000Z");
    expect(after.ok && after.intervals.map((item) => item.start)).toEqual([
      "2025-11-02T05:30:00Z",
    ]);
  });

  it("rejects semantically unbounded and unsupported high-frequency RRULEs", () => {
    const base = {
      operation: "union",
      horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-03T00:00:00Z" },
      schedules: [{ id: "a", recurrences: [{ id: "r", dtstart: "2025-01-01T00:00:00", timeZone: "UTC", rrule: "FREQ=DAILY", durationSeconds: 60, maxOccurrences: 10 }] }],
    };
    expect(runSchedule(base)).toMatchObject({ ok: false, error: { code: "UNBOUNDED_RRULE" } });
    const secondly = structuredClone(base);
    secondly.schedules[0]!.recurrences[0]!.rrule = "FREQ=SECONDLY;COUNT=3";
    expect(runSchedule(secondly)).toMatchObject({ ok: false, error: { code: "UNSUPPORTED_RRULE" } });
  });

  it("rejects invalid zones and malformed UTC UNTIL values", () => {
    const base = {
      operation: "union",
      horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-03T00:00:00Z" },
      schedules: [{ id: "a", recurrences: [{ id: "r", dtstart: "2025-01-01T00:00:00", timeZone: "Not/AZone", rrule: "FREQ=DAILY;COUNT=2", durationSeconds: 60, maxOccurrences: 10 }] }],
    };
    expect(runSchedule(base)).toMatchObject({ ok: false, error: { code: "INVALID_TIME_ZONE" } });
    const badUntil = structuredClone(base);
    badUntil.schedules[0]!.recurrences[0]!.timeZone = "UTC";
    badUntil.schedules[0]!.recurrences[0]!.rrule = "FREQ=DAILY;UNTIL=20250230T000000Z";
    expect(runSchedule(badUntil)).toMatchObject({ ok: false, error: { code: "INVALID_RRULE" } });
  });

  it("enforces maxOccurrences and recovers on the next call", () => {
    const limited = {
      operation: "union",
      horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-10T00:00:00Z" },
      schedules: [{ id: "a", recurrences: [{ id: "r", dtstart: "2025-01-01T00:00:00", timeZone: "UTC", rrule: "FREQ=DAILY;COUNT=9", durationSeconds: 60, maxOccurrences: 2 }] }],
    };
    expect(runSchedule(limited)).toMatchObject({ ok: false, error: { code: "LIMIT_EXCEEDED" } });
    expect(runSchedule(request("union", [schedule("a", [{ start: 1, end: 2 }])])).ok).toBe(true);
  });
});
