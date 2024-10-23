import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, Box, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RootState } from '../store/store';
import ProductCard from '../components/ProductCard';
import { addToCart, removeFromCart } from '../store/cartSlice';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate quantities
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
    dispatch(removeFromCart(Number(productId)));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission (e.g., send order to backend)
    console.log('Order submitted');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      
      {/* Cart Summary */}
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.keys(quantities).map((productId) => {
          const product = cartItems.find(item => item.id.toString() === productId);
          if (!product) return null;
          return (
            <Grid item xs={12} sm={6} md={4} key={productId}>
              <ProductCard product={product} isCheckout={true} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                <IconButton onClick={() => handleDecrement(productId)} size="small">
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 2 }}>
                  Quantity: {quantities[productId]}
                </Typography>
                <IconButton onClick={() => handleIncrement(productId)} size="small">
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h6" gutterBottom>Total: ${total.toFixed(2)}</Typography>

      {/* Existing form */}
      <form onSubmit={handleSubmit}>
        <TextField label="Full Name" fullWidth margin="normal" required />
        <TextField label="Email" type="email" fullWidth margin="normal" required />
        <TextField label="Address" fullWidth margin="normal" required />
        <TextField label="City" fullWidth margin="normal" required />
        <TextField label="Postal Code" fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;
