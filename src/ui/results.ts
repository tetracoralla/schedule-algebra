import type { ScheduleFailure, ScheduleSuccess } from "../contract.js";
import type { WorkspaceDraft } from "./types.js";

export function renderSuccess(panel: HTMLElement, result: ScheduleSuccess, request: WorkspaceDraft): void {
  panel.hidden = false;
  panel.replaceChildren();

  const header = element("div", "result-header");
  const title = document.createElement("h2");
  title.id = "result-title";
  title.tabIndex = -1;
  title.textContent = result.operation[0]!.toUpperCase() + result.operation.slice(1);
  const actions = element("div", "result-actions");
  actions.append(copyButton("Copy intervals", "intervals"), copyButton("Copy JSON", "result"));
  header.append(title, actions);

  const summary = element("div", "summary-grid");
  summary.append(
    summaryItem(String(result.intervals.length), "Intervals"),
    summaryItem(formatDuration(totalMilliseconds(result)), "Covered"),
    summaryItem(result.truncated ? "Yes" : "No", "Recurrence clipped"),
  );

  panel.append(header, summary);
  panel.append(intervalSection(result));
  if (result.warnings.length > 0) panel.append(warningSection(result.warnings));
  if (result.recurrence.length > 0) panel.append(recurrenceSection(result));
  panel.append(rawDetails(request, result));
  title.focus({ preventScroll: true });
}

export function renderFailure(panel: HTMLElement, result: ScheduleFailure, request: WorkspaceDraft): void {
  panel.hidden = false;
  panel.replaceChildren();
  const header = element("div", "result-header");
  const title = document.createElement("h2");
  title.id = "result-title";
  title.tabIndex = -1;
  title.textContent = "Could not calculate";
  const actions = element("div", "result-actions");
  actions.append(copyButton("Copy error", "result"));
  header.append(title, actions);

  const error = element("div", "result-error");
  const code = document.createElement("strong");
  code.textContent = result.error.code;
  const message = document.createElement("div");
  message.textContent = result.error.message;
  error.append(code, message);
  const detailList = errorDetails(result.error.details);
  if (detailList) error.append(detailList);
  panel.append(header, error, rawDetails(request, result));
  title.focus({ preventScroll: true });
}

export function intervalText(result: ScheduleSuccess): string {
  return result.intervals.map((interval) => `${interval.start}\t${interval.end}`).join("\n");
}

function intervalSection(result: ScheduleSuccess): HTMLElement {
  const section = resultSection("Intervals");
  if (result.intervals.length === 0) {
    const empty = element("p", "empty-result");
    empty.textContent = "No result intervals inside the horizon.";
    section.append(empty);
    return section;
  }
  const list = element("ol", "interval-list");
  for (const interval of result.intervals) {
    const item = document.createElement("li");
    const time = element("div", "interval-time");
    time.textContent = `${interval.start} → ${interval.end}`;
    const meta = element("div", "interval-meta");
    const duration = document.createElement("span");
    duration.textContent = formatDuration(Date.parse(interval.end) - Date.parse(interval.start));
    meta.append(duration);
    for (const source of interval.sources) {
      const chip = element("span", "source-chip");
      chip.textContent = source;
      meta.append(chip);
    }
    item.append(time, meta);
    list.append(item);
  }
  section.append(list);
  return section;
}

function warningSection(warnings: string[]): HTMLElement {
  const section = resultSection("Warnings");
  const list = element("ul", "warning-list");
  for (const warning of warnings) {
    const item = document.createElement("li");
    item.textContent = warning;
    list.append(item);
  }
  section.append(list);
  return section;
}

function recurrenceSection(result: ScheduleSuccess): HTMLElement {
  const section = resultSection("Recurrences");
  const list = element("ul", "recurrence-list");
  for (const recurrence of result.recurrence) {
    const item = document.createElement("li");
    item.textContent = `${recurrence.source}: ${recurrence.generated} occurrence(s)`;
    list.append(item);
  }
  section.append(list);
  return section;
}

function rawDetails(request: WorkspaceDraft, result: ScheduleSuccess | ScheduleFailure): HTMLElement {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "Request and raw result";
  const requestLabel = document.createElement("h3");
  requestLabel.textContent = "Request";
  const requestBlock = element("pre", "raw-block");
  requestBlock.textContent = JSON.stringify(request, null, 2);
  const resultLabel = document.createElement("h3");
  resultLabel.textContent = "Result";
  const resultBlock = element("pre", "raw-block");
  resultBlock.textContent = JSON.stringify(result, null, 2);
  details.append(summary, requestLabel, requestBlock, resultLabel, resultBlock);
  return details;
}

function errorDetails(details: unknown): HTMLElement | undefined {
  if (!Array.isArray(details) || details.length === 0) return undefined;
  const list = element("ul", "error-detail-list");
  for (const detail of details.slice(0, 20)) {
    const item = document.createElement("li");
    if (detail && typeof detail === "object" && "message" in detail) {
      const path = "path" in detail && detail.path ? `${String(detail.path)}: ` : "";
      item.textContent = `${path}${String(detail.message)}`;
    } else {
      item.textContent = String(detail);
    }
    list.append(item);
  }
  return list;
}

function resultSection(titleText: string): HTMLElement {
  const section = element("section", "result-section");
  const title = document.createElement("h3");
  title.textContent = titleText;
  section.append(title);
  return section;
}

function summaryItem(value: string, label: string): HTMLElement {
  const item = element("div", "summary-item");
  const strong = document.createElement("strong");
  strong.textContent = value;
  const span = document.createElement("span");
  span.textContent = label;
  item.append(strong, span);
  return item;
}

function copyButton(label: string, value: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button quiet";
  button.dataset.copy = value;
  button.textContent = label;
  return button;
}

function totalMilliseconds(result: ScheduleSuccess): number {
  return result.intervals.reduce(
    (total, interval) => total + (Date.parse(interval.end) - Date.parse(interval.start)),
    0,
  );
}

function formatDuration(milliseconds: number): string {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return "0s";
  const totalSeconds = Math.round(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  return [days ? `${days}d` : "", hours ? `${hours}h` : "", minutes ? `${minutes}m` : "", seconds ? `${seconds}s` : ""]
    .filter(Boolean)
    .join(" ");
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}
