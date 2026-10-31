import { resolve } from "node:path";
import { preflight, render, wantsJson } from "../src/preflight/index.js";

async function main() {
  const args = process.argv.slice(2);
  const report = await preflight(args, resolve(__dirname, ".."));
  process.stdout.write(`${render(report, wantsJson(args))}\n`);
  process.exitCode = report.exitCode;
}

void main();
