# Contributing to Schedule Algebra

Schedule Algebra is a bounded deterministic schedule-computation provider for
humans and AI Agents. Contributions should preserve one semantic core across
the library, CLI, MCP, HTTP/UI, and bundled plugin.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run check
```

`npm run check` builds the TypeScript and standalone plugin, runs the complete
test suite, checks repository invariants, and exercises an isolated copy of the
plugin over MCP.

## Contract changes

- Preserve half-open interval semantics: `[start, end)`.
- Require an explicit bounded horizon for every request.
- Keep recurrence execution bounded by an IANA time zone, positive duration,
  RRULE `COUNT` or UTC `UNTIL`, and an independent `maxOccurrences` limit.
- Reject unknown fields at every public boundary.
- Keep library, CLI, MCP, HTTP/UI, and plugin behavior on the shared core.
- Add the smallest negative regression for a repaired guard or failure branch.
- Do not add natural-language parsing, calendar connectors, meeting selection,
  booking, reminders, holiday inference, or background work.

Read [docs/PRODUCT_MODEL.md](docs/PRODUCT_MODEL.md) for product meaning and
[docs/REVIEW_CONTRACT.md](docs/REVIEW_CONTRACT.md) before proposing a public
contract change.

## Contribution license

Unless explicitly stated otherwise, contributions submitted for inclusion in
Schedule Algebra are licensed under Apache License 2.0, consistent with the
repository's [LICENSE](LICENSE).
