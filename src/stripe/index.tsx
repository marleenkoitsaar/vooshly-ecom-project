import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { useCartContext } from 'src/context/cart';
import { Alert } from '@mui/material';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HQVi7JeTFP0XuaUTl6gLyG5FiO4OtvINvy4Ynk7tYnNBUOFPkc11WD1ghQiDVi9DOcrvGlZvgxTkW3UsTkwmDVV00KHvIWEuo'
);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState('');

  const {
    state: { products },
  } = useCartContext();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:8080/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: Object.values(products).map((product) => ({
          id: product.id,
          price: product.price,
          qty: product.qty,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  } as const;

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return <Alert sx={{ marginTop: 5 }}>Failed to load stripe</Alert>;
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
