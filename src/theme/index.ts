import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#78A083',
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
