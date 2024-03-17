import { Box, ThemeProvider, styled } from '@mui/material';
import { lightTheme } from './theme';
import Navbar from 'src/components/navigation/Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartDrawer from 'src/components/cartDrawer';
import { CartProvider } from './context/cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from 'src/components/allProducts';
import Footer from 'src/components/footer';

const queryClient = new QueryClient();

const StyledBox = styled(Box)`
  min-height: calc(100vh - 65px);
  padding: 4rem;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer theme="dark" />
          <StyledBox>
            <AllProducts />
            <Outlet />
          </StyledBox>
          <Footer />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
