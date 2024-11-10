import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Autocomplete, 
  TextField, 
  Box, 
  FormControlLabel, 
  Checkbox,
  Typography 
} from '@mui/material';
import { RootState } from '../store/store';
import { setFilter } from '../store/productSlice';
import { Product } from '../types/types';

interface SortOption {
  label: string;
  value: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface BrandOption {
  label: string;
  value: string;
  key: string
}

interface SubcategoryOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Discount: High to Low', value: 'discount' },
];

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.products.filters);

  const brands: BrandOption[] = React.useMemo(() => {
    const uniqueBrands = Array.from(new Set(products.map((product: Product) => product.brand)))
      .filter((brand): brand is string => brand !== undefined && brand !== null);
    return uniqueBrands.map((brand, index) => ({
      label: brand,
      value: brand,
      key: `brand-${index}`,
    }));
  }, [products]);

  const categoryOptions: FilterOption[] = React.useMemo(() => 
    categories.map((cat) => ({
      label: cat.slug.charAt(0).toUpperCase() + cat.slug.slice(1),
      value: cat.slug,
    })),
    [categories]
  );

  const handleCategoryChange = useCallback((
    _event: React.SyntheticEvent,
    newValue: FilterOption | null
  ) => {
    console.log('Selected category:', newValue);
    console.log('Setting filter value:', newValue?.value || '');
    dispatch(setFilter({ category: newValue?.value || '' }));
  }, [dispatch]);

  const handleSortChange = useCallback((
    _event: React.SyntheticEvent,
    newValue: SortOption | null
  ) => {
    dispatch(setFilter({ sortBy: newValue?.value || '' }));
  }, [dispatch]);

  const handleBrandChange = useCallback((
    _event: React.SyntheticEvent,
    newValue: FilterOption | null
  ) => {
    dispatch(setFilter({ brand: newValue?.value || '' }));
  }, [dispatch]);

  const handleInStockChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ inStock: event.target.checked }));
  }, [dispatch]);

  const subcategories: SubcategoryOption[] = React.useMemo(() => {
    if (!filters.category) return [];
    
    const categoryProducts = products.filter(product => 
      product.category.toLowerCase() === filters.category.toLowerCase()
    );
    
    const uniqueSubcategories = Array.from(new Set(
      categoryProducts.flatMap(product => product.tags)
        .filter(tag => tag && tag.toLowerCase() !== filters.category.toLowerCase())
    ));

    return uniqueSubcategories
      .filter(Boolean) 
      .map(tag => ({
        label: tag,
        value: tag,
      }));
  }, [products, filters.category]);

  const handleSubcategoryChange = useCallback((
    _event: React.SyntheticEvent,
    newValue: SubcategoryOption | null
  ) => {
    console.log('Selected subcategory:', newValue);
    dispatch(setFilter({ subcategory: newValue?.value || '' }));
  }, [dispatch]);

  if (products.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography>Loading filters...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <Autocomplete
        key='category-autocomplete'
        options={categoryOptions}
        getOptionLabel={(option) => option.label || ''}
        value={categoryOptions.find(cat => cat.value === filters.category) || null}
        onChange={handleCategoryChange}
        renderInput={(params) => <TextField {...params} label="Category" />}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.value}>
            {option.label}
          </Box>
        )}
      />
      
      {filters.category && (
        <Autocomplete
          key='subcategory-autocomplete'
          options={subcategories}
          getOptionLabel={(option) => option.label || ''}
          value={subcategories.find(sub => sub.value === filters.subcategory) || null}
          onChange={handleSubcategoryChange}
          renderInput={(params) => <TextField {...params} label="Subcategory" />}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.value}>
              {option.label}
            </Box>
          )}
        />
      )}

      <Autocomplete
        key='brand-autocomplete'
        options={brands}
        getOptionLabel={(option) => option.label || ''}
        value={brands.find(b => b.value === filters.brand) || null}
        onChange={handleBrandChange}
        renderInput={(params) => <TextField {...params} label="Brand" />}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.key}>
            {option.label}
          </Box>
        )}
      />

      <Autocomplete
        key='sortby-autocomplete'
        options={sortOptions}
        getOptionLabel={(option) => option.label || ''}
        value={sortOptions.find(opt => opt.value === filters.sortBy) || null}
        onChange={handleSortChange}
        renderInput={(params) => <TextField {...params} label="Sort By" />}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.value}>
            {option.label}
          </Box>
        )}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStock ?? false}
            onChange={handleInStockChange}
          />
        }
        label="In Stock Only"
      />
    </Box>
  );
};

export default Filters;
