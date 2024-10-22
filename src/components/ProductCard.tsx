import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../types/types';
import { addToCart } from '../store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
  objectFit: 'cover',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <StyledCard>
      <StyledCardMedia
        image={product.image}
        title={product.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          <StyledLink to={`/product/${product.id}`}>
            {product.title}
          </StyledLink>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
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
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
