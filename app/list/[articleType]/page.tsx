import type { FC } from 'react';

import { getArticle, getReferenceData } from '@/api';
import type { GetArticleContentItem, ReferenceDataResponseItem } from '@/types';

import ArticleList from './ArticleList';

export async function generateStaticParams() {
  const { data } = await getReferenceData();
  return (
    (data as ReferenceDataResponseItem[]).map(({ key }) => ({
      articleType: key,
    })) ?? []
  );
}

const Page: FC<{ params: Promise<{ articleType: string }> }> = async ({
  params,
}) => {
  const { articleType } = await params;
  const { data, error } = await getArticle({ type: articleType });

  return (
    <ArticleList
      articles={data as GetArticleContentItem[] | null}
      articleType={articleType}
      error={error}
    />
  );
};

export default Page;
