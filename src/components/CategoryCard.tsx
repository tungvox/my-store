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
import Grid from '@mui/material/Grid2'; 
import { Product } from '../types/types';
import theme from '../theme';

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
  backgroundColor: 'white',
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
                  overflow: 'hidden',
                  position: 'relative',
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
                      backgroundColor: theme.palette.error.main,
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '32px',
                    }}
                  >
                    -{Number(product.discountPercentage.toFixed(2)) < 1 ? product.discountPercentage.toFixed(2) : product.discountPercentage.toFixed(0)}%
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
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
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
