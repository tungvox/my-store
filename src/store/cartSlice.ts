import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          name: action.payload.title,
          image: action.payload.thumbnail,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; removeAll?: boolean }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.removeAll) {
          state.items.splice(index, 1);
        } else if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        }
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
