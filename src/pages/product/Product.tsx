import {
  Typography,
  Grid,
  Avatar,
  useTheme,
  Divider,
  Button,
  TextField,
  Box,
  Collapse,
  CardContent,
  Card,
  CardHeader,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useCartContext } from 'src/context/cart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const CollapsibleRow = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card onClick={() => setOpen((prev) => !prev)}>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} title={title} />
      <Collapse in={open}>
        <CardContent>{content}</CardContent>
      </Collapse>
    </Card>
  );
};

const Product = () => {
  const {
    state: { product },
  } = useLocation();
  const theme = useTheme();

  const [qty, setQty] = useState('1');

  const { dispatch } = useCartContext();

  function addToCart() {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { ...product, qty: Number(qty) },
    });
    dispatch({ type: 'TOGGLE_CART_DRAWER' });
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value === '') setQty('');
    if (!/^\d+$/.test(value)) return;
    setQty(value);
  }

  function onBlur() {
    if (qty === '') setQty('1');
  }

  return (
    <Grid marginTop={theme.spacing(5)} container gap={theme.spacing(2)}>
      <Grid item md={6}>
        <Box position="sticky" top="85px">
          <Avatar
            sx={{
              height: '100%',
              width: '100%',
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 0,
            }}
            src={product.image}
          />
        </Box>
      </Grid>
      <Grid
        gap={theme.spacing(2)}
        display="flex"
        flexDirection="column"
        item
        md={5}
      >
        <Typography variant="h5" fontWeight="bold">
          {product.title}
        </Typography>
        <Divider />
        <Typography variant="h6">{product.price.toFixed(2)}$</Typography>
        <Typography variant="body1"> {product.description}</Typography>
        <Typography fontWeight="bold">🙌 Advanced vegan formula</Typography>
        <Typography fontWeight="bold">🙌 Natural ingredients</Typography>
        <Typography fontWeight="bold">🙌 Best enviromental impact</Typography>
        <TextField
          value={qty}
          onChange={onChange}
          onBlur={onBlur}
          InputProps={{
            startAdornment: (
              <RemoveIcon
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setQty((prev) =>
                    prev === '1' ? prev : String(Number(prev) - 1)
                  )
                }
              />
            ),
            endAdornment: (
              <AddIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => setQty((prev) => String(Number(prev) + 1))}
              />
            ),
          }}
          label="Quantity"
        />
        <Button size="large" variant="contained" fullWidth onClick={addToCart}>
          Add To Cart
        </Button>

        <Box>
          <CollapsibleRow
            title="What payment methods do we accept?"
            content="We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure payment gateways. Choose the option that suits you best during the checkout process."
          />
          <CollapsibleRow
            title="How to start a refund?"
            content="We have a 14 day refund policy. More info can be found in our refund policy."
          />
          <CollapsibleRow
            title="How to contact us?"
            content="You can contact us by using our contact form on our contact page. Another option is to email us :) Our email address is info@vooshly.com"
          />
          <CollapsibleRow
            title="How long does shipping take?"
            content="Shipping usually takes from 4 to 10 business days after we get the order. More info can be found in our shipping policy."
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
