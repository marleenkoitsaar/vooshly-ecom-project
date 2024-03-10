import { useLocation } from 'react-router-dom';

const Product = () => {
  const {
    state: { product },
  } = useLocation();
  return <h1>product page</h1>;
};

export default Product;
