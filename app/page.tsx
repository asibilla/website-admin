'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';
import { useContext, useEffect } from 'react';

import { getReferenceData } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import type { ReferenceDataResponseItem } from '@/types';

const Home: FC = () => {
  const { articleTypes, setArticleTypes, setError } = useContext(AppContext);
  useEffect(() => {
    const fetchReferenceData = async () => {
      const { data, error } = await getReferenceData();
      if (data) {
        setArticleTypes(data as ReferenceDataResponseItem);
      } else {
        setError(error as Error);
      }
    };
    fetchReferenceData();
  }, [setArticleTypes, setError]);

  console.log(articleTypes);

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
