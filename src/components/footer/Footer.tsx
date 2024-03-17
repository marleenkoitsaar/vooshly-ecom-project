import { Stack, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  return (
    <Stack
      height={65}
      sx={{ background: theme.palette.primary.main }}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>© 2024 Vooshly All rights reserved</Typography>
    </Stack>
  );
};

export default Footer;
