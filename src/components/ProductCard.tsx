import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, Box, styled, Rating, IconButton, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { RootState } from '../store/store';
import { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'box-shadow 0.3s ease-in-out',
  boxShadow: 'none',
  borderRadius: 0,
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

const ImageContainer = styled(Box)({
  position: 'relative',
  '&:hover .navigation-buttons': {
    opacity: 1,
  },
});

const NavigationButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  zIndex: 1,
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    if (isHovered && product.images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === product.images.length - 1 ? 0 : prev + 1
        );
      }, 1500); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, product.images.length]);

  return (
    <StyledCard 
      onClick={handleCardClick} 
      sx={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0); 
      }}
    >
      <ImageContainer>
        {product.images.length > 1 && (
          <>
            <NavigationButton
              className="navigation-buttons"
              sx={{ 
                left: 8,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
              }}
              size="small"
              onClick={handlePrevImage}
            >
              <ChevronLeftIcon />
            </NavigationButton>
            <NavigationButton
              className="navigation-buttons"
              sx={{ 
                right: 8,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
              }}
              size="small"
              onClick={handleNextImage}
            >
              <ChevronRightIcon />
            </NavigationButton>
          </>
        )}
        <StyledCardMedia
          component="img"
          image={product.images[currentImageIndex]}
          title={product.title}
        />
        
        {product.images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 0.5,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease-in-out'
            }}
          >
            {product.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? 'primary.main' : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </Box>
        )}
      </ImageContainer>

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: (theme) => theme.palette.background.paper,
        p: 2,
      }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0.5 }}>
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.875rem' }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.reviews.length})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.brand} | SKU: {product.sku}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 0.5
          }}>
            <Typography variant="h6" color="primary" sx={{ 
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            {product.discountPercentage > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ 
                textDecoration: 'line-through',
                whiteSpace: 'nowrap'
              }}>
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </Typography>
            )}
          </Box>
          
          {product.discountPercentage > 0 && (
            <Chip
              label={`SAVE ${product.discountPercentage}%`}
              size="small"
              sx={{ 
                height: 20,
                bgcolor: 'error.main',
                color: 'white',
                '& .MuiChip-label': { 
                  px: 1, 
                  fontSize: '0.7rem',
                  lineHeight: 1
                }
              }}
            />
          )}
        </Box>

        {/* Product details */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: 'text.secondary',
            mb: 1
          }}>
            {product.description}
          </Typography>
          
          {/* Tags */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
            {product.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ 
                  height: 20,
                  '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                }}
              />
            ))}
          </Box>

          {/* Additional info icons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            {product.warrantyInformation && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="caption" color="primary">
                  {product.warrantyInformation}
                </Typography>
              </Box>
            )}
            {product.shippingInformation.toLowerCase().includes('overnight') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocalShippingIcon sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption" color="success.main">
                  Overnight Shipping
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Stock warning */}
        {product.stock <= 5 && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            Only {product.stock} left in stock!
          </Typography>
        )}

        {/* Cart section */}
        <Box sx={{ mt: 'auto' }}>
          {cartQuantity > 0 && (
            <Typography variant="body2" align="left" sx={{ mb: 1 }}>
              {cartQuantity} in cart - <span 
                onClick={handleRemoveFromCart}
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
              mt: 1,
              color: 'white',
              backgroundColor: (theme) => theme.palette.secondary.main,
              boxShadow: 'none',
              borderRadius: 0,
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
