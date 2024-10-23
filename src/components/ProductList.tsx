import React from 'react';
import { Grid } from '@mui/material';
import { Product } from '../types/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={3} md={2}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
