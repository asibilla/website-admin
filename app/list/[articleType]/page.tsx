import type { FC } from 'react';

import { ARTICLE_TYPES } from '@/constants';
import ArticleList from './ArticleList';

export function generateStaticParams() {
  return ARTICLE_TYPES.map((type) => ({ articleType: type }));
}

const Page: FC<{ params: Promise<{ articleType: string }> }> = async ({
  params,
}) => {
  const { articleType } = await params;

  return <ArticleList articleType={articleType} />;
};

export default Page;
