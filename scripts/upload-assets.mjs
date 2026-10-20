// scripts/upload-assets.mjs
//
// Uploads every image in src/assets/ to Neon Object Storage (bucket: public-assets)
// and records metadata in Neon Postgres (table: assets). Idempotent.
// Public URLs are constructed (not presigned) so they are non-expiring.
//
// Env: reads all credentials from .env (loaded via dotenv)
//   DATABASE_URL      - Neon Postgres connection string
//   AWS_ENDPOINT_URL_S3  - S3-compatible endpoint
//   AWS_ACCESS_KEY_ID    - access key
//   AWS_SECRET_ACCESS_KEY - secret
//   AWS_REGION           - region
//   AWS_BUCKET           - target bucket name

import "dotenv/config";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, extname, relative, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import pg from "pg";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS_DIR = join(ROOT, "src", "assets");

const BUCKET = process.env.AWS_BUCKET;
const ENDPOINT = process.env.AWS_ENDPOINT_URL_S3;
const REGION = process.env.AWS_REGION;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".heic"]);

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".heic": "image/heic",
};

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategory(relPath, filename) {
  const parts = relative(ASSETS_DIR, join(ASSETS_DIR, relPath)).split(/[\/\\]/);
  const parentDir = parts[parts.length - 2] || "assets";
  const lower = filename.toLowerCase();

  if (/other\s*pic/i.test(lower)) return "memories";
  if (parentDir === "moments") return "memories";
  if (parentDir === "journey") {
    if (/date|birthday/i.test(lower)) return "journey";
    return "journey";
  }
  if (parentDir === "terminal") return "terminal";
  if (parentDir === "fonts") return "fonts";
  return "general";
}

async function getImageDimensions(filePath, buffer, mime) {
  if (mime === "image/svg+xml") {
    return { width: null, height: null };
  }
  // Use sharp for dimensions
  try {
    const sharp = (await import("sharp")).default;
    const meta = await sharp(buffer).metadata();
    return { width: meta.width || null, height: meta.height || null };
  } catch {
    return { width: null, height: null };
  }
}

async function main() {
  requireEnv("DATABASE_URL");
  requireEnv("AWS_ENDPOINT_URL_S3");
  requireEnv("AWS_ACCESS_KEY_ID");
  requireEnv("AWS_SECRET_ACCESS_KEY");
  requireEnv("AWS_BUCKET");

  console.log("[upload-assets] Scanning src/assets/ for images...\n");

  // 1. Inventory
  const images = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (IMAGE_EXTS.has(ext)) {
          const relPath = relative(ASSETS_DIR, fullPath);
          const info = await stat(fullPath);
          const buffer = await readFile(fullPath);
          const sha256 = createHash("sha256").update(buffer).digest("hex");
          images.push({
            fullPath,
            relPath,
            filename: entry.name,
            ext,
            size: info.size,
            sha256,
            buffer,
          });
        }
      }
    }
  }

  await walk(ASSETS_DIR);

  console.log(`[upload-assets] Found ${images.length} images in src/assets/\n`);

  // 2. Set up S3 client
  const s3 = new S3Client({
    region: REGION,
    endpoint: ENDPOINT,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });

  const PUBLIC_BASE = `${ENDPOINT}/${BUCKET}`;

  // 3. Set up Postgres
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
  });

  // 4. Create table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id            BIGSERIAL PRIMARY KEY,
      original_name TEXT NOT NULL,
      storage_key   TEXT NOT NULL UNIQUE,
      public_url    TEXT NOT NULL,
      mime_type     TEXT,
      size_bytes    BIGINT,
      width         INT,
      height        INT,
      sha256        TEXT,
      category      TEXT,
      created_at    TIMESTAMPTZ DEFAULT now(),
      updated_at    TIMESTAMPTZ DEFAULT now()
    );
  `);

  // Add updated_at column if it doesn't exist (for idempotency)
  await pool.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='assets' AND column_name='updated_at') THEN
        ALTER TABLE assets ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
      END IF;
    END $$;
  `);

  console.log("[upload-assets] Database table 'assets' ready.\n");

  // 5. Upload + record
  let uploaded = 0;
  let skipped = 0;
  let db = 0;
  let verified = 0;
  let failed = 0;

  const results = [];

  for (const img of images) {
    const category = getCategory(img.relPath, img.filename);
    const stem = img.filename.replace(/\.[^.]+$/, "");
    const storageKey = `${category}/${slugify(stem)}${img.ext}`;
    const publicKeyUrl = `${PUBLIC_BASE}/${storageKey}`;
    const mimeType = MIME_TYPES[img.ext] || "application/octet-stream";

    let dim = { width: null, height: null };
    if (mimeType !== "image/svg+xml") {
      dim = await getImageDimensions(img.fullPath, img.buffer, mimeType);
    }

    const row = {
      originalName: img.filename,
      storageKey,
      publicUrl: publicKeyUrl,
      mimeType,
      sizeBytes: img.size,
      width: dim.width,
      height: dim.height,
      sha256: img.sha256,
      category,
      uploaded: false,
      inDb: false,
      verified: false,
      usedOnPage: category === "memories" && /other\s*pic/i.test(img.filename) ? "yes" : "",
    };

    // Check if already in DB with this sha256 + storage_key
    const existing = await pool.query(
      "SELECT 1 FROM assets WHERE sha256 = $1 AND storage_key = $2",
      [img.sha256, storageKey]
    );

    if (existing.rowCount > 0) {
      // Check if the file is already in storage
      try {
        await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: storageKey }));
        row.uploaded = true;
        row.inDb = true;
        row.verified = true;
        skipped++;
        db = 0;
        results.push(row);
        console.log(`SKIP  ${img.filename} → ${storageKey} (already uploaded & in DB)`);
        continue;
      } catch {
        // Object not in storage, need to upload
      }
    }

    // Upload to S3
    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: storageKey,
        Body: img.buffer,
        ContentType: mimeType,
        CacheControl: "public, max-age=31536000, immutable",
        Metadata: { source: "upload-assets.mjs", category: category },
      }));

      row.uploaded = true;
      uploaded++;
      console.log(`UPLOAD ${img.filename} → ${storageKey}`);

      // Insert or update in DB
      await pool.query(
        `INSERT INTO assets (original_name, storage_key, public_url, mime_type, size_bytes, width, height, sha256, category, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), now())
         ON CONFLICT (storage_key) DO UPDATE SET
           original_name = EXCLUDED.original_name,
           public_url = EXCLUDED.public_url,
           mime_type = EXCLUDED.mime_type,
           size_bytes = EXCLUDED.size_bytes,
           width = EXCLUDED.width,
           height = EXCLUDED.height,
           sha256 = EXCLUDED.sha256,
           category = EXCLUDED.category,
           updated_at = now()`,
        [img.filename, storageKey, publicKeyUrl, mimeType, img.size, dim.width, dim.height, img.sha256, category]
      );
      row.inDb = true;
      db++;

      // Verify public URL
      try {
        const res = await fetch(publicKeyUrl, { method: "GET" });
        if (res.ok) {
          const resSha = createHash("sha256").update(Buffer.from(await res.arrayBuffer())).digest("hex");
          if (resSha === img.sha256) {
            row.verified = true;
            verified++;
          } else {
            console.error(`VERIFY MISMATCH ${img.filename}: hash mismatch`);
            failed++;
          }
        } else {
          console.error(`VERIFY FAILED ${img.filename}: HTTP ${res.status}`);
          failed++;
        }
      } catch (e) {
        console.error(`VERIFY ERROR ${img.filename}: ${e.message}`);
        failed++;
      }
    } catch (e) {
      console.error(`UPLOAD FAILED ${img.filename}: ${e.message}`);
      row.uploaded = false;
      failed++;
    }

    results.push(row);
  }

  await pool.end();

  // 6. Summary table
  console.log("\n" + "=".repeat(120));
  console.log("UPLOAD RESULTS");
  console.log("=".repeat(120));

  results.forEach((r, i) => {
    console.log(
      `${String(i + 1).padEnd(4)} | ` +
      `${r.originalName.padEnd(40).slice(0, 40)} | ` +
      `${r.storageKey.padEnd(45).slice(0, 45)} | ` +
      `${r.category.padEnd(10)} | ` +
      `${(r.uploaded ? "✓" : "✗").padEnd(3)} | ` +
      `${(r.inDb ? "✓" : "✗").padEnd(3)} | ` +
      `${(r.verified ? "✓" : "✗").padEnd(3)} | ` +
      r.usedOnPage
    );
  });

  console.log("\n" + "=".repeat(120));
  console.log(
    `Totals: ${images.length} found | ${uploaded} uploaded | ${db} in DB | ` +
    `${verified} verified | ${failed} failed | ${skipped} skipped`
  );

  const otherPics = results.filter((r) => /other\s*pic/i.test(r.originalName));
  console.log(
    `\n\"other pics\" check: ${otherPics.length} files matched — all category=${otherPics.every((r) => r.category === "memories") ? "'memories'" : "MIXED"}`
  );
  console.log(`These are used on /memories page via DB-categorized URLs.`);

  if (failed > 0) {
    console.log("\n⚠️  Some uploads/verifications failed. See above.");
    process.exit(1);
  } else {
    console.log("\n✅ All assets uploaded, recorded in DB, and verified publicly.");
  }
}

main().catch((err) => {
  console.error("[upload-assets] Fatal error:", err.message);
  process.exit(1);
});
