'use client';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { v4 } from 'uuid';

import ContentContainer from '@/components/ContentContainer';
import EditArticleForm from '@/components/EditArticleForm';
import type { GetArticleContent } from '@/types';

const Edit: FC = () => {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  const articleType = searchParams.get('articleType');
  const isNew = articleId === 'new';

  const defaultValues: GetArticleContent = {
    body: '',
    title: '',
  };

  const submitArticle = async (data: GetArticleContent) => {
    const id = isNew ? v4() : articleId;
    const method = isNew ? 'PUT' : 'PATCH';
    await fetch(`/api/write-article`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'article-id': id,
        'article-type': articleType,
        content: {
          body: data.body,
          title: data.title,
        },
      }),
    });
  };

  return (
    <ContentContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h1">
        Edit {articleId} {articleType}
      </Typography>
      <EditArticleForm
        defaultValues={defaultValues}
        submitArticle={submitArticle}
      />
    </ContentContainer>
  );
};

export default Edit;
