'use client';
import noop from 'lodash.noop';
import type { FC } from 'react';
import { createContext, useState } from 'react';
import type { AppContextType, ReferenceDataResponseItem } from '@/types';

export const AppContext = createContext<AppContextType>({
  articleTypes: [],
  error: null,
  hasSuccessfullySaved: false,
  isSaving: false,
  setArticleTypes: noop,
  setError: noop,
  setHasSuccessfullySaved: noop,
  setIsSaving: noop,
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [hasSuccessfullySaved, setHasSuccessfullySaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [articleTypes, setArticleTypes] = useState<ReferenceDataResponseItem>(
    []
  );
  return (
    <AppContext.Provider
      value={{
        articleTypes,
        error,
        hasSuccessfullySaved,
        isSaving,
        setArticleTypes,
        setError,
        setHasSuccessfullySaved,
        setIsSaving,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
