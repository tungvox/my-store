import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, Box, styled, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../types/types';
import { addToCart, removeFromCart } from '../store/cartSlice';

interface ProductCardProps {
  product: Product;
  isCheckout?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)<{ component?: React.ElementType }>({
  height: 200,
  objectFit: 'contain',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product, isCheckout = false }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={product.image}
        title={product.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: (theme) => theme.palette.background.paper }}>
        <Typography gutterBottom variant="h6" component="div">
          <StyledLink to={`/product/${product.id}`}>
            {product.title}
          </StyledLink>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.875rem' }}>
          <Rating value={product.rating.rate} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.rating.count})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          {isCheckout ? (
            <Button
              variant="outlined"
              onClick={handleRemoveFromCart}
              fullWidth
              sx={{ mt: 2 }}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleAddToCart}
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
