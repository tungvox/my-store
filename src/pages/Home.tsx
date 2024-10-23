import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/productSlice';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status, error } = useSelector((state: RootState) => state.products);

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
    <Box sx={{ width: '100%', paddingTop: 1 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>
        <Box sx={{ width: { xs: '100%', md: '25%' } }}>
          <Filters />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          <ProductList products={filteredItems} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
