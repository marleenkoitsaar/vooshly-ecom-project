import { Button, ThemeProvider } from '@mui/material';
import { lightTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Button variant="contained">Click me</Button>
    </ThemeProvider>
  );
}

export default App;
