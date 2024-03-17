import {
  Button,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Container = styled(Stack)`
  width: 75%;
  max-width: 400px;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  margin: auto;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const Contact = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { email, message, name } = state;

  const ref = useRef<HTMLFormElement | null>(null);
  const theme = useTheme();

  function onChange(key: keyof typeof state) {
    return function inner(event: React.ChangeEvent<HTMLInputElement>) {
      return setState((prevState) => {
        return {
          ...prevState,
          [key]: event.target.value,
        };
      });
    };
  }

  function getErrorMessages() {
    return Object.entries(state).reduce((all, [k]) => {
      const key = k as keyof typeof state;
      if (state[key].trim().length === 0) {
        all[key] = `${key} can not be empty`;
        return all;
      }
      return all;
    }, {} as Record<keyof typeof state, string>);
  }

  const {
    name: nameError,
    email: emailError,
    message: messageError,
  } = getErrorMessages() ?? {};

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const promise = emailjs.send(
        'service_jqpe3s3',
        'template_h0g37tw',
        {
          from_name: name,
          message,
          from_email: email,
          reply_to: email,
        },
        {
          publicKey: 'Oi6B8yIdIVEfwjANm',
        }
      );
      toast.promise(promise, {
        error: 'Failed to send message',
        pending: 'Sending email..',
        success: 'Email sent!',
      });
      await promise;

      setState({
        email: '',
        message: '',
        name: '',
      });
    } catch (error) {
      console.log(error);
      // ignore
    }
  }

  return (
    <Container alignItems="center" justifyContent="center">
      <Typography textAlign="center" variant="h5">
        Contact us
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
          width: '100%',
        }}
        ref={ref}
        onSubmit={sendMessage}
      >
        <TextField
          value={name}
          onChange={onChange('name')}
          fullWidth
          error={nameError !== undefined}
          helperText={nameError}
          label="Your Name *"
        />
        <TextField
          value={email}
          onChange={onChange('email')}
          fullWidth
          error={emailError !== undefined}
          helperText={emailError}
          label="Your Email *"
        />
        <TextField
          value={message}
          onChange={onChange('message')}
          multiline
          fullWidth
          error={messageError !== undefined}
          helperText={messageError}
          label="Your Message *"
          minRows={3}
        />
        <Button
          disabled={!!nameError || !!emailError || !!messageError}
          type="submit"
          fullWidth
          variant="contained"
        >
          Send
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
