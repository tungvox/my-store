import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(81, 101, 89)', 
    },
    secondary: {
      main: '#516559', 
      dark: '#fff3b0',
    },
    background: {
      paper: 'white', 
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
});

export default theme;

