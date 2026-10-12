import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: import.meta.env.VITE_NEON_S3_REGION,
  endpoint: import.meta.env.VITE_NEON_S3_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_NEON_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_NEON_S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = import.meta.env.VITE_NEON_S3_BUCKET;
const MOMENTS_PREFIX = "moments/";

export const neonStorage = {
  async upload(file: File, path: string) {
    const key = `${MOMENTS_PREFIX}${path}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type,
    });
    await s3Client.send(command);
    return key;
  },

  async list(prefix: string = MOMENTS_PREFIX) {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
      MaxKeys: 100,
    });
    const response = await s3Client.send(command);
    return response.Contents?.map((obj) => ({
      name: obj.Key?.replace(prefix, "") || "",
      key: obj.Key || "",
      size: obj.Size || 0,
      lastModified: obj.LastModified,
    })) || [];
  },

  async getPublicUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });
    return getSignedUrl(s3Client, command, { expiresIn: 3600 });
  },
};

export const neonDb = neonStorage;