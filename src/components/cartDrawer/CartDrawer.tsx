import {
  useTheme,
  Button,
  Drawer,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { useCartContext } from 'src/context/cart';
import EmptyCart from './EmptyCart';
import CartHeader from './CartHeader';
import ProductsTable from './ProductsTable';

const CartDrawer = () => {
  const {
    state: { drawerOpened, products },
    dispatch,
  } = useCartContext();

  const cartArray = Object.values(products);
  const cartEmpty = cartArray.length === 0;

  const total = cartArray.reduce((acc, cur) => {
    const productTotal = Number(cur.price ?? 0) * (cur.qty ?? 1);
    return acc + productTotal;
  }, 0);

  const theme = useTheme();

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 500,
          padding: theme.spacing(2),
        },
      }}
      onClose={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
      open={drawerOpened}
      anchor="right"
    >
      {cartEmpty ? (
        <EmptyCart />
      ) : (
        <Stack>
          <CartHeader />
          <Divider sx={{ margin: '1rem 0' }} />
          <ProductsTable />
          <Divider />
          <Typography variant="h6" marginTop={theme.spacing(2)}>
            <b>Total</b>: {total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: theme.spacing(2),
            }}
          >
            Checkout
          </Button>
        </Stack>
      )}
    </Drawer>
  );
};

export default CartDrawer;
