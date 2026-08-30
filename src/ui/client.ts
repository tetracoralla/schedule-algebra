import type { ScheduleFailure, ScheduleResult } from "../contract.js";
import {
  addSchedule,
  clearFieldErrors,
  handleScheduleAction,
  loadWorkspace,
  markIssuePaths,
  OPERATION_HINTS,
  requestFromForm,
  SAMPLE,
  validateOperation,
} from "./form.js";
import { intervalCountText, intervalText, renderFailure, renderSuccess } from "./results.js";
import { RunCoordinator } from "./run-coordinator.js";
import { renderTimeCanvas } from "./time-canvas.js";
import type { Operation, WorkspaceDraft } from "./types.js";

const form = required<HTMLFormElement>("#workspace-form");
const schedules = required<HTMLElement>("#schedules");
const resultPane = required<HTMLElement>("#result-pane");
const formError = required<HTMLElement>("#form-error");
const runButton = required<HTMLButtonElement>("#run");
const status = required<HTMLElement>("#status");
const operationHint = required<HTMLElement>("#operation-hint");
const timeCanvas = required<HTMLElement>("#time-canvas");
const timeCanvasRange = required<HTMLElement>("#time-canvas-range");
const timeCanvasLegend = required<HTMLElement>("#time-canvas-legend");

let latestResult: ScheduleResult | undefined;
let latestRequest: WorkspaceDraft | undefined;
const runs = new RunCoordinator();

loadWorkspace(form, schedules, SAMPLE);
updateOperationHint();
syncTimeCanvas();

required<HTMLButtonElement>("#load-sample").addEventListener("click", () => {
  loadWorkspace(form, schedules, SAMPLE);
  clearOutcome();
  updateOperationHint();
  announce("Sample loaded");
});

required<HTMLButtonElement>("#add-schedule").addEventListener("click", () => {
  addSchedule(schedules);
  clearFormMessage();
  invalidateOutcome();
});

schedules.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-action]");
  if (!button) return;
  handleScheduleAction(schedules, button);
  clearFormMessage();
  invalidateOutcome();
});

form.addEventListener("change", (event) => {
  if ((event.target as HTMLInputElement).name === "operation") {
    updateOperationHint();
    invalidateOutcome();
  }
  clearInputError(event.target);
});

form.addEventListener("input", (event) => {
  clearInputError(event.target);
  clearFormMessage();
  invalidateOutcome();
});

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearFieldErrors(form);
  clearFormMessage();
  if (!form.reportValidity()) return;
  const request = requestFromForm(form, schedules);
  const operationError = validateOperation(request);
  if (operationError) {
    showFormMessage(operationError);
    return;
  }

  latestRequest = request;
  latestResult = undefined;
  resultPane.hidden = true;
  resultPane.replaceChildren();
  renderTimeCanvas(timeCanvas, timeCanvasRange, timeCanvasLegend, request);
  const run = runs.start();
  setRunning(true);
  announce("Calculation running");
  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
      signal: run.signal,
    });
    const result = (await response.json()) as ScheduleResult;
    if (!runs.isCurrent(run.id)) return;
    latestResult = result;
    if (result.ok) {
      renderTimeCanvas(timeCanvas, timeCanvasRange, timeCanvasLegend, request, result);
      renderSuccess(resultPane, result, request);
      announce(`Calculation complete: ${intervalCountText(result.intervals.length)}`);
    } else {
      renderTimeCanvas(timeCanvas, timeCanvasRange, timeCanvasLegend, request);
      renderFailure(resultPane, result, request);
      markIssuePaths(form, result.error.details);
      announce(`Calculation failed: ${result.error.code}`);
    }
  } catch (error) {
    if (!runs.isCurrent(run.id) || run.signal.aborted) return;
    const failure: ScheduleFailure = {
      ok: false,
      error: {
        code: "EXECUTION_FAILED",
        message: error instanceof Error ? error.message : "The local service did not respond",
      },
    };
    latestResult = failure;
    renderTimeCanvas(timeCanvas, timeCanvasRange, timeCanvasLegend, request);
    renderFailure(resultPane, failure, request);
    announce("Calculation failed");
  } finally {
    if (runs.finish(run.id)) setRunning(false);
  }
});

resultPane.addEventListener("click", async (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-copy]");
  if (!button || !latestResult || !latestRequest) return;
  let text = JSON.stringify(latestResult, null, 2);
  if (button.dataset.copy === "intervals" && latestResult.ok) text = intervalText(latestResult);
  try {
    await navigator.clipboard.writeText(text);
    announce("Copied to clipboard");
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = original), 1_200);
  } catch {
    announce("Clipboard access was unavailable");
  }
});

function updateOperationHint(): void {
  const operation = form.querySelector<HTMLInputElement>('input[name="operation"]:checked')?.value as Operation;
  operationHint.textContent = OPERATION_HINTS[operation];
}

function clearOutcome(): void {
  invalidateOutcome();
  clearFieldErrors(form);
  clearFormMessage();
}

function invalidateOutcome(): void {
  const hadOutcome = latestRequest !== undefined;
  runs.invalidate();
  setRunning(false);
  // Field paths can be renumbered by structural edits. Once the associated
  // result is invalidated, no previous marker remains authoritative.
  clearFieldErrors(form);
  latestRequest = undefined;
  latestResult = undefined;
  resultPane.hidden = true;
  resultPane.replaceChildren();
  syncTimeCanvas();
  if (hadOutcome) announce("Inputs changed; run again");
}

function setRunning(running: boolean): void {
  runButton.disabled = running;
  runButton.textContent = running ? "Running…" : "Run calculation";
}

function syncTimeCanvas(): void {
  renderTimeCanvas(
    timeCanvas,
    timeCanvasRange,
    timeCanvasLegend,
    requestFromForm(form, schedules),
  );
}

function showFormMessage(message: string): void {
  formError.hidden = false;
  formError.textContent = message;
  formError.focus();
}

function clearFormMessage(): void {
  formError.hidden = true;
  formError.textContent = "";
}

function clearInputError(target: EventTarget | null): void {
  if (target instanceof HTMLInputElement) target.removeAttribute("aria-invalid");
}

function announce(message: string): void {
  status.textContent = "";
  // requestAnimationFrame never fires in a background tab, which would drop
  // the live-region update entirely.
  setTimeout(() => (status.textContent = message), 0);
}

function required<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) throw new Error(`Missing UI element ${selector}`);
  return node;
}
