import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    category: string;
    sortBy: string;
  };
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  filters: {
    category: '',
    sortBy: '',
  },
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        applyFilters(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

const applyFilters = (state: ProductState) => {
  let filtered = state.items;

  if (state.filters.category) {
    filtered = filtered.filter(item => item.category === state.filters.category);
  }

  if (state.filters.sortBy) {
    filtered.sort((a, b) => {
      if (state.filters.sortBy === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  state.filteredItems = filtered;
};

export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
