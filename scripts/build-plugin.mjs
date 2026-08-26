import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const pluginRoot = fileURLToPath(new URL("../plugins/schedule-algebra/", import.meta.url));
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
  metafile: true,
};

const workerResult = await build({
  ...shared,
  entryPoints: ["src/worker-entry.ts"],
  outfile: fileURLToPath(new URL("worker-entry.mjs", runtimeUrl)),
  write: false,
});
const workerOutput = workerResult.outputFiles?.find((output) => output.path.endsWith("worker-entry.mjs"));
if (!workerOutput) throw new Error("worker bundle output is missing");
await writeFile(fileURLToPath(new URL("worker-entry.mjs", runtimeUrl)), workerOutput.contents);

const processResult = await build({
  ...shared,
  entryPoints: ["src/process-entry.ts"],
  outfile: fileURLToPath(new URL("process-entry.mjs", runtimeUrl)),
  write: false,
});
const processOutput = processResult.outputFiles?.find((output) =>
  output.path.endsWith("process-entry.mjs"),
);
if (!processOutput) throw new Error("process bundle output is missing");
await writeFile(fileURLToPath(new URL("process-entry.mjs", runtimeUrl)), processOutput.contents);

const mcpResult = await build({
  ...shared,
  define: {
    __SCHEDULE_ALGEBRA_PROCESS_SOURCE__: JSON.stringify(
      Buffer.from(processOutput.contents).toString("utf8"),
    ),
  },
  entryPoints: ["src/mcp.ts"],
  outfile: fileURLToPath(new URL("schedule-algebra-mcp.mjs", runtimeUrl)),
});
const buildResults = [mcpResult, workerResult, processResult];

const bundledPackageRoots = new Set();
for (const result of buildResults) {
  for (const input of Object.keys(result.metafile.inputs)) {
    const marker = "node_modules/";
    const markerIndex = input.lastIndexOf(marker);
    if (markerIndex === -1) continue;
    const segments = input.slice(markerIndex + marker.length).split("/");
    const packageSegmentCount = segments[0].startsWith("@") ? 2 : 1;
    bundledPackageRoots.add(
      input.slice(0, markerIndex + marker.length) + segments.slice(0, packageSegmentCount).join("/"),
    );
  }
}

const noticeSections = [];
for (const packageRootRelative of [...bundledPackageRoots].sort()) {
  const packageRoot = resolve(repositoryRoot, packageRootRelative);
  const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
  const legalFiles = (await readdir(packageRoot))
    .filter((name) => /^(licen[cs]e|copying|notice)(?:\.|$)/i.test(name))
    .sort();
  if (legalFiles.length === 0) {
    throw new Error(
      `bundled package ${packageJson.name}@${packageJson.version} has no installed license or notice file`,
    );
  }

  const renderedLegalFiles = [];
  for (const legalFile of legalFiles) {
    const legalText = (await readFile(resolve(packageRoot, legalFile), "utf8")).trimEnd();
    renderedLegalFiles.push(`### ${legalFile}\n\n\`\`\`text\n${legalText}\n\`\`\``);
  }
  noticeSections.push(
    `## ${packageJson.name}@${packageJson.version}\n\nDeclared license: ${packageJson.license ?? "not declared"}\n\n${renderedLegalFiles.join("\n\n")}`,
  );
}

const thirdPartyNotices = `# Third-party notices

Schedule Algebra's standalone Codex plugin bundles the packages below. The
corresponding license and notice texts are preserved verbatim from the exact
installed package versions used by the build.

${noticeSections.join("\n\n---\n\n")}
`;

await writeFile(resolve(repositoryRoot, "THIRD_PARTY_NOTICES.md"), thirdPartyNotices);
await copyFile(resolve(repositoryRoot, "LICENSE"), resolve(pluginRoot, "LICENSE"));
await copyFile(resolve(repositoryRoot, "NOTICE"), resolve(pluginRoot, "NOTICE"));
await writeFile(resolve(pluginRoot, "THIRD_PARTY_NOTICES.md"), thirdPartyNotices);

process.stdout.write(
  `plugin runtime bundle and notices: built (${bundledPackageRoots.size} bundled package instances)\n`,
);
