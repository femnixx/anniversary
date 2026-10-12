#!/usr/bin/env node
/**
 * Configure Neon S3 Bucket CORS via AWS SDK
 * Run: node configure-cors.js
 */

import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

const required = [
  "VITE_NEON_S3_ENDPOINT",
  "VITE_NEON_S3_ACCESS_KEY_ID",
  "VITE_NEON_S3_SECRET_ACCESS_KEY",
  "VITE_NEON_S3_REGION",
  "VITE_NEON_S3_BUCKET",
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing ${key} in .env`);
    process.exit(1);
  }
}

const s3Client = new S3Client({
  region: process.env.VITE_NEON_S3_REGION,
  endpoint: process.env.VITE_NEON_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.VITE_NEON_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_NEON_S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = process.env.VITE_NEON_S3_BUCKET;

const corsConfig = {
  Bucket: BUCKET,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        AllowedOrigins: [
          "https://femnixx.github.io",
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:5173",
        ],
        ExposeHeaders: ["ETag", "Content-Length"],
        MaxAgeSeconds: 3600,
      },
    ],
  },
};

async function main() {
  try {
    console.log(`🔧 Configuring CORS for bucket: ${BUCKET}`);
    console.log(`   Endpoint: ${process.env.VITE_NEON_S3_ENDPOINT}`);
    console.log(`   Region: ${process.env.VITE_NEON_S3_REGION}`);

    await s3Client.send(new PutBucketCorsCommand(corsConfig));
    console.log("✅ CORS configured successfully");

    const result = await s3Client.send(new GetBucketCorsCommand({ Bucket: BUCKET }));
    console.log("📋 Current CORS config:");
    console.log(JSON.stringify(result.CORSRules, null, 2));

  } catch (err) {
    console.error("❌ Error:", err.message);
    if (err.$metadata) {
      console.error("   HTTP Status:", err.$metadata.httpStatusCode);
    }
    process.exit(1);
  }
}

main();