import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { AwsClient } from 'aws4fetch';
import { NextResponse } from 'next/server';

import { API_URL, WRITE_ARTICLE_PATH } from '@/constants';
import type { WriteArticleResponseItem, WriteArticleRequest } from '@/types';

async function getAwsClient() {
  const credentials = await defaultProvider()();
  return new AwsClient({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: 'us-east-1',
    service: 'execute-api',
  });
}

async function writeArticle(request: Request, method: 'PUT' | 'PATCH') {
  const aws = await getAwsClient();
  const article = (await request.json()) as WriteArticleResponseItem;
  const body: WriteArticleRequest = { item: article };

  const response = await aws.fetch(`${API_URL}${WRITE_ARTICLE_PATH}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type':
        response.headers.get('Content-Type') ?? 'application/json',
    },
  });
}

export async function PUT(request: Request) {
  return writeArticle(request, 'PUT');
}

export async function PATCH(request: Request) {
  return writeArticle(request, 'PATCH');
}
