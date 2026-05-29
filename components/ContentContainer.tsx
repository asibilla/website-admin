import { styled } from '@mui/material/styles';

const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 4),
  margin: '0 auto',
  maxWidth: theme.breakpoints.values.md,
}));

export default ContentContainer;
