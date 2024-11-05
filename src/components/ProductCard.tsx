import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, Box, styled, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { RootState } from '../store/store';

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
  backgroundColor: 'white',
  padding: 10
});

const ProductCard: React.FC<ProductCardProps> = ({ product, isCheckout = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartQuantity = useSelector((state: RootState) => 
    state.cart.items.find(item => item.id === product.id)?.quantity || 0
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromCart({ id: product.id, removeAll: true }));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <StyledCard onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <StyledCardMedia
        component="img"
        image={product.thumbnail}
        title={product.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: (theme) => theme.palette.background.paper }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.875rem' }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.reviews.length})
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.brand}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 1 }}>
            ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
          </Typography>
          {product.discountPercentage > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
        {product.stock <= 5 && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            Only {product.stock} left in stock!
          </Typography>
        )}
        <Box sx={{ mt: 'auto' }}>
          {cartQuantity > 0 && (
            <Typography variant="body2" align="left" sx={{ mb: 1 }}>
              {cartQuantity} in cart - <span 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart(e);
                }}
                style={{ color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Remove
              </span>
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleAddToCart}
            fullWidth
            disabled={product.stock === 0}
            sx={{
              mt: 2,
              backgroundColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
