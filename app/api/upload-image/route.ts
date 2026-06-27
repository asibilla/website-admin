import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

const S3_REGION = process.env.AWS_REGION ?? 'us-east-1';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? '';
const S3_PUBLIC_BASE_URL =
  process.env.S3_PUBLIC_BASE_URL ?? 'https://andysibilla.com';

async function getS3Client() {
  const credentials = await defaultProvider()();
  return new S3Client({
    region: S3_REGION,
    credentials,
  });
}

export async function POST(request: Request) {
  if (!S3_BUCKET_NAME) {
    return NextResponse.json(
      { error: 'S3 bucket is not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const extension = file.name.includes('.')
      ? file.name.slice(file.name.lastIndexOf('.'))
      : '.jpg';
    const key = `images/${uuid()}${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const s3 = await getS3Client();
    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const url = `${S3_PUBLIC_BASE_URL.replace(/\/$/, '')}/${key}`;

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
