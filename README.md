# Schedule Algebra

Bounded interval and zoned-recurrence set algebra for humans and AI Agents.
The MVP is private and `UNLICENSED`; no release terms have been chosen.

## Run

Requires Node.js 22 or newer.

```sh
npm install
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

## Local Codex plugin

The repository contains a self-contained private plugin with one thin Skill and
the bundled MCP runtime. After `npm run check`, register and install it locally:

```sh
codex plugin marketplace add . --json
codex plugin add schedule-algebra@schedule-algebra --json
```

Open a fresh Codex task after installation. The plugin remains private and
`UNLICENSED`; these commands do not publish it.

## Performance baseline

Run the representative no-SLO measurement separately from regression checks:

```sh
npm run measure:baseline
```

The output labels itself `baseline-only-no-slo` and reports core, isolated
worker, bounded burst/recovery, loopback HTTP, and payload-size observations.
