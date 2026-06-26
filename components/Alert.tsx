'use client';
import { Alert as MuiAlert } from '@mui/material';
import type { FC } from 'react';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';

const Alert: FC = () => {
  const { error, hasSuccessfullySaved, setError, setHasSuccessfullySaved } =
    useContext(AppContext);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const severity = hasSuccessfullySaved ? 'success' : 'error';
  const message = hasSuccessfullySaved
    ? 'Article saved successfully'
    : error?.message || 'An error occurred';

  const clearAlert = useCallback(() => {
    setHasSuccessfullySaved(false);
    setError(null);
  }, [setError, setHasSuccessfullySaved]);

  useEffect(() => {
    if (hasSuccessfullySaved) {
      timeoutRef.current = setTimeout(clearAlert, 3000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [clearAlert, hasSuccessfullySaved]);

  if (!hasSuccessfullySaved && !error) {
    return null;
  }

  return (
    <ContentContainer>
      <MuiAlert severity={severity} onClose={clearAlert}>
        {message}
      </MuiAlert>
    </ContentContainer>
  );
};

export default Alert;
