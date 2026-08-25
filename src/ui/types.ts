export type Operation = "union" | "intersection" | "difference" | "gaps" | "overlaps";

export interface IntervalDraft {
  id?: string;
  start: string;
  end: string;
}

export interface RecurrenceDraft {
  id: string;
  dtstart: string;
  timeZone: string;
  rrule: string;
  durationSeconds: number;
  maxOccurrences: number;
}

export interface ScheduleDraft {
  id: string;
  intervals: IntervalDraft[];
  recurrences: RecurrenceDraft[];
}

export interface WorkspaceDraft {
  operation: Operation;
  horizon: { start: string; end: string };
  schedules: ScheduleDraft[];
}
