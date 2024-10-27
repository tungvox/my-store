import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  CardMedia,
  styled 
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid version 2
import { Product } from '../types/types';

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryCardProps {
  category: Category;
  products: Product[];
}

const StyledCategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledProductImage = styled(CardMedia)<{ component: string }>(({ theme }) => ({
  height: 140,
  objectFit: 'contain',
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CategoryCard: React.FC<CategoryCardProps> = ({ category, products }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/products/${category.slug}`);
  };

  // Get first 4 products of the category to display as preview
  const previewProducts = products.slice(0, 4);

  return (
    <StyledCategoryCard onClick={handleCategoryClick}>
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            textTransform: 'capitalize',
            fontWeight: 600,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {category.name}
          <Typography 
            component="span" 
            variant="body2" 
            color="text.secondary"
          >
            {products.length} items
          </Typography>
        </Typography>
        
        <Grid container spacing={1}>
          {previewProducts.map((product) => (
            <Grid size={{xs:6}} key={product.id}>
              <Box 
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: 'background.paper',
                }}
              >
                <StyledProductImage
                  component="img"
                  image={product.thumbnail}
                  title={product.title}
                />
                {product.discountPercentage > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'error.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    -{product.discountPercentage.toFixed(0)}%
                  </Box>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              >
                {product.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCategoryCard>
  );
};

export default CategoryCard;
