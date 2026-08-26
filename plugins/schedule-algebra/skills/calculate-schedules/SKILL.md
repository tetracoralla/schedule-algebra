---
name: calculate-schedules
description: Call Schedule Algebra schedule_run once for exact union, intersection, difference, gap, or real-overlap computation over explicit RFC 3339 intervals or bounded RRULE recurrences, including availability and recurring-hours requests in English or Chinese. Do not use it to interpret natural-language dates, look up time zones, connect calendars, recommend meetings, or book anything; never invent a horizon, offset, IANA zone, duration, COUNT/UNTIL bound, or occurrence limit.
---

# Calculate with Schedule Algebra

Use the deterministic runtime when the requested output is a set of exact instant intervals and the necessary schedule facts are explicit. Answer conceptual questions normally when no computation is requested.

## Route one complete call

- Call `schedule_run` directly. Do not list MCP resources or templates; this plugin exposes none.
- Use one call for the complete operation. Do not expand recurrences or redo interval arithmetic in model reasoning before or after a successful call.
- Choose the operation from the user's requested set relationship. If the relationship is genuinely ambiguous, ask before calling.
- Preserve every supplied instant, local start, time-zone id, rule, duration, identifier, and bound exactly.
- Treat `id` fields as ASCII technical correlation keys, not display labels. When the user gives labels but no explicit technical IDs, assign schedules `schedule-1`, `schedule-2`, and so on in input order; omit optional interval IDs so the runtime assigns `item-1`, `item-2`, and so on; assign required recurrence IDs `recurrence-1`, `recurrence-2`, and so on. Keep a local mapping so the answer can relate returned sources back to the user's labels. Never put spaces, non-ASCII text, or `/` in an ID.

## Verify required facts before calling

- Every operation requires an explicit horizon supplied as a distinct user fact. Do not derive the horizon from interval endpoints, recurrence bounds, or the visible data range.
- Every recurrence requires an explicit local `dtstart`, IANA `timeZone`, RRULE bounded by `COUNT` or UTC `UNTIL`, positive `durationSeconds`, and positive `maxOccurrences`. The RRULE bound and `maxOccurrences` are independent; `COUNT` or `UNTIL` does not replace `maxOccurrences`.
- If any required fact is absent or ambiguous, ask for all missing facts in one clarification and end the turn. Make no `schedule_run` call and do not calculate or infer an answer.

## Keep the boundary honest

- Use Migratory Time for civil-time lookup or conversion and Equatorium for structural RRULE interpretation. Schedule Algebra owns bounded occurrence execution and interval set algebra.
- Do not use this tool for natural-language planning, holiday inference, calendar accounts, meeting selection, reminders, booking, or background work.
- A structured error means the calculation did not produce a negative or empty answer. Do not inspect repository source, manually calculate, or present an inferred result after an error. Correct only a mechanically invalid generated technical ID; otherwise report the error or ask for the missing choice.

## Present the result

Lead with the exact result intervals or state that none remain inside the horizon. Preserve warnings, recurrence truncation, half-open endpoint semantics, and source identities when they affect use. Keep engine and runtime provenance secondary unless the user asks or time-zone reproducibility matters.
