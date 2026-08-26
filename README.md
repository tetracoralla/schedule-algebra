# Schedule Algebra

Bounded interval and zoned-recurrence set algebra for humans and AI Agents.

Schedule Algebra answers one deterministic question: which exact instant
intervals remain after union, intersection, difference, gap, or real-overlap
operations over explicit schedules? The same core powers the library, CLI,
stdio MCP server, Codex plugin, and local web workbench.

It deliberately does not parse natural-language dates, connect calendar
accounts, recommend meetings, book events, infer holidays, or run background
jobs. See [the product model](docs/PRODUCT_MODEL.md) for the complete boundary.

## Run from source

Requires Node.js 22 or newer.

```sh
git clone https://github.com/tetracoralla/schedule-algebra.git
cd schedule-algebra
npm ci
npm run check
```

Pipe one JSON request to the CLI:

```sh
printf '%s' '{"operation":"intersection","horizon":{"start":"2025-01-01T00:00:00Z","end":"2025-01-02T00:00:00Z"},"schedules":[{"id":"a","intervals":[{"start":"2025-01-01T09:00:00Z","end":"2025-01-01T12:00:00Z"}]},{"id":"b","intervals":[{"start":"2025-01-01T10:00:00Z","end":"2025-01-01T11:00:00Z"}]}]}' | npm run cli
```

Start the local human surface, then open `http://127.0.0.1:4317`:

```sh
npm run ui -- --port 4317
```

The page uses structured interval and recurrence editors. Its primary time
canvas shows input schedules and the computed result on one absolute UTC
timeline; exact values, warnings, and raw diagnostics remain available below.

Start the stdio MCP server:

```sh
npm run mcp
```

It exposes one read-only tool, `schedule_run`. See
[`docs/PRODUCT_MODEL.md`](docs/PRODUCT_MODEL.md) for exact semantics and
[`docs/REVIEW_CONTRACT.md`](docs/REVIEW_CONTRACT.md) for rerunnable checks.

## Codex plugin

The repository contains a self-contained plugin with one thin Skill and a
bundled MCP runtime. Install the reviewed release from its immutable tag:

```sh
codex plugin marketplace add https://github.com/tetracoralla/schedule-algebra.git --ref v0.1.5 --json
codex plugin add schedule-algebra@schedule-algebra --json
```

Open a fresh Codex task after installation. The bundled runtime does not depend
on another checkout's `node_modules`. Contributors can instead register the
current clone with `codex plugin marketplace add . --json` after running
`npm run check`.

## Performance baseline

Run the representative no-SLO measurement separately from regression checks:

```sh
npm run measure:baseline
```

The output labels itself `baseline-only-no-slo` and reports core, isolated
worker, bounded burst/recovery, loopback HTTP, and payload-size observations.

## Distribution

The repository is source-licensed under Apache-2.0. `package.json` remains
`private: true` to prevent accidental npm publication; no npm package is part
of the v0.1 release contract. The installable Codex plugin carries its own
copies of the project license, NOTICE, and third-party notices.

## License

Copyright 2026 openAdam.

Schedule Algebra is licensed under the [Apache License 2.0](LICENSE).
Third-party attribution and license texts are listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
