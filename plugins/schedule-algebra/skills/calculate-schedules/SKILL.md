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
- Preserve every supplied instant, local start, time-zone id, rule, duration, identifier, and bound exactly. Ask for any missing fact that changes the result; never guess it.

## Keep the boundary honest

- Use Migratory Time for civil-time lookup or conversion and Equatorium for structural RRULE interpretation. Schedule Algebra owns bounded occurrence execution and interval set algebra.
- Do not use this tool for natural-language planning, holiday inference, calendar accounts, meeting selection, reminders, booking, or background work.
- A structured error means the calculation did not produce a negative or empty answer. Correct the explicit input or ask for the missing choice instead of replacing the error with model reasoning.

## Present the result

Lead with the exact result intervals or state that none remain inside the horizon. Preserve warnings, recurrence truncation, half-open endpoint semantics, and source identities when they affect use. Keep engine and runtime provenance secondary unless the user asks or time-zone reproducibility matters.
