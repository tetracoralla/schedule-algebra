export function request(
  operation: "union" | "intersection" | "difference" | "gaps" | "overlaps",
  schedules: unknown[],
) {
  return {
    operation,
    horizon: { start: "2025-01-01T00:00:00Z", end: "2025-01-01T10:00:00Z" },
    schedules,
  };
}

export function schedule(
  id: string,
  intervals: Array<{ start: number; end: number; id?: string }>,
) {
  return {
    id,
    intervals: intervals.map((interval) => ({
      ...(interval.id ? { id: interval.id } : {}),
      start: `2025-01-01T${String(interval.start).padStart(2, "0")}:00:00Z`,
      end: `2025-01-01T${String(interval.end).padStart(2, "0")}:00:00Z`,
    })),
  };
}
