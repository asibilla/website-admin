'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';

import ContentContainer from '@/components/ContentContainer';
import { useReferenceData } from '@/hooks/useReferenceData';

const Home: FC = () => {
  const { articleTypes } = useReferenceData();

  return (
    <div>
      <main>
        <ContentContainer>
          <Typography variant="h1">Admin Dashboard</Typography>
          <Typography variant="body1">Select an article type.</Typography>
          <ul>
            {articleTypes.map(({ key, label }) => (
              <li key={key}>
                <Link href={`/list/${key}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </ContentContainer>
      </main>
    </div>
  );
};

export default Home;
