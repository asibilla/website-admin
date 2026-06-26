'use client';
import { Alert, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useState } from 'react';
import { v4 } from 'uuid';

import { writeArticle } from '@/api';
import ContentContainer from '@/components/ContentContainer';
import EditArticleForm from '@/components/EditArticleForm';
import type { GetArticleContent } from '@/types';

const Edit: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  const articleType = searchParams.get('articleType');
  const isNew = articleId === 'new';

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const defaultValues: GetArticleContent = {
    body: '',
    title: '',
  };

  const submitArticle = async (data: GetArticleContent) => {
    setIsSaving(true);
    setError(null);
    const id = isNew ? v4() : articleId;
    const method = isNew ? 'PUT' : 'PATCH';
    const { error: responseError } = await writeArticle({
      articleType: articleType ?? '',
      data,
      id: id ?? '',
      method,
    });

    setIsSaving(false);

    if (responseError) {
      setError(responseError);
    } else {
      router.push(`/list/${articleType}`);
    }
  };

  return (
    <ContentContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h1">
        Edit {articleId} {articleType}
      </Typography>
      <EditArticleForm
        defaultValues={defaultValues}
        disabled={isSaving}
        submitArticle={submitArticle}
      />
      {error && (
        <Alert sx={{ marginTop: 2 }} severity="error">{error.message || 'An error occurred'}</Alert>
      )}
    </ContentContainer>
  );
};

export default Edit;
