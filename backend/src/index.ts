import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();

//@ts-ignore
const stripe = Stripe(
  'sk_test_51HQVi7JeTFP0XuaUOMmCK9v8FcxPu8q7StqGMfyBQMx5FQMc2HZvM0pGvwHtPxumjXGb1kCGxm25m7GPiGvrlYoo004c8PXIyr'
);

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (
  items: { id: string; qty: number; price: number }[]
) => {
  return Math.round(
    items.reduce((acc, cur) => acc + cur.price * cur.qty, 0) * 100
  );
};

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  if (items.length <= 0) {
    return;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',

    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
