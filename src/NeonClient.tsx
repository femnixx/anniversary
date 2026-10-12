import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ENDPOINT = import.meta.env.VITE_NEON_S3_ENDPOINT;
const REGION = import.meta.env.VITE_NEON_S3_REGION;
const ACCESS_KEY_ID = import.meta.env.VITE_NEON_S3_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_NEON_S3_SECRET_ACCESS_KEY;
const BUCKET = import.meta.env.VITE_NEON_S3_BUCKET;

/**
 * True only when the storage credentials are actually present. The storage
 * config used to live in .env; it was removed when those credentials turned
 * out to belong to a different project. Pages read this flag to decide
 * between the live gallery/upload flow and their offline fallback.
 */
export const isStorageConfigured = Boolean(ENDPOINT && ACCESS_KEY_ID && SECRET_ACCESS_KEY && BUCKET);

const s3Client = isStorageConfigured
  ? new S3Client({
      region: REGION,
      endpoint: ENDPOINT,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    })
  : null;

const MOMENTS_PREFIX = "moments/";

const NOT_CONFIGURED = "Photo storage is not configured. Add the VITE_NEON_S3_* credentials to .env to enable it.";

function client(): S3Client {
  if (!s3Client) throw new Error(NOT_CONFIGURED);
  return s3Client;
}

export const neonStorage = {
  isConfigured: isStorageConfigured,

  async upload(file: File, path: string) {
    const key = `${MOMENTS_PREFIX}${path}`;
    await client().send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type,
    }));
    return key;
  },

  async list(prefix: string = MOMENTS_PREFIX) {
    const response = await client().send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
      MaxKeys: 100,
    }));
    return response.Contents?.map((obj) => ({
      name: obj.Key?.replace(prefix, "") || "",
      key: obj.Key || "",
      size: obj.Size || 0,
      lastModified: obj.LastModified,
    })) || [];
  },

  async getPublicUrl(key: string) {
    return getSignedUrl(client(), new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }), { expiresIn: 3600 });
  },
};

export const neonDb = neonStorage;
