import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Layout from './components/Layout';
import { store } from './store/store';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;