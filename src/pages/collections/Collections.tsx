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
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader';
import { getCollections } from 'src/supabase';

const Collections = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GET_COLLECTIONS'],
    queryFn: getCollections,
  });

  const navigate = useNavigate();

  return (
    <Loader loading={isLoading} loadingText="Loading collections...">
      <Box padding="2rem">
        <Box display="flex" alignItems="center" marginBottom="1rem" gap="1rem">
          <Button color="dark" variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Typography variant="h4">Collections</Typography>
        </Box>
        <Grid container spacing={2}>
          {data?.map((collection) => (
            <Grid xs={12} md={4} item key={collection.id.toString()}>
              <Card>
                <CardMedia sx={{ height: 140 }} image={collection.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {collection.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {collection.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link state={{ collectionTitle: collection.title }} to={collection.id.toString()}>
                    <Button size="small">See all products</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Loader>
  );
};

export default Collections;
