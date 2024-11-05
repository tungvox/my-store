import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

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
    <div>
      <Typography variant="h6">Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.title}
              secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
            />
            <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
            <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
            <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
      <Button component={Link} to="/checkout" variant="contained" color="primary">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
