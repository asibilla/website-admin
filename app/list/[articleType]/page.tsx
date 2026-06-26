import type { FC } from 'react';

import { getReferenceData } from '@/api';

import ArticleList from './ArticleList';
import type { ReferenceDataResponseItem } from '@/types';

export async function generateStaticParams() {
  const { data } = await getReferenceData();
  return (
    (data as ReferenceDataResponseItem).map(({ key }) => ({
      articleType: key,
    })) ?? []
  );
}

const Page: FC<{ params: Promise<{ articleType: string }> }> = async ({
  params,
}) => {
  const { articleType } = await params;

  return <ArticleList articleType={articleType} />;
};

export default Page;
