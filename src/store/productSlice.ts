import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

// Add the Category interface here
interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductState {
  products: Product[];
  categories: Category[]; // Ensure this is an array of Category
  filters: {
    category: string;
    sortBy: string;
    searchTerm: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  filteredItems: Product[];
}

const initialState: ProductState = {
  products: [],
  categories: [],
  filters: {
    category: '',
    sortBy: '',
    searchTerm: '',
    brand: '',
    inStock: undefined,
  },
  status: 'idle',
  error: undefined,
  filteredItems: [],
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products; // dummyjson returns { products: [...] }
});

export const fetchCategories = createAsyncThunk<Category[]>('products/fetchCategories', async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  const categories = await response.json();
  return categories
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
        state.products = action.payload;
        applyFilters(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

const applyFilters = (state: ProductState) => {
  let filtered = state.products;

  // Filter by category slug
  if (state.filters.category) {
    filtered = filtered.filter(item => item.category === state.filters.category);
  }

  // Filter by brand
  if (state.filters.brand) {
    filtered = filtered.filter(item => item.brand === state.filters.brand);
  }

  // Filter by in-stock status
  if (state.filters.inStock) {
    filtered = filtered.filter(item => item.stock > 0);
  }

  // Sort the filtered items
  if (state.filters.sortBy) {
    filtered.sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'asc':
          return a.price - b.price;
        case 'desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        default:
          return 0;
      }
    });
  }

  // Filter by search term
  if (state.filters.searchTerm) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(state.filters.searchTerm.toLowerCase())
    );
  }

  // Update the filtered items in the state
  state.filteredItems = filtered;
};

export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
