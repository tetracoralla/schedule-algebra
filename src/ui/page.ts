export const PAGE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Schedule Algebra</title>
  <link rel="stylesheet" href="/app.css">
</head>
<body>
  <header class="app-header">
    <div class="brand"><h1>Schedule Algebra</h1></div>
    <div class="header-actions">
      <button class="button secondary" id="load-sample" type="button">Load sample</button>
      <button class="button primary" id="run" type="submit" form="workspace-form">Run calculation</button>
    </div>
  </header>
  <main class="workspace">
    <form id="workspace-form" novalidate>
      <h2 id="builder-title" class="visually-hidden">Schedule calculation</h2>
      <div class="setup-deck">
        <section class="control-panel" aria-labelledby="operation-title">
          <div class="section-heading"><h3 id="operation-title">Operation</h3></div>
          <fieldset class="operation-picker">
            <legend class="visually-hidden">Choose an operation</legend>
            <label><input type="radio" name="operation" value="union"><span>Union</span></label>
            <label><input type="radio" name="operation" value="intersection" checked><span>Intersection</span></label>
            <label><input type="radio" name="operation" value="difference"><span>Difference</span></label>
            <label><input type="radio" name="operation" value="gaps"><span>Gaps</span></label>
            <label><input type="radio" name="operation" value="overlaps"><span>Overlaps</span></label>
          </fieldset>
          <p id="operation-hint" class="operation-hint"></p>
        </section>

        <section class="control-panel" aria-labelledby="horizon-title">
          <div class="section-heading"><h3 id="horizon-title">Horizon</h3></div>
          <div class="horizon-grid">
            <div class="field"><label for="horizon-start">From</label><input id="horizon-start" data-path="horizon.start" autocomplete="off" required></div>
            <div class="field"><label for="horizon-end">To</label><input id="horizon-end" data-path="horizon.end" autocomplete="off" required></div>
          </div>
        </section>
      </div>

      <div id="form-error" class="form-error" role="alert" tabindex="-1" hidden></div>

      <div class="workbench-grid">
        <section class="time-panel" aria-labelledby="time-canvas-title">
          <div class="time-panel-header">
            <div>
              <h3 id="time-canvas-title">Time canvas</h3>
              <p id="time-canvas-range"></p>
            </div>
            <div id="time-canvas-legend" class="time-canvas-legend" aria-label="Timeline legend"></div>
          </div>
          <div id="time-canvas" class="time-canvas"></div>
        </section>

        <section class="schedules-section" aria-labelledby="schedules-title">
          <div class="section-heading schedules-heading">
            <h3 id="schedules-title">Schedules</h3>
            <button class="button quiet" id="add-schedule" type="button">Add schedule</button>
          </div>
          <div id="schedules"></div>
        </section>
      </div>
    </form>

    <aside id="result-pane" class="result-pane" aria-labelledby="result-title" hidden></aside>
  </main>
  <div id="status" class="visually-hidden" role="status" aria-live="polite"></div>
  <script type="module" src="/ui/client.js"></script>
</body>
</html>`;
