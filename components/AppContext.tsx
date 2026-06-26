'use client';
import noop from 'lodash.noop';
import type { FC } from 'react';
import { createContext, useState } from 'react';
import type { AppContextType } from '@/types';

export const AppContext = createContext<AppContextType>({
  error: null,
  hasSuccessfullySaved: false,
  isSaving: false,
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
  return (
    <AppContext.Provider
      value={{
        error,
        hasSuccessfullySaved,
        isSaving,
        setError,
        setHasSuccessfullySaved,
        setIsSaving,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
