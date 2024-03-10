import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './theme';
import Navbar from 'src/components/navigation/Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartDrawer from 'src/components/cartDrawer';
import { CartProvider } from './context/cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer theme="dark" />
          <Box padding="4rem">
            <Outlet />
          </Box>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
