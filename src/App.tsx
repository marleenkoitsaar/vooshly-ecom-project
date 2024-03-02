import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './theme';
import Navbar from 'src/components/navigation/Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartDrawer from 'src/components/cartDrawer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <Navbar />
        <CartDrawer />
        <Box padding="4rem">
          <Outlet />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
