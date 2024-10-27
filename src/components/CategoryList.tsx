import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid version 2
import { Product } from '../types/types';
import CategoryCard from './CategoryCard';

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryListProps {
  products: Product[];
  categories: Category[]; // Ensure this is an array of Category
  productsByCategory: Record<string, Product[]>;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, productsByCategory }) => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        Browse Categories
      </Typography>
      
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          px: { xs: 2, md: 4 },
          mb: 6
        }}
      >
        {categories.map((category) => ( // Use categories directly
          <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={category.slug}>
            <CategoryCard 
              category={category} 
              products={productsByCategory[category.slug] || []}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;
