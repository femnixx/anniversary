/**
 * Verifies the Neon S3 storage credentials in .env against the live service.
 * Run: node verify-neon.js
 */
import { S3Client, ListObjectsV2Command, GetBucketCorsCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

const { VITE_NEON_S3_ENDPOINT, VITE_NEON_S3_ACCESS_KEY_ID, VITE_NEON_S3_SECRET_ACCESS_KEY, VITE_NEON_S3_REGION, VITE_NEON_S3_BUCKET } = process.env;

const missing = Object.entries({ VITE_NEON_S3_ENDPOINT, VITE_NEON_S3_ACCESS_KEY_ID, VITE_NEON_S3_SECRET_ACCESS_KEY, VITE_NEON_S3_REGION, VITE_NEON_S3_BUCKET })
  .filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const s3 = new S3Client({
  region: VITE_NEON_S3_REGION,
  endpoint: VITE_NEON_S3_ENDPOINT,
  credentials: { accessKeyId: VITE_NEON_S3_ACCESS_KEY_ID, secretAccessKey: VITE_NEON_S3_SECRET_ACCESS_KEY },
  forcePathStyle: true,
});

console.log(`Endpoint : ${VITE_NEON_S3_ENDPOINT}`);
console.log(`Bucket   : ${VITE_NEON_S3_BUCKET}`);
console.log(`Region   : ${VITE_NEON_S3_REGION}`);
console.log("");

let ok = 0;
let fail = 0;

// 1. List objects
try {
  const list = await s3.send(new ListObjectsV2Command({ Bucket: VITE_NEON_S3_BUCKET, MaxKeys: 20 }));
  const count = list.Contents?.length ?? 0;
  console.log(`PASS  ListObjectsV2      -> ${count} object(s)`);
  for (const o of list.Contents ?? []) console.log(`        - ${o.Key} (${o.Size} bytes)`);
  ok++;
} catch (e) {
  console.log(`FAIL  ListObjectsV2      -> ${e.name}: ${e.message}`);
  fail++;
}

// 2. Read CORS config (proves the CORS rule from configure-cors.js persisted)
try {
  const cors = await s3.send(new GetBucketCorsCommand({ Bucket: VITE_NEON_S3_BUCKET }));
  console.log(`PASS  GetBucketCors       -> ${cors.CORSRules?.length ?? 0} rule(s)`);
  for (const r of cors.CORSRules ?? []) console.log(`        methods=${r.AllowedMethods?.join(",")} origins=${r.AllowedOrigins?.join(",")}`);
  ok++;
} catch (e) {
  if (e.name === "NoSuchCORSConfiguration") {
    console.log("WARN  GetBucketCors       -> no CORS configured (run: node configure-cors.js)");
  } else {
    console.log(`FAIL  GetBucketCors       -> ${e.name}: ${e.message}`);
    fail++;
  }
}

console.log(`\n${ok} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
