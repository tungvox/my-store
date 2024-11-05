import React from "react";
import { Box, } from "@mui/material";
import Grid from "@mui/material/Grid2"; 
import { Product } from "../types/types";
import CategoryCard from "./CategoryCard";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryListProps {
  products: Product[];
  categories: Category[]; 
  productsByCategory: Record<string, Product[]>;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  productsByCategory,
}) => {
  return (
    <Box sx={{ py: 4, maxWidth: '1400px', mx: 'auto' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          px: { xs: 2, md: 4 },
          mb: 6,
          justifyContent: 'center',
        }}
      >
        {categories
          .filter((category) => productsByCategory[category.slug]?.length > 0)
          .map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={category.slug}>
              <Box sx={{ height: '100%', p: 1 }}>
                <CategoryCard
                  category={category}
                  products={productsByCategory[category.slug]}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;
