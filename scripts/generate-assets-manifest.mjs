// scripts/generate-assets-manifest.mjs
//
// Queries the assets table in Neon Postgres and writes a JSON manifest
// that the app can import at build time. Each entry maps the original
// filename to its public URL.

import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = join(ROOT, "src", "assets", "manifest.json");

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  const res = await pool.query(`
    SELECT original_name, storage_key, public_url, mime_type, size_bytes, width, height, category
    FROM assets
    ORDER BY category, original_name
  `);

  const manifest = {};
  for (const row of res.rows) {
    manifest[row.original_name] = {
      key: row.storage_key,
      publicUrl: row.public_url,
      mimeType: row.mime_type,
      sizeBytes: parseInt(row.size_bytes, 10),
      width: row.width,
      height: row.height,
      category: row.category,
    };
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`[generate-assets-manifest] Wrote ${res.rows.length} entries to ${MANIFEST_PATH}`);

  // Also write a memories-specific manifest
  const memoriesRes = await pool.query(`
    SELECT original_name, storage_key, public_url, mime_type, size_bytes, width, height
    FROM assets
    WHERE category = 'memories'
    ORDER BY original_name
  `);

  const memoriesManifest = {};
  for (const row of memoriesRes.rows) {
    memoriesManifest[row.original_name] = {
      key: row.storage_key,
      publicUrl: row.public_url,
      mimeType: row.mime_type,
      sizeBytes: parseInt(row.size_bytes, 10),
      width: row.width,
      height: row.height,
    };
  }

  const memoriesManifestPath = join(ROOT, "src", "assets", "memories-manifest.json");
  await writeFile(memoriesManifestPath, JSON.stringify(memoriesManifest, null, 2), "utf8");
  console.log(`[generate-assets-manifest] Wrote ${memoriesRes.rows.length} "memories" entries to ${memoriesManifestPath}`);

  await pool.end();
}

main().catch((err) => {
  console.error("[generate-assets-manifest] Error:", err.message);
  process.exit(1);
});
