# Schedule Algebra product model

## Product task

Schedule Algebra answers one bounded question: what exact instant intervals
remain after applying set algebra to explicit schedules? A human can edit
structured intervals and bounded recurrences in a local workbench. Its primary
canvas uses calendar-like time lanes for input and result intervals while exact
fields remain the editing authority. An Agent with already structured facts can
make one `schedule_run` call instead of reimplementing interval arithmetic,
recurrence expansion, or daylight-saving behavior in model reasoning.

The shared deterministic core powers the library, CLI, stdio MCP server, and
loopback HTTP/UI adapter. The product does not define a provider-neutral
Capability or Procedure Profile in v0.1.

## Public identity and distribution

- The human product name is **Schedule Algebra** and the repository slug is
  `schedule-algebra`.
- The stable executable names are `schedule-algebra` and
  `schedule-algebra-mcp`; the Codex plugin id is `schedule-algebra` and its one
  MCP tool remains `schedule_run`.
- openAdam is the author and the source and bundled plugin are licensed under
  Apache-2.0.
- The v0.1 public artifacts are the GitHub source repository and its
  self-contained Codex plugin directory. No npm publication is promised;
  `private: true` prevents accidental registry publication.
- Node.js 22 or newer is the supported runtime.

The human surface is not a calendar account or month-view product. A month grid
would hide sub-day boundaries and imply navigation, event creation, search, and
provider state that do not exist here. The time canvas instead scales the
explicit horizon continuously, labels recurrence inputs until execution, adds a
result lane after a successful run, and invalidates stale output as soon as an
input changes. Layout wrapping is content-driven across wide, intermediate, and
narrow windows; raw request/result JSON stays secondary.

## Data and semantics

- Every request includes a positive, at-most-366-elapsed-day horizon.
- Explicit interval and horizon endpoints are RFC 3339 instants with `Z` or an
  offset. They are half-open `[start,end)`; zero and reversed intervals fail.
- A recurrence uses a local `dtstart` only because it also requires an IANA
  `timeZone`. It additionally requires a positive exact elapsed
  `durationSeconds`, a safety `maxOccurrences`, and an RRULE bounded by `COUNT`
  or inclusive UTC `UNTIL`.
- The v0.1 RRULE subset permits `FREQ` DAILY/WEEKLY/MONTHLY/YEARLY plus
  INTERVAL, COUNT, UNTIL, BYDAY, BYMONTHDAY, BYMONTH, and WKST. High-frequency
  rules and extra content lines fail closed.
- `rrule@2.8.1` performs recurrence rule generation over wall-clock fields.
  `@js-temporal/polyfill@0.5.1` maps those fields through the named time zone.
  The result reports Node, ICU, and tzdb versions because time-zone rules are
  external runtime facts.
- A nonexistent spring-forward local occurrence fails the call with `DST_GAP`.
  An ambiguous fall-back occurrence uses the earlier instant and emits a
  warning. The process default time zone is never consulted.
- Output is sorted and normalized. Union normalization may merge touching
  intervals; touching intervals are never an overlap. `sources` names all
  input items that contributed anywhere to a normalized segment.

## Operations

- `union`: the normalized union of every schedule.
- `intersection`: time present in every schedule; requires two or more.
- `difference`: first schedule minus second; requires exactly two.
- `gaps`: complement of the union inside the horizon.
- `overlaps`: segments covered by at least two source intervals. Endpoint-only
  contact does not count.

## Bounds

The core rejects unknown fields, requests over 262144 UTF-8 bytes, horizons
over 366 days, more than 16 schedules, 1000 explicit intervals per schedule,
32 recurrences per schedule, more than 10000 expanded source intervals, more
than 2000 occurrences for one recurrence, result-count overflow, and complete
responses over 524288 UTF-8 bytes. DTSTART may be at most one year before the
horizon so a tiny output cannot force an unbounded historical scan.

CLI, MCP, and HTTP calls run through an isolated per-call worker. Defaults allow
two active workers and 32 queued calls; later calls fail explicitly with
`SERVER_BUSY`. A two-second deadline covers queue time plus worker execution,
and cancellation terminates the active worker. Each worker receives V8 limits
of 64 MiB old generation, 16 MiB young generation, and a 4 MiB stack. These are
JavaScript heap/stack controls, not a guarantee on whole-process RSS. JSON
framing and adapter protocol parsing still occur outside the worker.

## Agent surface

The repo-owned Codex plugin bundles the MCP server and worker so it does not
depend on this checkout's `node_modules` at runtime. Its `calculate-schedules`
Skill routes exact schedule-set questions to one `schedule_run` call and tells
the Agent not to guess missing horizons, offsets, time-zone ids, recurrence
bounds, or durations. Natural-language interpretation remains outside the
deterministic tool.

## Layer boundary

Migratory Time remains the source for civil-time lookup and conversion.
Equatorium may interpret RRULE syntax and structure; Schedule Algebra owns
bounded occurrence execution and interval set operations. Neither neighboring
product's source is copied or required at runtime.

Natural-language parsing, calendar accounts, connectors, meeting selection or
booking, holidays, reminders, background services, and a general numeric or
version range engine are outside this product.

## Future direction

First deepen the same bounded contract: EXDATE/RDATE as explicit structured
fields, richer provenance for tzdb packaging, and—if real load requires it—a
supervisor that can enforce whole-process RSS and isolate protocol parsing as
well as computation. Current concurrency and latency are measurements without
an SLO, not a scaling claim. Only after real cross-product consumers exist
should a small shared schedule semantic be considered. Calendar-provider
connectors and planning remain separate products.
