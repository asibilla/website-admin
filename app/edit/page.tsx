'use client';
import { CircularProgress, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { getArticle, writeArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import EditArticleForm from '@/components/EditArticleForm';
import { useReferenceData } from '@/hooks/useReferenceData';
import type { GetArticleContent, GetArticleContentItem } from '@/types';

const Edit: FC = () => {
  const { isSaving, setError, setIsSaving, setHasSuccessfullySaved } =
    useContext(AppContext);
  const router = useRouter();
  const { getArticleLabelByType } = useReferenceData();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  const articleType = searchParams.get('articleType');
  const isNew = articleId === 'new';
  const [isLoading, setIsLoading] = useState(!!articleId && !isNew);
  const [defaultValues, setDefaultValues] = useState<GetArticleContent>({
    body: '',
    imageUrl: '',
    subtitle: '',
    title: '',
  });

  useEffect(() => {
    if (articleId && !isNew && articleType) {
      const fetchArticle = async () => {
        const { data, error } = await getArticle({
          id: articleId,
          type: articleType,
        });
        if (error) {
          setError(error);
        } else if (data) {
          const article = (data as GetArticleContentItem[])[0];
          setDefaultValues({
            body: article.body,
            imageUrl: article.imageUrl ?? '',
            subtitle: article.subtitle,
            title: article.title,
          });
        }
        setIsLoading(false);
      };
      fetchArticle();
    }
  }, [articleId, articleType, isNew, setError]);

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
      setHasSuccessfullySaved(true);
      router.push(`/list/${articleType}`);
    }
  };

  return (
    <ContentContainer>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography sx={{ marginBottom: 2 }} variant="h1">
            {isNew
              ? `Add New ${getArticleLabelByType(articleType ?? '')} Entry`
              : `Edit ${defaultValues.title}`}
          </Typography>
          <EditArticleForm
            defaultValues={defaultValues}
            disabled={isSaving}
            submitArticle={submitArticle}
          />
        </>
      )}
    </ContentContainer>
  );
};

export default Edit;
