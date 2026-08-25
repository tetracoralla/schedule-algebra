import type { ScheduleSuccess } from "../contract.js";
import type { IntervalDraft, ScheduleDraft, WorkspaceDraft } from "./types.js";

const TICK_FRACTIONS = [0, 0.5, 1] as const;

export function renderTimeCanvas(
  canvas: HTMLElement,
  rangeLabel: HTMLElement,
  legend: HTMLElement,
  request: WorkspaceDraft,
  result?: ScheduleSuccess,
): void {
  canvas.replaceChildren();
  legend.replaceChildren(legendItem("input", "Inputs"));
  if (result) legend.append(legendItem("result", "Result"));

  rangeLabel.textContent = `${request.horizon.start || "Start"} → ${request.horizon.end || "End"}`;
  const horizonStart = Date.parse(request.horizon.start);
  const horizonEnd = Date.parse(request.horizon.end);
  if (!Number.isFinite(horizonStart) || !Number.isFinite(horizonEnd) || horizonEnd <= horizonStart) {
    const message = element("p", "canvas-message");
    message.textContent = "Enter a valid horizon to place intervals on the canvas.";
    canvas.append(message);
    return;
  }

  canvas.append(axis(horizonStart, horizonEnd));
  for (const [index, schedule] of request.schedules.entries()) {
    canvas.append(scheduleLane(schedule, index, horizonStart, horizonEnd));
  }
  if (result) canvas.append(resultLane(result, horizonStart, horizonEnd));
}

function axis(start: number, end: number): HTMLElement {
  const row = element("div", "time-axis");
  const zone = element("span", "axis-zone");
  zone.textContent = "UTC";
  const track = element("div", "axis-track");
  for (const fraction of TICK_FRACTIONS) {
    const tick = element("span", "axis-tick");
    tick.style.left = `${fraction * 100}%`;
    tick.dataset.edge = fraction === 0 ? "start" : fraction === 1 ? "end" : "middle";
    tick.textContent = formatTick(start + (end - start) * fraction, end - start);
    track.append(tick);
  }
  row.append(zone, track);
  return row;
}

function scheduleLane(
  schedule: ScheduleDraft,
  index: number,
  horizonStart: number,
  horizonEnd: number,
): HTMLElement {
  const visible = schedule.intervals.filter((interval) => overlapsHorizon(interval, horizonStart, horizonEnd));
  const recurrenceCount = schedule.recurrences.length;
  const meta = [
    `${visible.length} interval${visible.length === 1 ? "" : "s"}`,
    recurrenceCount > 0
      ? `${recurrenceCount} recurrence${recurrenceCount === 1 ? "" : "s"}; run to expand`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return lane(
    schedule.id || `Schedule ${index + 1}`,
    meta,
    visible,
    horizonStart,
    horizonEnd,
    `input hue-${index % 4}`,
  );
}

function resultLane(
  result: ScheduleSuccess,
  horizonStart: number,
  horizonEnd: number,
): HTMLElement {
  const label = `${capitalize(result.operation)} result`;
  const count = result.intervals.length;
  return lane(
    label,
    `${count} interval${count === 1 ? "" : "s"}`,
    result.intervals,
    horizonStart,
    horizonEnd,
    "result",
  );
}

function lane(
  name: string,
  meta: string,
  intervals: Array<Pick<IntervalDraft, "start" | "end">>,
  horizonStart: number,
  horizonEnd: number,
  variant: string,
): HTMLElement {
  const row = element("div", `canvas-lane ${variant}`);
  const label = element("div", "lane-label");
  const strong = document.createElement("strong");
  strong.textContent = name;
  const detail = document.createElement("span");
  detail.textContent = meta;
  label.append(strong, detail);

  const track = element("div", "lane-track");
  track.setAttribute("role", "img");
  track.setAttribute("aria-label", `${name}: ${meta}`);
  const span = horizonEnd - horizonStart;
  for (const [index, interval] of intervals.entries()) {
    const intervalStart = Date.parse(interval.start);
    const intervalEnd = Date.parse(interval.end);
    if (!Number.isFinite(intervalStart) || !Number.isFinite(intervalEnd) || intervalEnd <= intervalStart) {
      continue;
    }
    const clippedStart = Math.max(horizonStart, intervalStart);
    const clippedEnd = Math.min(horizonEnd, intervalEnd);
    if (clippedEnd <= clippedStart) continue;
    const bar = element("span", "lane-bar");
    bar.style.left = `${((clippedStart - horizonStart) / span) * 100}%`;
    bar.style.width = `${((clippedEnd - clippedStart) / span) * 100}%`;
    bar.style.setProperty("--row", String(index % 3));
    bar.title = `${interval.start} → ${interval.end}`;
    track.append(bar);
  }
  if (track.childElementCount === 0) {
    const empty = element("span", "lane-empty");
    empty.textContent = "No explicit interval in view";
    track.append(empty);
  }
  row.append(label, track);
  return row;
}

function overlapsHorizon(interval: IntervalDraft, horizonStart: number, horizonEnd: number): boolean {
  const start = Date.parse(interval.start);
  const end = Date.parse(interval.end);
  return Number.isFinite(start) && Number.isFinite(end) && start < horizonEnd && end > horizonStart;
}

function formatTick(milliseconds: number, span: number): string {
  const options: Intl.DateTimeFormatOptions =
    span <= 36 * 60 * 60 * 1_000
      ? { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }
      : { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat(undefined, { ...options, timeZone: "UTC" }).format(milliseconds);
}

function legendItem(variant: "input" | "result", label: string): HTMLElement {
  const item = element("span", "legend-item");
  const swatch = element("i", `legend-swatch ${variant}`);
  swatch.setAttribute("aria-hidden", "true");
  item.append(swatch, label);
  return item;
}

function capitalize(value: string): string {
  return value[0]!.toUpperCase() + value.slice(1);
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}
