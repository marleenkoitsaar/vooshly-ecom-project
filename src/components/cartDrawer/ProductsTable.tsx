import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useCartContext } from 'src/context/cart';
import ProductItem from './ProductItem';

const ProductsTable = () => {
  const {
    state: { products },
  } = useCartContext();
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Total</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(products).map((product) => (
          <ProductItem key={product.id.toString()} product={product} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
