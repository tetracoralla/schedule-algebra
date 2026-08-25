# Schedule Algebra review contract

Review current source and runtime; previous reports and green output are leads,
not authority. Keep review read-only unless the owner also requests repair.

## Authority and carriers

1. `src/contract.ts` owns accepted public input and result shapes.
2. `src/core.ts`, `src/interval-algebra.ts`, and `src/recurrence.ts` own the
   shared limits, interval operations, RRULE expansion, and DST behavior.
3. `src/executor.ts` owns external-call admission, queueing, worker isolation,
   deadlines, cancellation, and worker resource limits.
4. `src/cli.ts`, `src/mcp.ts`, and `src/http.ts` are adapters around that
   executor; `src/ui/*` owns the human workbench and time canvas.
5. `plugins/schedule-algebra` owns the bundled Codex runtime and thin routing
   Skill. `.agents/plugins/marketplace.json` owns the local marketplace entry.
6. `docs/PRODUCT_MODEL.md` explains current product meaning.

There is one public MCP tool, `schedule_run`, annotated read-only, idempotent,
non-destructive, and closed-world. The CLI accepts JSON on stdin or via an
explicit human `--input` path. The HTTP server binds loopback only.

## Required regression and runtime sequences

Run:

```sh
npm ci
npm run check
npm run measure:baseline
git status --short
```

The suite must establish:

- half-open union/intersection/difference/gaps/overlaps and endpoint contact;
- deterministic sorting/normalization and source correlation;
- RFC3339 offset enforcement, positive intervals, closed objects, operation
  arity, horizon/input/occurrence/result budgets;
- RRULE COUNT, UTC UNTIL, mandatory semantic bound, mandatory horizon,
  unsupported high-frequency rejection, and post-limit recovery;
- America/New_York spring gap rejection, fall fold earlier resolution, and a
  wall-time sequence whose UTC offset changes across DST;
- a built CLI success and invalid exit;
- a real stdio MCP initialize/list/call/invalid/recovery lifecycle and live
  schema `additionalProperties: false`;
- a real loopback HTTP page, success, invalid request, and recovery.
- non-JSON rejection, cumulative timeout, cancellation, queue overflow, close,
  and successful reuse after each applicable worker failure;
- an isolated copy of the bundled plugin listing one live tool, rejecting an
  invalid call, recovering on a valid call, and requiring no repo dependencies.

The performance command is not part of `npm run check` and has no PASS
threshold. Record its machine/runtime context and current output as a baseline.

For a local installed-host review, also establish all of the following rather
than inheriting the source result:

- the marketplace is registered and the plugin is installed and enabled;
- installed manifest, MCP config, Skill, server bundle, and worker bundle match
  the reviewed source build;
- a fresh Codex task routes an ordinary exact schedule question to
  `schedule_run` and returns the exact interval result;
- missing required facts are requested or rejected rather than guessed.

For the human runtime, inspect the current rendered canvas at wide,
intermediate, and narrow widths. Check content-driven reflow, absence of
horizontal overflow, input/result lane alignment, keyboard submission,
field-linked invalid feedback, stale-result invalidation, copy actions, and
recovery. An HTTP page assertion alone is insufficient.

## Verdict lanes

- **development regression:** build, tests, schema and repo invariants.
- **runtime Agent flow:** direct stdio MCP and bundled-plugin lifecycle.
- **installed-host state:** installed files, enabled state, and a fresh Codex
  routing flow; report host warnings or routing detours separately.
- **runtime human flow:** live loopback page/API plus current-canvas inspection
  across widths and interaction recovery.
- **performance/load/Agent economics:** report measured current facts only;
  no SLO exists. Structured input can use CLI/library at zero model turns.
- **business/experience acceptance:** only the owner can accept value and fit.

## Workspace escalations

Report any emerging duplicate schedule semantic, shared error/schema drift,
installed namespace collision, runtime resource conflict, or pressure to move
RRULE execution into Equatorium. Write `none observed` when current evidence
finds none. Local PASS never implies a tools-dev workspace PASS.
