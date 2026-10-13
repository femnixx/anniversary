#!/usr/bin/env node
/**
 * Guards against React hooks that are used but never imported.
 *
 * This failure mode is invisible to the rest of the toolchain:
 *   - tsc resolves React's UMD global namespace, so it never errors
 *   - eslint-plugin-react-hooks only checks hook ORDER and conditions,
 *     not that the identifier was imported
 *   - the build succeeds
 * The result is a runtime ReferenceError, which with no error boundary
 * renders a blank page. This script is the only thing that catches it.
 *
 * Exits non-zero on a violation, so it can gate CI and predeploy.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HOOKS = [
  "useState", "useEffect", "useRef", "useCallback", "useMemo",
  "useContext", "useReducer", "useLayoutEffect", "useTransition",
  "useId", "useDeferredValue", "useImperativeHandle", "useInsertionEffect",
  "useOptimistic", "useActionState", "useSyncExternalStore",
];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

const violations = [];

for (const file of walk(join(root, "src"))) {
  const src = readFileSync(file, "utf8");

  // collect what the file actually imports from "react"
  const importMatch = src.match(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']react["']/g) ?? [];
  const imported = new Set();
  for (const clause of importMatch) {
    const names = clause.match(/\{([^}]*)\}/)?.[1] ?? "";
    for (const raw of names.split(",")) {
      const name = raw.replace(/\btype\b/, "").split(/\s+as\s+/)[0].trim();
      if (name) imported.add(name);
    }
  }
  // `import React from "react"` or a namespace import also count
  if (/import\s+\*\s+as\s+\w+\s+from\s*["']react["']/.test(src)) continue;
  if (/import\s+React\b/.test(src)) continue;

  for (const hook of HOOKS) {
    // called as a hook, not merely mentioned
    if (!new RegExp(`(?<![\\w.])${hook}\\s*\\(`).test(src)) continue;
    if (imported.has(hook)) continue;
    violations.push({ file: file.slice(root.length + 1), hook });
  }
}

if (violations.length) {
  console.error("React hooks used but never imported:\n");
  for (const v of violations) {
    console.error(`  ${v.file}: ${v.hook}`);
  }
  console.error(
    "\nAdd the missing name to the react import in that file.\n" +
    "Neither tsc nor eslint-plugin-react-hooks catches this — it only\n" +
    "fails at runtime, as a blank page."
  );
  process.exit(1);
}

console.log("hook imports: all present");
