import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, Box, Link, Chip, Rating } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types';
import { addToCart } from '../store/cartSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../theme';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f8f8f8',
            borderRadius: 2,
            p: 4,
            position: 'relative',
            height: '400px',
          }}>
            <img 
              src={product.images[selectedImage]} 
              alt={product.title} 
              style={{ 
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                transition: 'all 0.3s ease'
              }} 
            />
            <Box sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              px: 2,
            }}>
              <Button 
                onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  color: '#2c3e50',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                {'<'}
              </Button>
              <Button 
                onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  color: '#2c3e50',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                {'>'}
              </Button>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '::-webkit-scrollbar': {
              height: '6px',
            },
            '::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
          }}>
            {product.images.map((image, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImage(index)}
                sx={{
                  flexShrink: 0,
                  width: '80px',
                  height: '80px',
                  bgcolor: '#f8f8f8',
                  borderRadius: 1,
                  p: 1,
                  cursor: 'pointer',
                  border: index === selectedImage ? '2px solid #2c3e50' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ 
            display: 'grid', 
            gap: 2,
            bgcolor: '#f8f8f8',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h6" sx={{ 
              color: '#2c3e50',
              borderBottom: '2px solid #e1e8ed',
              pb: 1
            }}>
              Product Details
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 3,
              '& > *': {
                bgcolor: '#ffffff',
                p: 2,
                borderRadius: 1,
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }
              }
            }}>
              <InfoItem label="Category" value={product.category} />
              <InfoItem label="Stock" value={product.stock} />
              <InfoItem label="Rating" value={`${product.rating}/5`} />
              <InfoItem label="Availability" value={product.availabilityStatus} />
              <InfoItem label="Weight" value={`${product.weight} kg`} />
              <InfoItem label="Minimum Order" value={product.minimumOrderQuantity} />
            </Box>
          </Box>

          <Box sx={{ 
            display: 'grid', 
            gap: 2,
            bgcolor: '#f8f8f8',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h6" sx={{ 
              color: '#2c3e50',
              borderBottom: '2px solid #e1e8ed',
              pb: 1
            }}>
              Dimensions
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
              alignItems: 'center'
            }}>
              <Box sx={{
                position: 'relative',
                width: '240px',
                height: '240px',
                margin: 'auto',
                perspective: '1000px',
                mt: 4
              }}>
                {(() => {
                  const { width, height, depth } = product.dimensions;
                  const maxDimension = Math.max(width, height, depth);
                  const relativeWidth = (width / maxDimension) * 100;
                  const relativeHeight = (height / maxDimension) * 100;

                  return (
                    <Box sx={{
                      position: 'relative',
                      width: `${relativeWidth}%`,
                      height: `${relativeHeight}%`,
                      transformStyle: 'preserve-3d',
                      transform: 'rotateX(60deg) rotateZ(-45deg)',
                      transition: 'transform 0.3s ease',
                      margin: 'auto',
                      '&:hover': {
                        transform: 'rotateX(65deg) rotateZ(-45deg)',
                      }
                    }}>
                      <Box sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid #e1e8ed',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Typography 
                          sx={{ 
                            transform: 'rotateX(-60deg) rotateZ(45deg)',
                            color: '#2c3e50',
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}
                        >
                          {`${width} × ${height}`}
                        </Typography>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        width: `${(depth / width) * 100}%`,
                        height: '100%',
                        right: `-${(depth / width) * 100}%`,
                        transformOrigin: 'left',
                        transform: 'rotateY(90deg)',
                        border: '2px solid #e1e8ed',
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Typography 
                          sx={{ 
                            transform: 'rotateX(-60deg) rotateZ(45deg)',
                            color: '#2c3e50',
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}
                        >
                          {`${depth}`}
                        </Typography>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        width: '100%',
                        height: `${(depth / height) * 100}%`,
                        top: `-${(depth / height) * 100}%`,
                        transformOrigin: 'bottom',
                        transform: 'rotateX(90deg)',
                        border: '2px solid #e1e8ed',
                        background: 'linear-gradient(135deg, #f1f3f5 0%, #e9ecef 100%)',
                      }} />
                    </Box>
                  );
                })()}

                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '-40px',
                  transform: 'rotate(-45deg)',
                  color: '#6c757d',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}>
                  Height
                </Box>
                <Box sx={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-45deg)',
                  color: '#6c757d',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}>
                  Width
                </Box>
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '-50px',
                  transform: 'rotate(45deg)',
                  color: '#6c757d',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}>
                  Depth
                </Box>
                <Box sx={{
                  position: 'absolute',
                  top: '0',
                  left: '-20px',
                  height: '100%',
                  borderLeft: '2px dashed #e1e8ed',
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '0',
                  width: '100%',
                  borderBottom: '2px dashed #e1e8ed',
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '0',
                  right: '-20px',
                  height: '100%',
                  borderRight: '2px dashed #e1e8ed',
                }} />
              </Box>

              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 3,
                '& > *': {
                  bgcolor: '#ffffff',
                  p: 2,
                  borderRadius: 1,
                  textAlign: 'center',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }
                }
              }}>
                <InfoItem label="Width" value={`${product.dimensions.width} cm`} />
                <InfoItem label="Height" value={`${product.dimensions.height} cm`} />
                <InfoItem label="Depth" value={`${product.dimensions.depth} cm`} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'grid', gap: 2 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50' }}>Customer Reviews</Typography>
            {product.reviews.map((review, index) => (
              <Box key={index} sx={{ bgcolor: '#f8f8f8', p: 2, borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">{review.reviewerName}</Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2">({review.rating}/5)</Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 2
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500, color: '#2c3e50' }}>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666' }}>
              Brand: {product.brand} | SKU: {product.sku}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                ${product.price.toFixed(2)}
              </Typography>
              {product.discountPercentage > 0 && (
                <>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: '#666',
                      fontWeight: 400 
                    }}
                  >
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
                    {product.discountPercentage}% OFF
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50' }}>Additional Information</Typography>
            <InfoItem label="Warranty" value={product.warrantyInformation} />
            <InfoItem label="Shipping" value={product.shippingInformation} />
            <InfoItem label="Return Policy" value={product.returnPolicy} />
          </Box>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50' }}>Tags</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {product.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Box>
          </Box>

          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            sx={{
              mt: 2,
              py: 1.5,
              width: '200px',
              bgcolor: theme.palette.secondary.main,
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    gap: 0.5
  }}>
    <Typography 
      variant="caption" 
      sx={{ 
        color: '#666',
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '0.7rem',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#2c3e50',
        fontWeight: 500
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default ProductDetails;
