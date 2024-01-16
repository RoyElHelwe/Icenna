import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { parseBody } from "next/dist/server/api-utils/node";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'url';
import * as yup from 'yup';
import { login } from '../../api/auth';
import { Card } from '../../components/auth-card';
import { useAuth } from '../../hooks/use-auth';
import { useSettings } from '../../hooks/useSettings';
import ConfirmLoginLayout from '../../layouts/confirm-login-layout';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const defaultValues = {
  email: '',
};

const Login = ({ auth_token }) => {
  const auth = useAuth();
  const { settings } = useSettings();
  const router = useRouter();

  const [error, setError] = useState(null);

  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    enabled: false,
    onSuccess: async (data, vars, ctx) => {
      const userData = data?.data?.data;
      if (!!userData) {
        auth.storeUser(userData);
        await auth.redirectUser(userData?.user);
      } else {
        setError("Couldn't sign in! Try again later.");
      }
    },
    onError: (err, vars, ctx) => {
      setError(err?.response?.data?.message ?? "Internal server error!");
    }
  });

  if (!auth.loading && !isLoading && !!auth_token) {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      mutate({ auth_token, device_type: 'WEB', from_google: 1, });
      router.replace('/login');
    });
  }

  const {
    control,
    handleSubmit,
    formState: { errors, },
  } = useForm({
    defaultValues, mode: 'onSubmit', resolver: yupResolver(schema),
  });

  const [continueWithUs, setContinueWithUs] = useState(false);

  const onSubmit = (data) => mutate({ email: data.email, device_type: 'WEB', });

  return (
    <Box className='content-center'>
      {/* <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5'
              sx={{ fontWeight: 600, mb: 1.5 }}>
              Welcome! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-on to your account</Typography>
            {error && (
              <Alert severity="error" sx={{ mt: 2, }}>{error}</Alert>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Box flex={1}>
              <GoogleLogin
                text="continue_with"
                size='large'
                theme={settings.mode === 'dark' ? 'filled_black' : 'outline'}
                locale={settings.language || 'en'}
                ux_mode='redirect'
                login_uri={format({ pathname: `${window.location.origin}/api/login`, query: router.query, })}
                useOneTap={false}
              />
            </Box>
            {(!!auth_token || (isLoading && !continueWithUs)) && <CircularProgress size="1.8rem" />}
          </Box>

          <Divider sx={{ my: theme => `${theme.spacing(3)} !important` }}>or</Divider>

          {!continueWithUs && (
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ my: 1, }}
              onClick={() => setContinueWithUs(true)}
            >
              Continue With Us
            </Button>
          )}

          {continueWithUs && (
            <form noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth
                sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      type='email'
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => {
                        setError(null);
                        onChange(e);
                      }}
                      error={Boolean(errors.email)}
                      placeholder='john@company.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                loading={isLoading}
                sx={{ my: 1, }}
              >
                Sign in
              </LoadingButton>
            </form>
          )}
        </CardContent>
      </Card> */}
    </Box>
  )
};

Login.guestGuard = true;

Login.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

Login.getInitialProps = async ({ req, }) => {
  if (req?.method !== 'POST') {
    return { auth_token: null, };
  }

  const body = await parseBody(req, '1mb');

  return {
    auth_token: body?.credential ?? null,
  };
};

export default Login;
