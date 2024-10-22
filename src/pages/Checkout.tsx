import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, TextField, Button, Box } from '@mui/material';
import { RootState } from '../store/store';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission (e.g., send order to backend)
    console.log('Order submitted');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Full Name" fullWidth margin="normal" required />
        <TextField label="Email" type="email" fullWidth margin="normal" required />
        <TextField label="Address" fullWidth margin="normal" required />
        <TextField label="City" fullWidth margin="normal" required />
        <TextField label="Postal Code" fullWidth margin="normal" required />
        <Typography variant="h6" gutterBottom>Total: ${total.toFixed(2)}</Typography>
        <Button type="submit" variant="contained" color="primary">
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;
