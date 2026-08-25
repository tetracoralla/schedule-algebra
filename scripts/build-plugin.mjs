import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const runtimeUrl = new URL("../plugins/schedule-algebra/runtime/", import.meta.url);

await rm(runtimeUrl, { recursive: true, force: true });
await mkdir(runtimeUrl, { recursive: true });

const shared = {
  absWorkingDir: repositoryRoot,
  bundle: true,
  format: "esm",
  legalComments: "eof",
  minify: false,
  platform: "node",
  sourcemap: false,
  target: "node22",
};

await Promise.all([
  build({
    ...shared,
    entryPoints: ["src/mcp.ts"],
    outfile: fileURLToPath(new URL("schedule-algebra-mcp.mjs", runtimeUrl)),
  }),
  build({
    ...shared,
    entryPoints: ["src/worker-entry.ts"],
    outfile: fileURLToPath(new URL("worker-entry.mjs", runtimeUrl)),
  }),
]);

process.stdout.write("plugin runtime bundle: PASS\n");
