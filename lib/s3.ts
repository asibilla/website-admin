import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

export const S3_REGION = process.env.AWS_REGION ?? 'us-east-1';
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? '';
export const S3_PUBLIC_BASE_URL =
  process.env.S3_PUBLIC_BASE_URL ?? 'https://andysibilla.com';

export async function getS3Client() {
  const credentials = await defaultProvider()();
  return new S3Client({
    region: S3_REGION,
    credentials,
  });
}

export function getImageKeyFromUrl(url: string): string | null {
  if (!url) return null;

  const baseUrl = S3_PUBLIC_BASE_URL.replace(/\/$/, '');
  if (url.startsWith(`${baseUrl}/`)) {
    const key = url.slice(baseUrl.length + 1);
    return key.startsWith('images/') ? key : null;
  }

  try {
    const key = new URL(url).pathname.replace(/^\//, '');
    return key.startsWith('images/') ? key : null;
  } catch {
    return null;
  }
}

export async function deleteImageFromS3(url: string) {
  if (!S3_BUCKET_NAME) {
    throw new Error('S3 bucket is not configured');
  }

  const key = getImageKeyFromUrl(url);
  if (!key) {
    throw new Error('Invalid image URL');
  }

  const s3 = await getS3Client();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    })
  );
}

export async function uploadImageToS3(
  buffer: Buffer,
  key: string,
  contentType: string
) {
  if (!S3_BUCKET_NAME) {
    throw new Error('S3 bucket is not configured');
  }

  const s3 = await getS3Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${S3_PUBLIC_BASE_URL.replace(/\/$/, '')}/${key}`;
}
