// scripts/rename-moments.mjs
//
// Renames every photo in src/assets/moments/ to a short, descriptive
// slug so the /memories gallery labels never overflow the card. The old
// WhatsApp filenames ("WhatsApp Image 2026-10-19 at 18.16.07 (2).jpeg")
// were far too long for the circular gallery to render.
//
// Slugs keep the date (so a date-prefixed name still pins to a
// milestone) and use a short sequence letter per batch, e.g.
//   2026-10-19-18.07.09.jpeg  →  2026-10-19-a.jpg
//   2026-10-19-18.16.02.jpeg  →  2026-10-19-f.jpg
//
// To pin a photo to a milestone, rename it by hand to
//   2025-06-07_pakuwon-mall.jpg
// (the app matches the YYYY-MM-DD_slug pattern automatically).

import { readdir, rename, copyFile, rm } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "src", "assets", "moments");

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function main() {
  const files = (await readdir(DIR)).filter(f => EXT.has(extname(f).toLowerCase()));
  if (files.length === 0) {
    console.log("No photos to rename.");
    return;
  }

  // Group by the timestamp batch (the "HH.MM" part of the WhatsApp name),
  // then assign a short letter per file within each batch.
  const batches = new Map();
  for (const f of files.sort()) {
    const m = f.match(/(\d{4}-\d{2}-\d{2}) at (\d{2}\.\d{2})/);
    const key = m ? `${m[1]}-${m[2]}` : "unknown";
    if (!batches.has(key)) batches.set(key, []);
    batches.get(key).push(f);
  }

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const map = {};
  let n = 0;
  for (const [batch, list] of batches) {
    list.forEach((f, i) => {
      const letter = letters[i % letters.length];
      const suffix = i >= letters.length ? `${Math.floor(i / letters.length)}` : "";
      const slug = `${batch.replace(/\./g, "-")}-${letter}${suffix}`;
      map[f] = `${slug}${extname(f).toLowerCase()}`;
      n++;
    });
  }

  for (const [from, to] of Object.entries(map)) {
    if (from === to) continue;
    await rename(join(DIR, from), join(DIR, to));
    console.log(`${from}  →  ${to}`);
  }

  console.log(`\nRenamed ${n} photos to short slugs.`);
}

main().catch(err => { console.error("rename-moments failed:", err.message); process.exit(1); });