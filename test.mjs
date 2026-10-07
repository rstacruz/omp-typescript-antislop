#!/usr/bin/env node
// Test suite for the rules: every rule must fire on its fixture cases, and stay silent
// on negative cases.
//
//   node test.mjs [--verbose]      (or: bun test.mjs)
//
// Layout:
//   rules/<rule-name>.md          the rule under test
//   tests/<rule-name>/<case>.ts   a case; the file's text is fed to `omp ttsr test`
//                                 as an edit/write payload for src/foo.ts
//
// A case file whose name starts with "negative" must NOT trigger the rule; every
// other case must trigger it (and nothing else, since `--rule` isolates the rule).

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const rulesDir = join(root, "plugins", "typescript-antislop", "rules");
const testsDir = join(root, "tests");
const verbose = process.argv.includes("--verbose");

const ruleNames = readdirSync(rulesDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.slice(0, -3))
  .sort();

function runTtsrTest(rulePath, fixture) {
  const stdout = execFileSync(
    "omp",
    [
      "ttsr", "test",
      "--rule", rulePath,
      "--source", "tool",
      "--tool", "edit",
      "--path", "src/foo.ts",
      "--file", fixture,
      "--json",
    ],
    { encoding: "utf8" },
  );
  return JSON.parse(stdout);
}

function checkFixture(ruleName, dir, file) {
  const rulePath = join(rulesDir, `${ruleName}.md`);
  const fixture = join(dir, file);
  const expectsTrigger = !basename(file).startsWith("negative");

  const result = runTtsrTest(rulePath, fixture);
  const fired = result.triggered.map((entry) => entry.name);
  const problems = [];

  if (result.evaluated !== 1) problems.push("rule did not register (evaluated=" + result.evaluated + ")");
  if (expectsTrigger && fired.length === 0) problems.push("expected a trigger, got none");
  if (!expectsTrigger && fired.length > 0) problems.push("expected no trigger, got " + fired.join(", "));
  if (fired.some((name) => name !== ruleName)) problems.push("another rule fired: " + fired.join(", "));

  const matched = result.triggered.flatMap((entry) => [
    ...entry.matched.regex.map((re) => `regex ${re}`),
    ...entry.matched.ast.map((pat) => `ast ${pat}`),
  ]);

  return { name: `${ruleName}/${file}`, expectsTrigger, problems, matched };
}

function checkInstall() {
  const sandbox = mkdtempSync(join(tmpdir(), "antislop-install-"));
  const agentDir = join(sandbox, "agent");
  const problems = [];

  try {
    execFileSync("bash", [join(root, "install.sh")], {
      env: { ...process.env, PI_CODING_AGENT_DIR: agentDir },
      encoding: "utf8",
    });

    const installedDir = join(agentDir, "rules");
    const installed = existsSync(installedDir) ? readdirSync(installedDir).sort() : [];
    const expected = ruleNames.map((name) => `${name}.md`);

    if (installed.join() !== expected.join()) {
      problems.push(`copied ${installed.length} files, expected ${expected.length}`);
    }
    for (const name of expected) {
      const [a, b] = [readFileSync(join(rulesDir, name), "utf8"), readFileSync(join(installedDir, name), "utf8")];
      if (a !== b) problems.push(`${name} differs from the source`);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }

  return { name: "install.sh", expectsTrigger: true, problems, matched: [] };
}

const casingErrors = [];
const cases = [];

for (const ruleName of ruleNames) {
  const dir = join(testsDir, ruleName);
  const fixtures = existsSync(dir)
    ? readdirSync(dir).filter((file) => file.endsWith(".ts")).sort()
    : [];
  if (fixtures.length === 0) casingErrors.push(`${ruleName}: no fixtures in tests/${ruleName}/`);
  for (const file of fixtures) cases.push({ ruleName, dir, file });
}

for (const ruleName of readdirSync(testsDir).sort()) {
  if (!ruleNames.includes(ruleName)) casingErrors.push(`tests/${ruleName}/ has no matching rule`);
}

let passed = 0;
const lines = [];

for (const { ruleName, dir, file } of cases) {
  let result;
  try {
    result = checkFixture(ruleName, dir, file);
  } catch (error) {
    result = { name: `${ruleName}/${file}`, problems: [String(error.stderr || error.message).trim()] };
  }

  if (result.problems.length === 0) {
    passed += 1;
    const detail = verbose && result.matched.length > 0 ? `  {${result.matched.join("; ")}}` : "";
    lines.push(`  ok   ${result.name}${detail}`);
  } else {
    lines.push(`  FAIL ${result.name}\n       ${result.problems.join("\n       ")}`);
  }
}

try {
  const install = checkInstall();
  if (install.problems.length === 0) passed += 1;
  lines.push(install.problems.length === 0 ? "  ok   install.sh" : `  FAIL ${install.name}\n       ${install.problems.join("\n       ")}`);
  casingErrors.push(...install.problems.map((problem) => `install.sh: ${problem}`));
} catch (error) {
  casingErrors.push(`install.sh: ${error.message}`);
}

const failures = lines.filter((line) => line.trimStart().startsWith("FAIL")).length;

console.log(lines.join("\n"));
if (casingErrors.length > 0) {
  console.log("\nLayout errors:");
  for (const error of casingErrors) console.log(`  - ${error}`);
}
console.log(`\n${passed} passed, ${failures} failed (${cases.length} fixtures, ${ruleNames.length} rules)`);

process.exit(failures > 0 || casingErrors.length > 0 ? 1 : 0);
