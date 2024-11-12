import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Alert, CircularProgress } from '@mui/material';
import { RootState, AppDispatch } from '../store/store';
import Filters from '../components/Filters';
import ProductList from '../components/ProductList';
import { setFilter, fetchProducts } from '../store/productSlice';
import { Product } from '../types/types';

const FilterSummaryBar = ({ count, filters }: { count: number, filters: any }) => {
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sortBy') return false; 
    return value && value !== '';
  });

  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        py: 1.5,
        px: 2,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {activeFilters.length > 0 ? (
          <>
            {count} {count === 1 ? 'item was' : 'items were'} found with{' '}
            {activeFilters.map(([key, value], index) => (
              <span key={key}>
                {index > 0 && ', '}
                {key === 'searchTerm' ? `search "${value}"` : 
                 key === 'inStock' ? 'in-stock filter' :
                 key === 'category' ? `category "${value}"` :
                 key === 'brand' ? `brand "${value}"` :
                 `${key} "${value}"`}
              </span>
            ))}
          </>
        ) : (
          <>{count} items</>
        )}
      </Typography>
    </Box>
  );
};

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    products,  
    filters,
    status,
    error 
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (category) {
      dispatch(setFilter({ category }));
    } else {
      dispatch(setFilter({ category: '' }));
    }
    dispatch(fetchProducts());
  }, [category, dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product: Product) => {
        const matchesCategory = !filters.category || product.category === filters.category;
        
        const matchesSubcategory = !filters.subcategory || 
          product.tags.includes(filters.subcategory);

        const searchLower = filters.searchTerm?.toLowerCase() || '';
        const matchesSearch = !filters.searchTerm || 
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          (product.brand ? product.brand.toLowerCase().includes(searchLower) : false);

        const matchesBrand = !filters.brand || 
          (product.brand ? product.brand === filters.brand : false);
        
        const matchesMinPrice = !filters.minPrice || product.price >= filters.minPrice;
        const matchesMaxPrice = !filters.maxPrice || product.price <= filters.maxPrice;
        const matchesStock = !filters.inStock || product.stock > 0;

        return matchesCategory && 
               matchesSubcategory && 
               matchesSearch && 
               matchesBrand && 
               matchesMinPrice && 
               matchesMaxPrice && 
               matchesStock;
      })
      .sort((a: Product, b: Product) => {
        switch (filters.sortBy) {
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
  }, [products, filters]);

  if (status === 'loading') {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          {error || 'Failed to load products. Please try again later.'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 3, 
      p: 2,
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        width: 280, 
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        position: 'sticky',
        top: 16,
        alignSelf: 'flex-start',
        maxHeight: 'calc(100vh - 32px)',
        overflowY: 'auto'
      }}>
        <Filters />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {filteredProducts.length > 0 && (
          <FilterSummaryBar 
            count={filteredProducts.length}
            filters={filters}
          />
        )}

        {filteredProducts.length === 0 ? (
          <Alert severity="info">
            No products found matching your criteria. Try adjusting your filters.
          </Alert>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
