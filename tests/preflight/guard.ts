import fs from "node:fs";
import fsPromises from "node:fs/promises";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import dns from "node:dns";
import dnsPromises from "node:dns/promises";
import childProcess from "node:child_process";
import dgram from "node:dgram";
import { syncBuiltinESMExports } from "node:module";
import { resolve, relative, isAbsolute } from "node:path";

// Test harness only: the launcher loads tsx first, then arms this guard before CLI execution.
let attempts = 0;
const forbidden = () => {
  attempts++;
  throw new Error("TEST_SIDE_EFFECT_FORBIDDEN");
};
for (const [target, names] of [
  [http, ["request", "get", "createServer"]],
  [https, ["request", "get", "createServer"]],
  [net, ["connect", "createConnection", "createServer"]],
  [dns, ["lookup", "resolve"]],
  [dnsPromises, ["lookup", "resolve"]],
  [dgram, ["createSocket"]],
  [
    childProcess,
    [
      "spawn",
      "spawnSync",
      "exec",
      "execSync",
      "execFile",
      "execFileSync",
      "fork",
    ],
  ],
  [
    fs,
    [
      "writeFile",
      "writeFileSync",
      "appendFile",
      "appendFileSync",
      "unlink",
      "unlinkSync",
      "mkdir",
      "mkdirSync",
      "rename",
      "renameSync",
    ],
  ],
  [fsPromises, ["writeFile", "appendFile", "unlink", "mkdir", "rename", "rm"]],
] as const) {
  for (const name of names) {
    Object.defineProperty(target, name, { value: forbidden });
  }
}
globalThis.fetch = forbidden;
const appRoot = process.env.PREFLIGHT_TEST_APP_ROOT!;
const isApp = (path: unknown) => {
  if (typeof path !== "string") return false;
  const child = relative(appRoot, resolve(path));
  return child === "" || (!child.startsWith("..") && !isAbsolute(child));
};
for (const target of [fs, fsPromises]) {
  for (const name of [
    "readFile",
    "readFileSync",
    "open",
    "openSync",
    "createReadStream",
  ] as const) {
    const original = Reflect.get(target, name) as unknown;
    if (typeof original !== "function") continue;
    Object.defineProperty(target, name, {
      value: (path: unknown, ...args: unknown[]) => {
        if (isApp(path)) return forbidden();
        return Reflect.apply(original, target, [path, ...args]);
      },
    });
  }
}
syncBuiltinESMExports();
process.on("exit", () => {
  if (attempts !== 0) process.exitCode = 86;
});
