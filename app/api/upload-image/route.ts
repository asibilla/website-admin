import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import { S3_BUCKET_NAME, uploadImageToS3 } from '@/lib/s3';

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
    const url = await uploadImageToS3(buffer, key, file.type);

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
