import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Box, Button } from '@mui/material';
import {
  findOrCreateCustomer,
  createOrder,
  generateOrderNumber,
} from 'src/supabase';
import { useCartContext } from 'src/context/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCheckoutContext } from 'src/context/checkout';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const {
    state: { products },
    dispatch,
  } = useCartContext();
  const cart = Object.values(products);

  const { state } = useCheckoutContext();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setMessage(
        paymentIntent?.status === 'succeeded'
          ? 'Your payment succeeded'
          : 'Unexpected error occurred'
      );
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const stripeResultPromise = stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: {
          billing_details: {
            address: {
              city: state.city,
              country: state.country,
              postal_code: state.postalCode,
              line1: state.address,
            },
            email: state.email,
            name: `${state.firstName} ${state.lastName}`,
            phone: state.phone,
          },
        },
        return_url: 'http://localhost:5173/',
        receipt_email: 'info@vooshly.com',
        shipping: {
          address: {
            city: state.city,
            country: state.country,
            postal_code: state.postalCode,
            state: state.state,
            line1: state.address,
          },
          name: `${state.firstName} ${state.lastName}`,
          carrier: 'Fedex',
          phone: state.phone,
        },
      },
    });

    toast.promise(stripeResultPromise, {
      pending: 'Confirming payment',
      success: 'Payment confirmed 👌',
      error: 'Payment failed 🤯',
    });

    const { error } = await stripeResultPromise;

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setMessage(error.message!);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    console.log('state', state);
    const createCustomerPromise = findOrCreateCustomer({
      address: state.address,
      email: state.email,
      phone: state.phone,
    });

    toast.promise(createCustomerPromise, {
      pending: 'Creating customer',
      success: 'Customer created 👌',
      error: 'Failed 🤯',
    });

    const customer = await createCustomerPromise;

    const orderNumber = await generateOrderNumber();

    const orderPromise = createOrder({
      payment_status: 'paid',
      product_ids: cart.map((product) => product.id),
      total: cart.reduce(
        (total, cur) => total + (cur.price ?? 0) * (cur.qty ?? 1),
        0
      ),
      status: 'fulfilled',
      customer_id: customer.id,
      number: orderNumber,
    });

    toast.promise(orderPromise, {
      pending: 'Creating order',
      success: 'Order created 👌',
      error: 'Failed 🤯',
    });

    const order = await orderPromise;

    dispatch({ type: 'CLEAR_CART' });
    navigate(`/confirmation/${order.id}`, { state: order.number });
  };

  if (!stripe) return;

  return (
    <Box margin="1rem 0">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button
          variant="contained"
          color="dark"
          fullWidth
          type="submit"
          sx={{ marginTop: '0.5rem' }}
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? 'Loading...' : 'Complete purchase'}
        </Button>
        {message && <div>{message}</div>}
      </form>
    </Box>
  );
}
