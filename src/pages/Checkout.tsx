import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, Box, IconButton, Link } from '@mui/material';
import Grid from "@mui/material/Grid2"; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const quantities = cartItems.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);
  const handleIncrement = (productId: string) => {
    const product = cartItems.find(item => item.id.toString() === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };
  const handleDecrement = (productId: string) => {
    const product = cartItems.find(item => item.id.toString() === productId);
    if (product && product.quantity > 1) {
      dispatch(removeFromCart({ id: Number(productId), removeAll: false }));
    }
  };

  const handleDelete = (productId: string) => {
    dispatch(removeFromCart({ id: Number(productId), removeAll: true }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Order submitted');
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1200, 
      mx: 'auto', 
      p: { xs: 2, md: 4 },
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

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 2, backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderBottom: '1px solid #DDD',
              mb: 2,
            }}>
              <Typography variant="h4" sx={{ 
                fontSize: '28px',
                color: '#0F1111',
                fontWeight: 400,
                pb: 1
              }}>
                Shopping Cart
              </Typography>
              <Typography sx={{ 
                color: '#565959',
                alignSelf: 'flex-end',
                pb: 1
              }}>
                Price
              </Typography>
            </Box>

            {Object.keys(quantities).map((productId) => {
              const product = cartItems.find(item => item.id.toString() === productId);
              if (!product) return null;
              return (
                <Box key={productId} sx={{ 
                  display: 'flex',
                  py: 2,
                  borderBottom: '1px solid #DDD',
                }}>
                  <Box sx={{ width: 180, mr: 2 }}>
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ 
                      fontSize: '18px',
                      color: '#0F1111',
                      mb: 1
                    }}>
                      {product.title}
                    </Typography>

                    <Typography sx={{ 
                      fontSize: '14px',
                      color: '#666',
                      mb: 0.5
                    }}>
                      {product.description}
                    </Typography>
                    
                    <Typography sx={{ 
                      color: product.stock > 0 ? '#007600' : 'red',
                      fontSize: '12px',
                      mb: 1
                    }}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #DDD',
                        borderRadius: 1,
                        height: 32
                      }}>
                        <IconButton 
                          onClick={() => handleDecrement(productId)}
                          size="small"
                          sx={{
                            p: '4px',
                            borderRadius: 0,
                            '&:hover': {
                              backgroundColor: '#f3f3f3'
                            }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ 
                          px: 2,
                          borderLeft: '1px solid #DDD',
                          borderRight: '1px solid #DDD',
                          minWidth: '32px',
                          textAlign: 'center'
                        }}>
                          {quantities[productId]}
                        </Typography>
                        <IconButton 
                          onClick={() => handleIncrement(productId)}
                          size="small"
                          sx={{
                            p: '4px',
                            borderRadius: 0,
                            '&:hover': {
                              backgroundColor: '#f3f3f3'
                            }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        '& button': {
                          color: theme.palette.text.primary,
                          fontSize: '12px',
                          textTransform: 'none',
                          p: 0,
                          minWidth: 'auto',
                          '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent',
                          }
                        }
                      }}>
                        <Button onClick={() => handleDelete(productId)}>
                          Delete
                        </Button>
                        <Typography sx={{ color: '#DDD' }}>|</Typography>
                        <Button>Save for later</Button>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ width: 100, textAlign: 'right' }}>
                    <Typography sx={{ 
                      fontWeight: 700,
                      fontSize: '18px',
                      color: '#0F1111'
                    }}>
                      ${(product.price * quantities[productId]).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ 
            backgroundColor: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2c3e50', fontWeight: 600 }}>
              Total: ${total.toFixed(2)}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField 
                label="Full Name" 
                fullWidth 
                margin="normal" 
                required 
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField 
                label="Email" 
                type="email" 
                fullWidth 
                margin="normal" 
                required 
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField 
                label="Address" 
                fullWidth 
                margin="normal" 
                required 
                multiline
                rows={2}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 8 }}>
                  <TextField label="City" fullWidth margin="normal" required />
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <TextField label="Postal Code" fullWidth margin="normal" required />
                </Grid>
              </Grid>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Place Order
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
