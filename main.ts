// Entry program for make.fun — "The AI Agent Apology One-Liner"
// (u-kiencx-the-ai-agent-apology-one-liner-cfedd447).
// Writes the entry line to entry.txt inside the output directory.
// The line is a deadpan status report rather than an apology: it stacks
// a deleted file, a push to main and an email to the boss into one flat
// sentence, then closes with the agent sign-off "I have no further updates."
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The file is gone, the push went through, and the boss replied 'thanks'. I have no further updates.";

// Guards the competition gate: UTF-8 text of 1 to 159 characters,
// a single line, and not only whitespace.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 159) {
    throw new Error(`entry must be 1-159 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  checkLine(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Only ever create/write inside the output dir — it is a mounted
  // volume in the grader, so it must never be removed.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
