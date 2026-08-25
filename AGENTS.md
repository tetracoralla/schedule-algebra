# Schedule Algebra contributor contract

This repository provides bounded, deterministic schedule computation. The
authority order is current source and tests, `docs/PRODUCT_MODEL.md`, then
`docs/REVIEW_CONTRACT.md`.

- Keep interval semantics half-open: `[start, end)`. Touching endpoints do not
  overlap. Normalized output may merge touching intervals.
- All ordinary intervals and horizons are RFC 3339 instants with `Z` or an
  explicit offset. A recurrence DTSTART is intentionally a local wall time and
  is valid only with an IANA time-zone id.
- Every recurrence execution requires an explicit horizon, positive duration,
  and per-recurrence occurrence limit. Never add an unbounded route.
- Preserve one core for library, CLI, MCP, and HTTP/UI behavior. Reject unknown
  fields at every public boundary.
- Do not add natural-language parsing, account/calendar connectors, meeting
  recommendation or booking, reminders, holiday inference, or background work.
- Equatorium may eventually explain RRULE structure. This product owns bounded
  occurrence execution and interval algebra; do not copy source between them.
- Migratory Time owns civil-time facts and conversion. Do not make this product
  a world-clock or time-zone lookup UI.
- This repository declares no provider-neutral Capability or Procedure Profile.
- Do not commit, push, publish, deploy, install globally, or change user
  configuration unless the owner explicitly authorizes it.

Run `npm run check` before handoff. Report development, Agent runtime, human
runtime, installed-host state, and owner experience acceptance separately.
