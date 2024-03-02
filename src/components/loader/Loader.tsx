import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

const Loader: React.FC<
  PropsWithChildren<{ loading: boolean; loadingText: string }>
> = ({ children, loading, loadingText }) => {
  if (!loading) return children;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Stack alignItems="center" gap="1rem">
        <CircularProgress color="inherit" />
        <Typography variant="h6">{loadingText}</Typography>
      </Stack>
    </Backdrop>
  );
};

export default Loader;
