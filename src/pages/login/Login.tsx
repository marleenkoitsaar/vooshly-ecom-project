import {
  Stack,
  TextField,
  styled,
  useTheme,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser, findUser } from 'src/supabase';

const Container = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${({ theme }) => theme.spacing(2)};
  width: 75%;
  max-width: 400px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Login = () => {
  const theme = useTheme();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [view, setView] = useState<'login' | 'create_user'>('login');

  const { email, password } = state;

  function onChange(name: keyof typeof state) {
    return function inner(event: React.ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;
      return setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  }

  async function handleLogin() {
    const action = view === 'create_user' ? createUser : findUser;
    try {
      await action(email, password);
      toast(view === 'create_user' ? 'User created' : 'Logged in successfully');
    } catch (error) {
      console.log('failed', error);
      toast(error instanceof Error ? error.message : 'Failed to create a user');
    }
  }

  const isEmailEmpty = email.trim().length === 0;
  const isPasswordEmpty = password.trim().length === 0;

  return (
    <Container>
      <Stack gap={theme.spacing(2)} padding={theme.spacing(5)}>
        <Typography variant="h5">
          {view === 'create_user' ? 'Create user' : 'Login'}
        </Typography>
        <TextField
          value={email}
          label="Email"
          onChange={onChange('email')}
          fullWidth
          error={isEmailEmpty}
          helperText={isEmailEmpty ? 'Please enter email' : ''}
        />
        <TextField
          label="Password"
          value={password}
          onChange={onChange('password')}
          type="password"
          fullWidth
          error={isPasswordEmpty}
          helperText={isPasswordEmpty ? 'Please enter password' : ''}
        />

        <Button
          disabled={isEmailEmpty || isPasswordEmpty}
          onClick={handleLogin}
          variant="contained"
        >
          {view === 'create_user' ? 'Create' : 'Login'}
        </Button>
        <Button
          onClick={() =>
            setView((prevView) =>
              prevView === 'create_user' ? 'login' : 'create_user'
            )
          }
        >
          {view === 'create_user'
            ? 'Already have an account?'
            : 'Do not have an account?'}
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
