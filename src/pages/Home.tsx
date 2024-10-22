import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/productSlice';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        E-commerce Product Listing
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Filters />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductList products={items} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
