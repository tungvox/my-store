import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
