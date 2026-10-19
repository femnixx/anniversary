// scripts/upload-moments.mjs
//
// Compresses every photo in src/assets/moments/ with sharp, then uploads
// the compressed WebP to the Neon Object Storage bucket declared in
// neon.ts ("media"). Writes a manifest of { file, key, size } so the app
// can fetch images from storage instead of from the project folder.
//
// Env: reads the Neon-pulled AWS_* vars from .env.local (falling back to
// .env). Never commits those values — this script is run locally only.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(ROOT, "..");
const MOMENTS_DIR = join(PROJECT_ROOT, "src", "assets", "moments");
const MANIFEST_PATH = join(PROJECT_ROOT, "src", "assets", "moments", "manifest.json");

const BUCKET = process.env.VITE_NEON_S3_BUCKET || "media";
const MAX_DIM = 1600; // longest edge
const QUALITY = 80;

async function loadEnv() {
  // Pull from .env.local first, then .env. Only AWS_* and bucket vars.
  const candidates = [join(PROJECT_ROOT, ".env.local"), join(PROJECT_ROOT, ".env")];
  for (const path of candidates) {
    let text;
    try {
      text = await readFile(path, "utf8");
    } catch {
      // file may not exist; continue
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_0-9]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^#\s]*))\s*(?:#.*)?$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2] ?? m[3] ?? m[4] ?? "";
      }
    }
  }
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function slugify(file) {
  return file
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  await loadEnv();

  const endpoint = requireEnv("AWS_ENDPOINT_URL_S3");
  const region = process.env.AWS_REGION || "us-east-2";
  const accessKeyId = requireEnv("AWS_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("AWS_SECRET_ACCESS_KEY");

  const s3 = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });

  const files = (await readdir(MOMENTS_DIR)).filter(f =>
    /\.(jpe?g|png|webp|avif)$/i.test(f)
  );

  if (files.length === 0) {
    throw new Error("No photos found in src/assets/moments/");
  }

  const manifest = {};
  let totalOriginal = 0;
  let totalCompressed = 0;

  for (const file of files) {
    const src = join(MOMENTS_DIR, file);
    const input = await readFile(src);
    totalOriginal += input.length;

    const meta = await sharp(input).metadata();
    const resized = sharp(input).resize({
      width: MAX_DIM,
      height: MAX_DIM,
      fit: "inside",
      withoutEnlargement: true,
    });

    // Keep the date prefix if present (e.g. 2025-06-07_pakuwon.jpg) so
    // the app can still pin the photo to a milestone.
    const base = file.replace(/\.[^.]+$/, "");
    const dateMatch = base.match(/^(\d{4}-\d{2}-\d{2})(?:_(.+))$/);
    const stem = dateMatch ? `${dateMatch[1]}__${dateMatch[2] ?? "photo"}` : base;
    const key = `moments/${slugify(stem)}.webp`;

    const webp = await resized.webp({ quality: 80 }).toBuffer();
    totalCompressed += webp.length;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: webp,
        ContentType: "image/webp",
        Metadata: { source: "upload-moments.mjs", original: file },
      })
    );

    manifest[file] = {
      key,
      size: webp.length,
      width: meta.width,
      height: meta.height,
      slug: dateMatch ? (dateMatch[2] ?? "").replace(/[_-]+/g, "-") : slugify(base),
      date: dateMatch ? dateMatch[1] : "",
      hasDate: Boolean(dateMatch),
    };
    console.log(`✓ ${file}  (${(input.length / 1024).toFixed(0)}KB → ${(webp.length / 1024).toFixed(0)}KB)  →  ${key}`);
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

  const pct = totalOriginal ? ((1 - totalCompressed / totalOriginal) * 100).toFixed(1) : 0;
  console.log(
    `\nDone. ${files.length} photos → bucket "${BUCKET}". ` +
      ` ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${(totalCompressed / 1024 / 1024).toFixed(1)}MB (${pct}% smaller).`
  );
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error("upload-moments failed:", err.message);
  process.exit(1);
});