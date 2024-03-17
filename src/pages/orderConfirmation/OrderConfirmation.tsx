import { Button, Stack, Typography, useTheme } from '@mui/material';
import { Link, Navigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const theme = useTheme();
  if (state === null) {
    return <Navigate to="/" />;
  }
  return (
    <Stack gap={theme.spacing(1)} marginTop={theme.spacing(3)} alignItems="center">
      <Typography variant="h5">Thanks!</Typography>
      <Typography variant="h6">Your order has been confirmed</Typography>
      <Typography variant="body1">Order number: {state}</Typography>
      <Link to="/">
        <Button variant="contained">Return to main page</Button>
      </Link>
    </Stack>
  );
};

export default OrderConfirmation;
