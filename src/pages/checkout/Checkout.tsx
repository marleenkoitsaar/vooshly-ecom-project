import {
  Avatar,
  Box,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from 'src/context/cart';
import StripePayment from 'src/stripe';

const countries = ['Estonia', 'Latvia', 'Canada', 'Germany'];

const Checkout = () => {
  const theme = useTheme();
  const {
    state: { products },
  } = useCartContext();

  const productsArray = Object.values(products);
  const navigate = useNavigate();

  useEffect(() => {
    if (productsArray.length === 0) {
      navigate('/');
    }
  }, []);

  const total = productsArray.reduce((sum, product) => {
    return sum + (product.price ?? 0) * (product.qty ?? 1);
  }, 0);

  return (
    <Grid marginTop={theme.spacing(4)} container>
      <Grid item xs={7}>
        <Typography marginBottom={theme.spacing(2)} variant="h5">
          Checkout
        </Typography>
        <Stack gap={theme.spacing(2)}>
          <TextField fullWidth label="Email" />
          <TextField
            defaultValue={countries[0]}
            fullWidth
            label="Delivery"
            select
          >
            {countries.map((country) => (
              <MenuItem value={country} key={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
          <Stack gap={theme.spacing(2)} flexDirection="row">
            <TextField fullWidth label="First name" />
            <TextField fullWidth label="Last name" />
          </Stack>
          <TextField fullWidth label="Address" />
          <Stack gap={theme.spacing(2)} flexDirection="row">
            <TextField fullWidth label="Postal code" />
            <TextField fullWidth label="City" />
          </Stack>
          <TextField fullWidth label="Phone" />
        </Stack>
        <StripePayment />
      </Grid>
      <Divider
        orientation="vertical"
        sx={{ height: '100vh', width: 2, margin: '0 1rem' }}
      />
      <Grid item xs={4}>
        <Box position="sticky" top="65px">
          {productsArray.map((product) => (
            <Stack
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              key={product.id.toString()}
            >
              <Stack alignItems="center" flexDirection="row">
                <Avatar
                  sx={{ height: 50, width: 50 }}
                  src={product.image ?? ''}
                />
                <Typography>{product.title}</Typography>
              </Stack>
              <Typography>${product.price}</Typography>
            </Stack>
          ))}
          <Stack
            marginTop={theme.spacing(2)}
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography>Subtotal</Typography>
            <Typography>{total.toFixed(2)}</Typography>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography>Shipping</Typography>
            <Typography>{total.toFixed(2)}</Typography>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography>Total</Typography>
            <Typography>{total.toFixed(2)}</Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Checkout;
