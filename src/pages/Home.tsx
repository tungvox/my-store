import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  CircularProgress,
  Alert,
  AlertTitle 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts, fetchCategories } from '../store/productSlice';
import CategoryList from '../components/CategoryList';
import { Product } from '../types/types';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    products,
    categories, 
    status, 
    error
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error || 'Failed to load products. Please try again later.'}
        </Alert>
      </Container>
    );
  }

  // Build productsByCategory based on the categories array
  const productsByCategory: Record<string, Product[]> = categories.reduce((acc, category) => {
    acc[category.slug] = products.filter(product => product.category === category.slug);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <CategoryList 
            products={products}
            categories={categories} // Pass categories directly as an array of Category
            productsByCategory={productsByCategory}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
