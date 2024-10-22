import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { RootState } from '../store/store';
import { setFilter } from '../store/productSlice';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector((state: RootState) => state.products.filters);

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setFilter({ category: event.target.value as string }));
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setFilter({ sortBy: event.target.value as 'asc' | 'desc' }));
  };

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(event) => handleCategoryChange(event as React.ChangeEvent<{ value: unknown }>)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="jewelery">Jewelery</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={(event) => handleSortChange(event as React.ChangeEvent<{ value: unknown }>)}>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Filters;
