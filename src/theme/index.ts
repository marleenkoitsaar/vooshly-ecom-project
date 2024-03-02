import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    dark: {
      main: '#000',
      contrastText: '#fff',
    },
    white: {
      main: '#fff',
    },
  },
});
