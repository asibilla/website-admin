'use client';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

import ContentContainer from '@/components/ContentContainer';

const Edit: FC = () => {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  const articleType = searchParams.get('articleType');

  return (
    <ContentContainer>
      <Typography variant="h1">
        Edit {articleId} {articleType}
      </Typography>
    </ContentContainer>
  );
};

export default Edit;
