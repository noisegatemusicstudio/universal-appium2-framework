import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Probes } from "../../src/preflight/index.js";

export function metadata() {
  const versions = {
    appium: "3.8.0",
    "@wdio/cli": "10.1.0",
    typescript: "5.9.3",
    tsx: "4.23.15",
  };
  const packages: Record<
    string,
    {
      version?: string;
      devDependencies?: Record<string, string>;
    }
  > = {
    "": { devDependencies: { ...versions } },
    ...Object.fromEntries(
      Object.entries(versions).map(([name, version]) => [
        `node_modules/${name}`,
        { version },
      ]),
    ),
  };
  return {
    manifest: {
      engines: { node: ">=22.19.0" },
      devDependencies: { ...versions },
    },
    lock: {
      packages,
    },
    installed: Object.fromEntries(
      Object.entries(versions).map(([name, version]) => [name, { version }]),
    ),
  };
}

export function probes(overrides: Partial<Probes> = {}): Probes {
  return {
    nodeVersion: "22.19.0",
    host: "linux",
    metadata: async () => metadata(),
    realpath: async (path) => path,
    stat: async (path) => ({
      isFile: () => path.endsWith(".apk"),
      isDirectory: () => !path.endsWith(".apk"),
    }),
    ...overrides,
  };
}

export async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "mobile-preflight-"));
  await writeFile(join(root, "sample.apk"), "SYNTHETIC_NOT_AN_INSTALLABLE_APP");
  await mkdir(join(root, "sample.app"));
  await mkdir(join(root, "directory.apk"));
  await writeFile(join(root, "file.app"), "SYNTHETIC");
  return { root, cleanup: () => rm(root, { recursive: true, force: true }) };
}

export async function metadataFixture() {
  const owned = await fixture();
  const data = metadata();
  await writeFile(
    join(owned.root, "package.json"),
    JSON.stringify(data.manifest),
  );
  await writeFile(
    join(owned.root, "package-lock.json"),
    JSON.stringify(data.lock),
  );
  for (const [name, entry] of Object.entries(data.installed)) {
    const directory = join(owned.root, "node_modules", name);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "package.json"), JSON.stringify(entry));
  }
  return owned;
}

export const args = (
  root: string,
  platform = "android",
  app = "sample.apk",
) => ["--platform", platform, "--app-root", root, "--app", app];
