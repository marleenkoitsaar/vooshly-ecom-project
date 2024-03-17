import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { getAllProducts } from 'src/supabase';
import Loader from '../loader';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

const AllProducts = () => {
  const { pathname } = useLocation();
  const { data, isLoading, error } = useQuery({
    queryKey: ['GET_ALL_PRODUCTS', pathname],
    enabled: pathname === '/',
    queryFn: getAllProducts,
  });

  const theme = useTheme();

  if (pathname !== '/') return null;

  if (error) {
    return <Typography>Error encountered: {error.message}</Typography>;
  }

  return (
    <Loader loading={isLoading} loadingText="Loading products...">
      <Typography variant="h5" marginY={theme.spacing(2)}>
        All Products
      </Typography>
      <Grid container spacing={theme.spacing(2)}>
        {data?.map((product) => (
          <Grid xs={12} sm={6} md={4} lg={3} item key={product.id.toString()}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/collections/${product.collection_id}/${product.id}`}
              state={{ product }}
            >
              <Card key={product.id.toString()}>
                <CardMedia sx={{ height: 140 }} image={product.image ?? ''} />
                <CardContent>
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      textWrap: 'nowrap',
                    }}
                    gutterBottom
                    variant="body1"
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}$
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Loader>
  );
};

export default AllProducts;
