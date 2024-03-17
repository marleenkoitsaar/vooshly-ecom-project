import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import Collections from 'src/pages/collections';
import Products from 'src/pages/products';
import About from 'src/pages/about';
import Contact from 'src/pages/contact';
import Product from 'src/pages/product';
import Checkout from 'src/pages/checkout';
import Login from 'src/pages/login';
import OrderConfirmation from 'src/pages/orderConfirmation';

import { CheckoutProvider } from 'src/context/checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/collections',
        element: <Collections />,
      },
      {
        path: '/collections/:collection_id',
        element: <Products />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/collections/:collection_id/:product_id',
        element: <Product />,
      },
      {
        path: '/checkout',
        element: (
          <CheckoutProvider>
            <Checkout />
          </CheckoutProvider>
        ),
      },
      {
        path: 'confirmation/:order_id',
        element: <OrderConfirmation />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
