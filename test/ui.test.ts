import { describe, expect, it } from "vitest";
import {
  durationNanoseconds,
  formatDurationNanoseconds,
  parseRfc3339Nanoseconds,
  percentage,
} from "../src/ui/instant.js";
import { RunCoordinator } from "../src/ui/run-coordinator.js";

describe("UI instant precision", () => {
  it("preserves RFC 3339 nanoseconds and displays sub-millisecond durations", () => {
    expect(parseRfc3339Nanoseconds("2025-01-01T10:00:00.000000001Z")).toBe(
      1_735_725_600_000_000_001n,
    );
    const duration = durationNanoseconds(
      "2025-01-01T10:00:00.000000001Z",
      "2025-01-01T10:00:00.000000400Z",
    );
    expect(duration).toBe(399n);
    expect(formatDurationNanoseconds(duration)).toBe("399ns");
    expect(percentage(duration, 1_000_000_000n)).toBeGreaterThan(0);
  });

  it("keeps exact readable units across larger durations", () => {
    expect(formatDurationNanoseconds(1_500_000n)).toBe("1.5ms");
    expect(formatDurationNanoseconds(61_250_000_000n)).toBe("1m 1.25s");
  });
});

describe("UI run coordination", () => {
  it("aborts and invalidates a run when inputs change", () => {
    const coordinator = new RunCoordinator();
    const first = coordinator.start();
    coordinator.invalidate();
    expect(first.signal.aborted).toBe(true);
    expect(coordinator.isCurrent(first.id)).toBe(false);
    expect(coordinator.finish(first.id)).toBe(false);
  });

  it("allows only the newest run to finish", () => {
    const coordinator = new RunCoordinator();
    const first = coordinator.start();
    const second = coordinator.start();
    expect(first.signal.aborted).toBe(true);
    expect(coordinator.isCurrent(first.id)).toBe(false);
    expect(coordinator.finish(second.id)).toBe(true);
  });
});
