import { Avatar, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';
import { useCartContext } from 'src/context/cart';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type Props = {
  product: ReturnType<typeof useCartContext>['state']['products'][string];
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    dispatch,
    state: { products },
  } = useCartContext();
  function updateQty(productID: number) {
    return function inner(event: React.ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;
      if (!/^\d+\.?\d*$/.test(value) && value !== '') return;
      dispatch({
        type: 'UPDATE_QTY',
        payload: { productID, qty: value === '' ? null : Number(value) },
      });
    };
  }

  function handleBlur(productID: number) {
    return function inner(event: React.FocusEvent<HTMLInputElement>) {
      event.preventDefault();
      const qty = products[productID].qty;
      if (qty === null || qty === 0) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productID });
      }
    };
  }
  return (
    <TableRow>
      <TableCell>
        {product.image ? (
          <Avatar
            variant="rounded"
            alt={product.image}
            src={product.image}
            sx={{
              width: 50,
              height: 50,
            }}
          />
        ) : null}
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <TextField
          sx={{ width: '8ch' }}
          onChange={updateQty(product.id)}
          onBlur={handleBlur(product.id)}
          value={product.qty}
        />
      </TableCell>
      <TableCell>
        {((product.price ?? 0) * (product.qty ?? 1)).toFixed(2)}
      </TableCell>
      <TableCell>
        <CloseOutlinedIcon
          onClick={() =>
            dispatch({
              type: 'REMOVE_FROM_CART',
              payload: product.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
