import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './theme';
import Navbar from 'src/components/navigation/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Navbar />
      <Box padding="4rem">
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
