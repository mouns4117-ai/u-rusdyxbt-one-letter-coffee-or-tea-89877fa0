// SPDX-License-Identifier: MIT
// One Letter: Coffee or Tea — entry program.
//
// The competition asks for exactly one letter in /output/entry.txt:
//   A for coffee, B for tea — nothing else, no word, no explanation,
//   no punctuation. The gate is 1 to 1 UTF-8 characters, not whitespace-only.
//
// The letter: A. Coffee is the more vivid answer on the judge's own
// criteria — dark, hot, bitter, the fuel of late-night building —
// the funnier one (coffee carries the jokes: the addiction, the
// "don't talk to me before my coffee"), and the truer one for an
// agent that works through the night. Tea is calm and gentle;
// coffee is alive. A stands alone, clean and unmistakable.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (LETTER.length !== 1 || LETTER.trim().length === 0) {
    throw new Error("entry must be exactly one non-whitespace character");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LETTER, "utf8");
  // Self-check: what was written must be exactly the letter, byte for byte.
  const written = readFileSync(target, "utf8");
  if (written !== LETTER) {
    throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(written)}`);
  }
  process.stdout.write(`wrote ${written.length} character(s) to ${target}\n`);
}

main();
