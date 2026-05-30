'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';

import { ARTICLE_TYPES } from '@/constants';
import ContentContainer from '@/components/ContentContainer';

const Home: FC = () => {
  return (
    <div>
      <main>
        <ContentContainer>
          <Typography variant="h1">Admin Dashboard</Typography>
          <Typography variant="body1">Select an article type.</Typography>
          <ul>
            {ARTICLE_TYPES.map((type) => (
              <li key={type}>
                <Link href={`/list/${type}`}>{type}</Link>
              </li>
            ))}
          </ul>
        </ContentContainer>
      </main>
    </div>
  );
};

export default Home;
