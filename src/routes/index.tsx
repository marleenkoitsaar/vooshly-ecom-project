import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import Collections from 'src/pages/collections';
import Products from 'src/pages/products';
import About from 'src/pages/about';
import Contact from 'src/pages/contact';

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
        path: 'collections/:collection_id',
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
    ],
  },
]);

export default router;
