import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useCartContext } from 'src/context/cart';

const EmptyCart = () => {
  const theme = useTheme();
  const { dispatch } = useCartContext();
  return (
    <Stack
      gap={theme.spacing(2)}
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">Cart is empty</Typography>
      <Button
        variant="contained"
        color="dark"
        onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
      >
        Continue shopping
      </Button>
    </Stack>
  );
};

export default EmptyCart;
