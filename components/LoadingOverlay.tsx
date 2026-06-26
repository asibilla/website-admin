'use client';
import { Backdrop, CircularProgress } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';

import { AppContext } from '@/components/AppContext';

const LoadingOverlay: FC = () => {
  const { isSaving } = useContext(AppContext);
  return (
    <Backdrop open={isSaving} sx={{ zIndex: '999' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
