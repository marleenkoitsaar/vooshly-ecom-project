import { Stack, Typography } from '@mui/material';
import { useCartContext } from 'src/context/cart';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CartHeader = () => {
  const {
    state: { products },
    dispatch,
  } = useCartContext();
  const itemsInCart = Object.keys(products).length;

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight="bold" variant="h5" align="center">
        Shopping Cart ({itemsInCart} {itemsInCart === 1 ? 'item' : 'items'})
      </Typography>
      <CloseOutlinedIcon
        onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
      />
    </Stack>
  );
};

export default CartHeader;