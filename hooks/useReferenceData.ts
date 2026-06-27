import { useCallback, useContext, useEffect } from 'react';

import { getReferenceData } from '@/api';
import { AppContext } from '@/components/AppContext';
import type { ReferenceDataResponseItem } from '@/types';

export const useReferenceData = (): {
  articleTypes: ReferenceDataResponseItem[];
  getArticleLabelByType: (articleType: string) => string;
} => {
  const { articleTypes, setArticleTypes, setError } = useContext(AppContext);
  useEffect(() => {
    if (!!articleTypes && articleTypes.length > 0) {
      return;
    }
    const fetchReferenceData = async () => {
      const { data, error } = await getReferenceData();
      if (data) {
        setArticleTypes(data as ReferenceDataResponseItem[]);
      } else {
        setError(error as Error);
      }
    };
    fetchReferenceData();
  }, [articleTypes, setArticleTypes, setError]);

  const getArticleLabelByType = useCallback(
    (articleType: string) => {
      return (
        articleTypes.find(({ key }) => key === articleType)?.label ?? 'Unknown'
      );
    },
    [articleTypes]
  );

  return {
    articleTypes,
    getArticleLabelByType,
  };
};
