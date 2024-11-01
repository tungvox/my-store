import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, Box, Link } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types';
import { addToCart } from '../store/cartSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
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
    <Box sx={{ 
      p: 4,
      minHeight: '100vh',
      bgcolor: '#ffffff'
    }}>
      {/* Back Link */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 3 }}>
        <Link
          component="button"
          onClick={() => navigate(-1)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#666',
            textDecoration: 'none',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            '&:hover': {
              color: '#2c3e50',
            }
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Back
        </Link>
      </Box>

      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
      }}>
        {/* Image Section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f8f8f8',
          borderRadius: 2,
          p: 4,
        }}>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            style={{ 
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Details Section */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 500,
              color: '#2c3e50'
            }}
          >
            {product.title}
          </Typography>

          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#2c3e50'
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              lineHeight: 1.7,
              mt: 2 
            }}
          >
            {product.description}
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            sx={{
              mt: 4,
              py: 1.5,
              width: '200px',
              bgcolor: '#2c3e50',
              '&:hover': {
                bgcolor: '#34495e'
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
