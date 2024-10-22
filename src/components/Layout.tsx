import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              My Store
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/checkout" startIcon={<ShoppingCartIcon />}>
            Cart ({cartItemsCount})
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
