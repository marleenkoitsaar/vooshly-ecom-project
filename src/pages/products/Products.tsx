import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { useCartContext } from 'src/context/cart';
import { getProducts } from 'src/supabase';

const Products = () => {
  const { collection_id } = useParams<'collection_id'>();

  const { state } = useLocation();

  const { dispatch } = useCartContext();

  const { data, isLoading } = useQuery({
    queryKey: ['GET_PRODUCTS', collection_id],
    queryFn: () => {
      if (!collection_id) throw new Error('No collection id');
      return getProducts(Number(collection_id));
    },
    enabled: collection_id !== undefined,
  });

  const navigate = useNavigate();

  if ((data?.length ?? 0) === 0 && !isLoading) {
    return (
      <Box>
        <Typography>No products in this collection</Typography>
      </Box>
    );
  }

  return (
    <Loader loading={isLoading} loadingText="Loading products...">
      <Box padding="2rem">
        <Box display="flex" alignItems="center" marginBottom="1rem" gap="1rem">
          <Button color="dark" variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Typography variant="h4">
            {state?.collectionTitle ?? 'Products'}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {data?.map((product) => (
            <Grid xs={12} md={3} item key={product.id.toString()}>
              <Card key={product.id.toString()} sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 140 }} image={product.image ?? ''} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}$
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() =>
                      dispatch({ type: 'ADD_PRODUCT', payload: product })
                    }
                    variant="contained"
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Loader>
  );
};

export default Products;
