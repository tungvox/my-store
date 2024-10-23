import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField, Box } from '@mui/material';
import { RootState } from '../store/store';
import { setFilter } from '../store/productSlice';

const categories = [
  { label: 'All', value: '' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Jewelery', value: 'jewelery' },
  { label: 'Men\'s Clothing', value: 'men\'s clothing' },
  { label: 'Women\'s Clothing', value: 'women\'s clothing' },
];

const sortOptions = [
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
];

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector((state: RootState) => state.products.filters);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: { label: string, value: string } | null) => {
    dispatch(setFilter({ category: newValue?.value || '' }));
  };

  const handleSortChange = (event: React.SyntheticEvent, newValue: { label: string, value: string } | null) => {
    dispatch(setFilter({ sortBy: newValue?.value || '' }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
      <Autocomplete
        options={categories}
        value={categories.find(cat => cat.value === category) || null}
        onChange={handleCategoryChange}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Autocomplete
        options={sortOptions}
        value={sortOptions.find(opt => opt.value === sortBy) || null}
        onChange={handleSortChange}
        renderInput={(params) => <TextField {...params} label="Sort By" />}
      />
    </Box>
  );
};

export default Filters;
