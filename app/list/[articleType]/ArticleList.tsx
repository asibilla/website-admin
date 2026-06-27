'use client';

import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';

import { getArticle, writeArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import { useReferenceData } from '@/hooks/useReferenceData';
import type { GetArticleContentItem } from '@/types';

type ArticleListProps = {
  articles: GetArticleContentItem[] | null;
  articleType: string;
  error: Error | null;
};

const List = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  marginBottom: theme.spacing(2, 0),
}));

const ListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
});

const ArticleList: FC<ArticleListProps> = ({
  articles,
  articleType,
  error,
}) => {
  const { setError, setIsSaving } = useContext(AppContext);
  const { getArticleLabelByType } = useReferenceData();
  const articleLabel = getArticleLabelByType(articleType);
  const [cachedArticles, setCachedArticles] = useState<
    GetArticleContentItem[] | null
  >(articles);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [articles, error, setError]);

  const refetchArticles = async () => {
    const { data, error } = await getArticle({ type: articleType });
    if (error) {
      setError(error);
    } else {
      setCachedArticles(data as GetArticleContentItem[] | null);
    }
  };

  const deleteArticle = async (articleId: string) => {
    setIsSaving(true);
    const { error: responseError } = await writeArticle({
      articleType,
      data: { body: '', title: '' },
      id: articleId,
      method: 'DELETE',
    });
    if (responseError) {
      setError(responseError);
    } else {
      refetchArticles();
    }
    setIsSaving(false);
  };

  return (
    <ContentContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h1">
        {articleLabel} Entries
      </Typography>
      {cachedArticles && cachedArticles.length > 0 ? (
        <List>
          {cachedArticles.map((article) => (
            <ListItem key={article.articleId}>
              <Link
                href={`/edit?articleId=${article.articleId}&articleType=${articleType}`}
              >
                {article.title}
              </Link>
              <Button
                onClick={() => deleteArticle(article.articleId)}
                startIcon={<DeleteIcon />}
                sx={{ marginLeft: '10px' }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : null}
      <Button
        color="primary"
        component={Link}
        href={`/edit?articleId=new&articleType=${articleType}`}
        variant="contained"
      >
        Add New
      </Button>
    </ContentContainer>
  );
};

export default ArticleList;
