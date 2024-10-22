import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types';
import { addToCart } from '../store/cartSlice';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>{product.title}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flexShrink: 0 }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>${product.price.toFixed(2)}</Typography>
          <Typography variant="body1" paragraph>{product.description}</Typography>
          <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
