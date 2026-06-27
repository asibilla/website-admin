import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { AwsClient } from 'aws4fetch';
import { NextResponse } from 'next/server';

import { API_URL, WRITE_ARTICLE_PATH } from '@/constants';
import type {
  DeleteArticleRequest,
  PatchArticleRequest,
  PutArticleRequest,
  WriteArticleResponseItem,
} from '@/types';

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

async function writeArticle(
  requestBody: DeleteArticleRequest | PutArticleRequest | PatchArticleRequest,
  method: 'DELETE' | 'PUT' | 'PATCH'
) {
  const aws = await getAwsClient();
  const response = await aws.fetch(`${API_URL}${WRITE_ARTICLE_PATH}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type':
        response.headers.get('Content-Type') ?? 'application/json',
    },
  });
}

export async function DELETE(request: Request) {
  const article = (await request.json()) as WriteArticleResponseItem;
  const requestBody = {
    key: {
      'article-id': article['article-id'],
      'article-type': article['article-type'],
    },
  };
  return writeArticle(requestBody, 'DELETE');
}

export async function PATCH(request: Request) {
  const article = (await request.json()) as WriteArticleResponseItem;
  const requestBody = {
    key: {
      'article-id': article['article-id'],
      'article-type': article['article-type'],
    },
    updates: {
      content: {
        body: article.content?.body ?? '',
        title: article.content?.title ?? '',
      },
    },
  };
  return writeArticle(requestBody, 'PATCH');
}

export async function PUT(request: Request) {
  const article = (await request.json()) as WriteArticleResponseItem;
  const requestBody = { item: article };

  return writeArticle(requestBody, 'PUT');
}
