import type {
  IntervalDraft,
  Operation,
  RecurrenceDraft,
  ScheduleDraft,
  WorkspaceDraft,
} from "./types.js";

let controlSequence = 0;

export const OPERATION_HINTS: Record<Operation, string> = {
  union: "Keep time covered by any schedule.",
  intersection: "Keep time present in every schedule.",
  difference: "Subtract the second schedule from the first.",
  gaps: "Find time not covered by any schedule inside the horizon.",
  overlaps: "Find time covered by at least two source intervals.",
};

export const SAMPLE: WorkspaceDraft = {
  operation: "intersection",
  horizon: { start: "2026-09-01T00:00:00Z", end: "2026-09-02T00:00:00Z" },
  schedules: [
    {
      id: "team-a",
      intervals: [{ start: "2026-09-01T09:00:00Z", end: "2026-09-01T12:00:00Z" }],
      recurrences: [],
    },
    {
      id: "team-b",
      intervals: [{ start: "2026-09-01T10:00:00Z", end: "2026-09-01T11:00:00Z" }],
      recurrences: [],
    },
  ],
};

export function loadWorkspace(form: HTMLFormElement, container: HTMLElement, draft: WorkspaceDraft): void {
  const operation = form.querySelector<HTMLInputElement>(`input[name="operation"][value="${draft.operation}"]`);
  if (operation) operation.checked = true;
  requiredInput(form, "#horizon-start").value = draft.horizon.start;
  requiredInput(form, "#horizon-end").value = draft.horizon.end;
  container.replaceChildren(...draft.schedules.map((schedule) => scheduleCard(schedule)));
  renumber(container);
}

export function addSchedule(container: HTMLElement): void {
  const index = container.querySelectorAll<HTMLElement>(".schedule-card").length + 1;
  container.append(
    scheduleCard({
      id: `schedule-${index}`,
      intervals: [{ start: "", end: "" }],
      recurrences: [],
    }),
  );
  renumber(container);
  container.querySelector<HTMLElement>(".schedule-card:last-child input")?.focus();
}

export function handleScheduleAction(container: HTMLElement, button: HTMLButtonElement): void {
  const action = button.dataset.action;
  const card = button.closest<HTMLElement>(".schedule-card");
  if (!card) return;
  if (action === "remove-schedule") card.remove();
  if (action === "add-interval") {
    card.querySelector<HTMLElement>(".interval-list")?.append(intervalRow({ start: "", end: "" }));
  }
  if (action === "add-recurrence") {
    card.querySelector<HTMLElement>(".recurrence-list")?.append(
      recurrenceRow({
        id: `recurrence-${card.querySelectorAll(".recurrence-row").length + 1}`,
        dtstart: "",
        timeZone: "UTC",
        rrule: "FREQ=DAILY;COUNT=5",
        durationSeconds: 3600,
        maxOccurrences: 100,
      }),
    );
  }
  if (action === "remove-item") button.closest<HTMLElement>(".item-row")?.remove();
  renumber(container);
}

export function requestFromForm(form: HTMLFormElement, container: HTMLElement): WorkspaceDraft {
  const operation = form.querySelector<HTMLInputElement>('input[name="operation"]:checked')?.value as Operation;
  const schedules = [...container.querySelectorAll<HTMLElement>(".schedule-card")].map((card) => ({
    id: card.querySelector<HTMLInputElement>('[data-field="id"]')?.value.trim() ?? "",
    intervals: [...card.querySelectorAll<HTMLElement>(".interval-row")].map((row) => {
      const id = value(row, "id");
      return {
        ...(id ? { id } : {}),
        start: value(row, "start"),
        end: value(row, "end"),
      };
    }),
    recurrences: [...card.querySelectorAll<HTMLElement>(".recurrence-row")].map((row) => ({
      id: value(row, "id"),
      dtstart: value(row, "dtstart"),
      timeZone: value(row, "timeZone"),
      rrule: value(row, "rrule"),
      durationSeconds: numberValue(row, "durationSeconds"),
      maxOccurrences: numberValue(row, "maxOccurrences"),
    })),
  }));
  return {
    operation,
    horizon: {
      start: requiredInput(form, "#horizon-start").value.trim(),
      end: requiredInput(form, "#horizon-end").value.trim(),
    },
    schedules,
  };
}

export function validateOperation(draft: WorkspaceDraft): string | undefined {
  if (draft.schedules.length === 0) return "Add at least one schedule.";
  if (draft.operation === "intersection" && draft.schedules.length < 2) {
    return "Intersection needs at least two schedules.";
  }
  if (draft.operation === "difference" && draft.schedules.length !== 2) {
    return "Difference needs exactly two schedules: the first minus the second.";
  }
  return undefined;
}

export function clearFieldErrors(form: HTMLFormElement): void {
  for (const input of form.querySelectorAll<HTMLInputElement>('[aria-invalid="true"]')) {
    input.removeAttribute("aria-invalid");
  }
}

export function markIssuePaths(form: HTMLFormElement, details: unknown): void {
  if (!Array.isArray(details)) return;
  const fields = [...form.querySelectorAll<HTMLInputElement>("[data-path]")];
  for (const detail of details) {
    if (!detail || typeof detail !== "object" || !("path" in detail)) continue;
    const field = fields.find((input) => input.dataset.path === String(detail.path));
    field?.setAttribute("aria-invalid", "true");
  }
  fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
}

function scheduleCard(schedule: ScheduleDraft): HTMLElement {
  const card = element("article", "schedule-card");
  const header = element("div", "schedule-header");
  header.append(field("Schedule ID", "id", schedule.id, { required: true }));
  header.append(actionButton("Remove", "remove-schedule", "button quiet danger"));

  const body = element("div", "schedule-body");
  const intervals = itemGroup("Intervals", "add-interval", "Add interval", "interval-list");
  const intervalList = intervals.querySelector<HTMLElement>(".item-list");
  intervalList?.append(...schedule.intervals.map(intervalRow));
  const recurrences = itemGroup(
    "Recurrences",
    "add-recurrence",
    "Add recurrence",
    "recurrence-list",
  );
  const recurrenceList = recurrences.querySelector<HTMLElement>(".item-list");
  recurrenceList?.append(...schedule.recurrences.map(recurrenceRow));
  body.append(intervals, recurrences);
  card.append(header, body);
  return card;
}

function itemGroup(title: string, action: string, actionLabel: string, listClass: string): HTMLElement {
  const group = element("section", "item-group");
  const header = element("div", "item-group-header");
  const heading = document.createElement("h4");
  heading.textContent = title;
  header.append(heading, actionButton(actionLabel, action, "button quiet"));
  group.append(header, element("div", `item-list ${listClass}`));
  return group;
}

function intervalRow(interval: IntervalDraft): HTMLElement {
  const row = itemRow("interval-row");
  const grid = element("div", "item-row-grid interval-grid");
  grid.append(
    field("Item ID", "id", interval.id ?? "", { placeholder: "optional" }),
    field("Start", "start", interval.start, { required: true }),
    field("End", "end", interval.end, { required: true }),
  );
  row.append(grid);
  return row;
}

function recurrenceRow(recurrence: RecurrenceDraft): HTMLElement {
  const row = itemRow("recurrence-row");
  const grid = element("div", "item-row-grid recurrence-grid");
  grid.append(
    field("Recurrence ID", "id", recurrence.id, { required: true }),
    field("Local start", "dtstart", recurrence.dtstart, {
      required: true,
      placeholder: "2026-09-01T09:00:00",
    }),
    field("IANA time zone", "timeZone", recurrence.timeZone, { required: true }),
    field("RRULE", "rrule", recurrence.rrule, { required: true, className: "wide" }),
    field("Duration (seconds)", "durationSeconds", String(recurrence.durationSeconds), {
      required: true,
      type: "number",
      min: "1",
    }),
    field("Occurrence limit", "maxOccurrences", String(recurrence.maxOccurrences), {
      required: true,
      type: "number",
      min: "1",
      max: "2000",
    }),
  );
  row.append(grid);
  return row;
}

function itemRow(className: string): HTMLElement {
  const row = element("div", `item-row ${className}`);
  const header = element("div", "item-row-header");
  const label = document.createElement("strong");
  header.append(label, actionButton("Remove", "remove-item", "button quiet danger"));
  row.append(header);
  return row;
}

interface FieldOptions {
  required?: boolean;
  placeholder?: string;
  type?: string;
  min?: string;
  max?: string;
  className?: string;
}

function field(labelText: string, fieldName: string, initialValue: string, options: FieldOptions = {}): HTMLElement {
  const wrapper = element("div", `field${options.className ? ` ${options.className}` : ""}`);
  const id = `control-${++controlSequence}`;
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement("input");
  input.id = id;
  input.dataset.field = fieldName;
  input.value = initialValue;
  input.autocomplete = "off";
  input.required = options.required ?? false;
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.type) input.type = options.type;
  if (options.min) input.min = options.min;
  if (options.max) input.max = options.max;
  wrapper.append(label, input);
  return wrapper;
}

function actionButton(label: string, action: string, className: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.dataset.action = action;
  button.textContent = label;
  return button;
}

function renumber(container: HTMLElement): void {
  const cards = [...container.querySelectorAll<HTMLElement>(".schedule-card")];
  for (const [scheduleIndex, card] of cards.entries()) {
    setPath(card.querySelector<HTMLInputElement>('[data-field="id"]'), `schedules.${scheduleIndex}.id`);
    const intervalRows = [...card.querySelectorAll<HTMLElement>(".interval-row")];
    for (const [itemIndex, row] of intervalRows.entries()) {
      row.querySelector("strong")!.textContent = `Interval ${itemIndex + 1}`;
      for (const input of row.querySelectorAll<HTMLInputElement>("[data-field]")) {
        setPath(input, `schedules.${scheduleIndex}.intervals.${itemIndex}.${input.dataset.field}`);
      }
    }
    const recurrenceRows = [...card.querySelectorAll<HTMLElement>(".recurrence-row")];
    for (const [itemIndex, row] of recurrenceRows.entries()) {
      row.querySelector("strong")!.textContent = `Recurrence ${itemIndex + 1}`;
      for (const input of row.querySelectorAll<HTMLInputElement>("[data-field]")) {
        setPath(input, `schedules.${scheduleIndex}.recurrences.${itemIndex}.${input.dataset.field}`);
      }
    }
    const itemCount = intervalRows.length + recurrenceRows.length;
    for (const remove of card.querySelectorAll<HTMLButtonElement>('[data-action="remove-item"]')) {
      remove.disabled = itemCount <= 1;
      remove.title = itemCount <= 1 ? "A schedule needs at least one item" : "";
    }
    card.querySelector<HTMLButtonElement>('[data-action="remove-schedule"]')!.disabled = cards.length <= 1;
  }
}

function setPath(input: HTMLInputElement | null, path: string): void {
  if (input) input.dataset.path = path;
}

function value(row: HTMLElement, fieldName: string): string {
  return row.querySelector<HTMLInputElement>(`[data-field="${fieldName}"]`)?.value.trim() ?? "";
}

function numberValue(row: HTMLElement, fieldName: string): number {
  return Number(value(row, fieldName));
}

function requiredInput(root: ParentNode, selector: string): HTMLInputElement {
  const input = root.querySelector<HTMLInputElement>(selector);
  if (!input) throw new Error(`Missing input ${selector}`);
  return input;
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}
