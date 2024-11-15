import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import theme from '../theme';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart({ id, removeAll: true }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart({ id, removeAll: true }));
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
    }}>
      <Typography variant="h6">Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
          }}>
            <ListItemText
              primary={item.title}
              secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
              <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
              <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{
        marginTop: theme.spacing(2),
        fontWeight: 'bold',
      }}>
        Total: ${total.toFixed(2)}
      </Typography>
      <Button
        component={Link}
        to="/checkout"
        variant="contained"
        color="primary"
        sx={{
          marginTop: theme.spacing(3),
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default Cart;
