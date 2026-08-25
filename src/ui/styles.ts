export const STYLES = `
:root {
  color-scheme: light;
  --canvas: #f3f5f2;
  --surface: #ffffff;
  --surface-muted: #f7f8f6;
  --ink: #18211d;
  --muted: #627068;
  --line: #d9dfda;
  --line-strong: #b9c4bc;
  --accent: #176b54;
  --accent-hover: #105440;
  --accent-soft: #e5f1ec;
  --danger: #a33a34;
  --danger-soft: #faecea;
  --warning: #7b5812;
  --warning-soft: #fff6db;
  --focus: #2279c9;
  --shadow: 0 12px 34px rgba(28, 42, 34, .07);
  font: 15px/1.45 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; overflow-x: hidden; background: var(--canvas); color: var(--ink); }
button, input { font: inherit; }
button { color: inherit; }
button:focus-visible, input:focus-visible, summary:focus-visible, [tabindex="-1"]:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--focus) 30%, transparent);
  outline-offset: 2px;
}
.visually-hidden { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.app-header { position: sticky; top: 0; z-index: 20; min-height: 64px; padding: 12px clamp(12px, 2vw, 28px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 20px; background: color-mix(in srgb, var(--surface) 94%, transparent); border-bottom: 1px solid var(--line); backdrop-filter: blur(14px); }
.brand { display: flex; align-items: baseline; gap: 12px; min-width: 0; }
.brand h1 { margin: 0; font-size: 18px; line-height: 1.2; letter-spacing: -.01em; }
.header-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; flex: none; margin-left: auto; }
.button { min-height: 36px; border: 1px solid transparent; border-radius: 8px; padding: 7px 12px; cursor: pointer; font-weight: 650; }
.button.primary { background: var(--accent); color: white; }
.button.primary:hover { background: var(--accent-hover); }
.button.secondary { background: var(--surface); border-color: var(--line-strong); }
.button.secondary:hover, .button.quiet:hover { background: var(--surface-muted); border-color: var(--line-strong); }
.button.quiet { min-height: 32px; padding: 5px 9px; background: transparent; border-color: var(--line); font-size: 13px; }
.button.danger { color: var(--danger); }
.button:disabled { cursor: not-allowed; opacity: .48; }
.workspace { width: 100%; max-width: 1800px; margin: clamp(10px, 2vw, 24px) auto 40px; padding-inline: clamp(10px, 2vw, 28px); }
#workspace-form { display: grid; gap: clamp(12px, 1.4vw, 20px); min-width: 0; }
.setup-deck, .workbench-grid { display: flex; flex-wrap: wrap; gap: clamp(12px, 1.4vw, 20px); align-items: flex-start; }
.setup-deck .control-panel:first-child { flex: 1.35 1 38rem; }
.setup-deck .control-panel:last-child { flex: .65 1 24rem; }
.control-panel, .time-panel, .schedule-card, .result-pane { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; box-shadow: var(--shadow); }
.control-panel { padding: 18px; }
.section-heading { min-height: 32px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.section-heading h3 { margin: 0; font-size: 14px; letter-spacing: .01em; }
.operation-picker { border: 0; padding: 0; margin: 12px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 7.5rem), 1fr)); gap: 6px; }
.operation-picker label { cursor: pointer; min-width: 0; }
.operation-picker input { position: absolute; opacity: 0; pointer-events: none; }
.operation-picker span { min-height: 38px; display: grid; place-items: center; padding: 7px 8px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface-muted); font-size: 13px; font-weight: 650; text-align: center; }
.operation-picker input:checked + span { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
.operation-picker input:focus-visible + span { outline: 3px solid color-mix(in srgb, var(--focus) 30%, transparent); outline-offset: 2px; }
.operation-hint { min-height: 20px; margin: 9px 0 0; color: var(--muted); font-size: 13px; }
.horizon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 12px; margin-top: 12px; }
.field { display: grid; gap: 5px; min-width: 0; }
.field label { color: var(--muted); font-size: 12px; font-weight: 650; }
.field input { min-width: 0; width: 100%; height: 38px; padding: 7px 9px; border: 1px solid var(--line-strong); border-radius: 7px; background: var(--surface); color: var(--ink); }
.field input:hover { border-color: color-mix(in srgb, var(--line-strong) 62%, var(--ink)); }
.field input[aria-invalid="true"] { border-color: var(--danger); background: var(--danger-soft); }
.form-error { padding: 11px 13px; border: 1px solid color-mix(in srgb, var(--danger) 35%, var(--line)); border-radius: 8px; background: var(--danger-soft); color: var(--danger); }
.workbench-grid { min-width: 0; }
.time-panel { position: sticky; top: 84px; flex: 1.35 1 42rem; min-width: min(100%, 32rem); padding: clamp(14px, 1.5vw, 20px); container-type: inline-size; }
.schedules-section { flex: .75 1 28rem; min-width: min(100%, 24rem); display: grid; gap: 10px; }
.schedules-heading { padding: 0 2px; }
#schedules { display: grid; gap: 12px; }
.schedule-card { overflow: hidden; }
.schedule-header { padding: 14px 16px; display: grid; grid-template-columns: minmax(180px, 1fr) auto; gap: 12px; align-items: end; border-bottom: 1px solid var(--line); background: var(--surface-muted); }
.schedule-header .field label { color: var(--ink); font-size: 13px; }
.schedule-body { padding: 16px; display: grid; gap: 18px; }
.item-group { display: grid; gap: 9px; }
.item-group-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.item-group-header h4 { margin: 0; font-size: 13px; }
.item-list { display: grid; gap: 8px; }
.item-row { padding: 11px; display: grid; gap: 9px; border: 1px solid var(--line); border-radius: 9px; background: var(--surface); }
.item-row-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.item-row-header strong { font-size: 12px; color: var(--muted); }
.item-row-grid { display: grid; gap: 9px; }
.interval-grid, .recurrence-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr)); }
.recurrence-grid .wide { grid-column: 1 / -1; }
.time-panel-header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 8px 20px; margin-bottom: 16px; }
.time-panel-header h3 { margin: 0; font-size: 16px; }
.time-panel-header p { margin: 3px 0 0; color: var(--muted); font: 11px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; }
.time-canvas-legend { display: flex; flex-wrap: wrap; gap: 12px; color: var(--muted); font-size: 11px; }
.legend-item { display: inline-flex; align-items: center; gap: 5px; }
.legend-swatch { width: 9px; height: 9px; border-radius: 3px; background: #4b7ca8; }
.legend-swatch.result { background: var(--accent); }
.time-canvas { overflow: hidden; border: 1px solid var(--line); border-radius: 10px; background: var(--surface-muted); }
.time-axis, .canvas-lane { display: grid; grid-template-columns: clamp(6.5rem, 14vw, 10rem) minmax(0, 1fr); }
.time-axis { min-height: 34px; color: var(--muted); font-size: 10px; }
.axis-zone, .lane-label { border-right: 1px solid var(--line); }
.axis-zone { display: flex; align-items: center; padding-inline: 12px; font-weight: 700; letter-spacing: .04em; }
.axis-track { position: relative; min-width: 0; }
.axis-tick { position: absolute; top: 10px; white-space: nowrap; }
.axis-tick[data-edge="start"] { transform: none; }
.axis-tick[data-edge="middle"] { transform: translateX(-50%); }
.axis-tick[data-edge="end"] { transform: translateX(-100%); }
.canvas-lane { min-height: 72px; border-top: 1px solid var(--line); }
.canvas-lane.result { border-top: 2px solid color-mix(in srgb, var(--accent) 55%, var(--line)); background: color-mix(in srgb, var(--accent-soft) 42%, var(--surface)); }
.lane-label { min-width: 0; padding: 13px 12px; display: flex; flex-direction: column; justify-content: center; }
.lane-label strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.lane-label span { margin-top: 3px; color: var(--muted); font-size: 10px; line-height: 1.3; }
.lane-track { position: relative; min-width: 0; min-height: 70px; overflow: hidden; background: repeating-linear-gradient(90deg, transparent 0, transparent calc(25% - 1px), var(--line) 25%, transparent calc(25% + 1px)); }
.lane-bar { position: absolute; top: calc(11px + var(--row, 0) * 15px); height: 18px; min-width: 3px; border: 1px solid color-mix(in srgb, #4b7ca8 72%, black); border-radius: 5px; background: color-mix(in srgb, #4b7ca8 82%, white); }
.canvas-lane.hue-1 .lane-bar { border-color: #79568d; background: #a882bc; }
.canvas-lane.hue-2 .lane-bar { border-color: #9b6734; background: #d09458; }
.canvas-lane.hue-3 .lane-bar { border-color: #397579; background: #5ca1a5; }
.canvas-lane.result .lane-bar { border-color: var(--accent-hover); background: var(--accent); }
.lane-empty { position: absolute; inset: 0; display: grid; place-items: center; padding: 8px; color: var(--muted); font-size: 10px; }
.canvas-message { margin: 0; padding: 24px; color: var(--muted); text-align: center; }
.result-pane { min-width: 0; margin-top: clamp(12px, 1.4vw, 20px); padding: clamp(14px, 1.5vw, 20px); }
.result-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.result-header h2 { margin: 0; font-size: 17px; }
.result-actions { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr)); gap: 8px; margin-top: 16px; }
.summary-item { padding: 10px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface-muted); }
.summary-item strong { display: block; font-size: 17px; }
.summary-item span { color: var(--muted); font-size: 11px; }
.result-section { margin-top: 20px; }
.result-section h3 { margin: 0 0 9px; font-size: 13px; }
.interval-list, .warning-list, .recurrence-list, .error-detail-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.interval-list li { padding: 10px; border: 1px solid var(--line); border-radius: 8px; }
.interval-time { font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; }
.interval-meta { margin-top: 6px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; color: var(--muted); font-size: 11px; }
.source-chip { padding: 2px 6px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); }
.warning-list li { padding: 9px 10px; border-radius: 8px; background: var(--warning-soft); color: var(--warning); font-size: 12px; }
.recurrence-list li { padding: 7px 0; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 12px; }
.empty-result { margin: 0; color: var(--muted); }
.result-error { padding: 12px; margin-top: 15px; border-radius: 8px; background: var(--danger-soft); color: var(--danger); }
.result-error strong { display: block; margin-bottom: 4px; }
.error-detail-list { margin-top: 10px; }
.error-detail-list li { font-size: 12px; }
details { margin-top: 18px; border-top: 1px solid var(--line); padding-top: 12px; }
summary { cursor: pointer; color: var(--muted); font-size: 12px; font-weight: 650; }
.raw-block { max-height: 240px; overflow: auto; margin: 9px 0 0; padding: 10px; border-radius: 8px; background: #101713; color: #d9e6de; font: 11px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
@media (max-width: 1120px) {
  .time-panel { position: static; }
}
@media (max-width: 620px) {
  .app-header { padding: 10px 14px; align-items: flex-start; }
  .header-actions { width: 100%; gap: 6px; }
  .header-actions .button { flex: 1 1 auto; }
  .button { padding-inline: 10px; }
  .workspace { margin-top: 10px; }
  .schedule-header { grid-template-columns: 1fr auto; padding: 12px; }
  .schedule-body { padding: 12px; }
  .time-axis, .canvas-lane { grid-template-columns: minmax(5.75rem, 30%) minmax(0, 1fr); }
  .axis-zone, .lane-label { padding-inline: 9px; }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --canvas: #111713;
    --surface: #18201b;
    --surface-muted: #1d2721;
    --ink: #e8efea;
    --muted: #a2afa7;
    --line: #313d35;
    --line-strong: #4b5b51;
    --accent: #66c9a8;
    --accent-hover: #7bd8b8;
    --accent-soft: #203d33;
    --danger: #ff9f98;
    --danger-soft: #402522;
    --warning: #f0c869;
    --warning-soft: #3b321d;
    --focus: #77b9f4;
    --shadow: none;
  }
}
`;
