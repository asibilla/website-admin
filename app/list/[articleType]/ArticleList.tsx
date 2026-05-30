'use client';

import { Button, Typography } from '@mui/material';
import Link from 'next/link';
// import { useEffect, useState } from 'react';

// import { getArticle } from '@/api';
import ContentContainer from '@/components/ContentContainer';
// import type { GetArticleContentItem } from '@/types';

type ArticleListProps = {
  articleType: string;
};

export default function ArticleList({ articleType }: ArticleListProps) {
  // const [content, setContent] = useState<GetArticleContentItem[] | null>(null);
  // useEffect(() => {
  //   const fetchContent = async () => {
  //     const articleData = await getArticle({ type: 'homepage' });
  //     if (!('error' in articleData)) {
  //       setContent(articleData as GetArticleContentItem[]);
  //     }
  //   };

  //   fetchContent();
  // }, []);

  return (
    <ContentContainer>
      <Typography variant="h1">Article List {articleType}</Typography>
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
}
