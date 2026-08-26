# Schedule Algebra review contract

Review current source and runtime; previous reports and green output are leads,
not authority. Keep review read-only unless the owner also requests repair.

## Authority and carriers

1. `src/contract.ts` owns accepted public input and result shapes.
2. `src/core.ts`, `src/interval-algebra.ts`, and `src/recurrence.ts` own the
   shared limits, interval operations, RRULE expansion, and DST behavior.
3. `src/executor.ts` owns external-call admission, queueing, per-call isolation,
   deadlines, cancellation, and V8 resource limits. Source carriers use a Node
   Worker; the bundled Codex MCP uses an isolated Node child process, with a
   bounded direct-core compatibility fallback only after two abnormal
   infrastructure exits.
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
- deterministic sorting/normalization and output-segment-local source
  correlation, including touching inputs normalized before intersection or
  difference;
- RFC3339 offset enforcement, IANA-only recurrence zones, positive intervals,
  resolved item-id uniqueness, closed objects, operation arity, and
  horizon/input/occurrence/result budgets;
- RRULE COUNT, UTC UNTIL, mandatory semantic bound, mandatory horizon,
  unsupported high-frequency rejection, and post-limit recovery;
- America/New_York spring gap rejection, fall fold earlier resolution, and a
  wall-time sequence whose UTC offset changes across DST;
- a built CLI success and invalid exit, with the complete emitted JSON line
  inside the response-byte budget;
- a real stdio MCP initialize/list/call/invalid/recovery lifecycle, live schema
  `additionalProperties: false`, and the complete JSON-RPC tool-response line
  inside the response-byte budget;
- a real loopback HTTP page, success, invalid request, recovery, and complete
  JSON body inside the response-byte budget;
- non-JSON rejection, cumulative timeout, cancellation, queue overflow, close,
  one bounded abnormal-process retry, direct fallback after two infrastructure
  exits, and successful reuse after each applicable isolated-execution failure;
- an isolated copy of the bundled plugin listing one live tool, rejecting an
  invalid call, recovering on a valid call, and requiring no repo dependencies.

The performance command is not part of `npm run check` and has no PASS
threshold. Record its machine/runtime context and current output as a baseline.

For a public source or plugin release, also establish:

- root `LICENSE`, `NOTICE`, and `THIRD_PARTY_NOTICES.md` agree with the
  Apache-2.0 package metadata and openAdam attribution;
- the installable plugin root carries byte-identical copies of those three
  legal files alongside its prebuilt runtime;
- the third-party notice inventory is regenerated from the exact package inputs
  bundled by esbuild rather than a handwritten dependency shortlist;
- a clean checkout can run `npm ci` and `npm run check` without another source
  checkout, an installed plugin cache, or untracked files;
- GitHub remote state, CI, security controls, release assets, and public
  re-acquisition remain BLOCKED until the repository is actually published.

For a local installed-host review, also establish all of the following rather
than inheriting the source result:

- the marketplace is registered and the plugin is installed and enabled;
- installed manifest, MCP config, Skill, server bundle, Worker bundle, and
  process-entry bundle match the reviewed source build;
- a fresh Codex task routes an ordinary exact schedule question to
  exactly one `schedule_run` call and returns the exact interval result,
  including when human display labels are not valid technical IDs;
- a separate cold prompt containing exact intervals but no explicit horizon
  makes no `schedule_run` call, does not derive a horizon from the interval
  endpoints, and asks for the horizon;
- a separate cold recurrence prompt with an explicit horizon but no IANA zone,
  duration, or `maxOccurrences` makes no `schedule_run` call and requests all
  three missing facts. An RRULE `COUNT` does not replace `maxOccurrences`.

For the human runtime, inspect the current rendered canvas at wide,
intermediate, and narrow widths. Check content-driven reflow, absence of
horizontal overflow, input/result lane alignment, keyboard submission,
field-linked invalid feedback, in-flight stale-response invalidation, exact
sub-millisecond interval rendering, copy actions, and recovery. An HTTP page
assertion alone is insufficient.

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
