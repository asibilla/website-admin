'use client';

import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import type { FC } from 'react';
import { useContext, useEffect } from 'react';

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
  const { setError } = useContext(AppContext);
  const { getArticleLabelByType } = useReferenceData();
  const articleLabel = getArticleLabelByType(articleType);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [articles, error, setError]);

  return (
    <ContentContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h1">
        {articleLabel} Entries
      </Typography>
      {articles && articles.length > 0 ? (
        <List>
          {articles.map((article) => (
            <ListItem key={article.articleId}>
              <Link
                href={`/edit?articleId=${article.articleId}&articleType=${articleType}`}
              >
                {article.title}
              </Link>
              <Button startIcon={<DeleteIcon />} sx={{ marginLeft: '10px' }}>
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
