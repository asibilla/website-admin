'use client';

import { Button, CircularProgress, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import type { FC } from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';

import { deleteImage, getArticle, writeArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import { useReferenceData } from '@/hooks/useReferenceData';
import type { GetArticleContentItem } from '@/types';

type ArticleListProps = {
  articleType: string;
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

const ArticleList: FC<ArticleListProps> = ({ articleType }) => {
  const { setError, setIsSaving } = useContext(AppContext);
  const { getArticleLabelByType } = useReferenceData();
  const articleLabel = getArticleLabelByType(articleType);
  const [articles, setArticles] = useState<GetArticleContentItem[] | null>([]);
  const [hasFetchedArticles, setHasFetchedArticles] = useState(false);

  const fetchArticles = useCallback(async () => {
    const { data, error } = await getArticle({ type: articleType });
    if (error) {
      setError(error);
    } else {
      setArticles(data as GetArticleContentItem[] | null);
    }
    if (!hasFetchedArticles) {
      setHasFetchedArticles(true);
    }
  }, [articleType, hasFetchedArticles, setError]);

  useEffect(() => {
    const initialFetch = async () => {
      fetchArticles();
    };
    initialFetch();
  }, [fetchArticles]);

  const deleteArticle = async (article: GetArticleContentItem) => {
    setIsSaving(true);
    setError(null);

    if (article.imageUrl) {
      const { error: imageError } = await deleteImage(article.imageUrl);
      if (imageError) {
        setError(imageError);
        setIsSaving(false);
        return;
      }
    }

    const { error: responseError } = await writeArticle({
      articleType,
      data: { body: '', imageUrl: '', subtitle: '', title: '' },
      id: article.articleId,
      method: 'DELETE',
    });
    if (responseError) {
      setError(responseError);
    } else {
      fetchArticles();
    }
    setIsSaving(false);
  };

  return (
    <ContentContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h1">
        {articleLabel} Entries
      </Typography>
      {!hasFetchedArticles ? (
        <div>
          <CircularProgress />
        </div>
      ) : null}
      {articles && articles.length > 0 ? (
        <List>
          {articles.map((article) => (
            <ListItem key={article.articleId}>
              <Link
                href={`/edit?articleId=${article.articleId}&articleType=${articleType}`}
              >
                {article.title}
              </Link>
              <Button
                onClick={() => deleteArticle(article)}
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
