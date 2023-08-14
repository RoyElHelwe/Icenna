import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Card } from '../../components/auth-card';
import { useAuth } from '../../hooks/use-auth';
import { useSettings } from '../../hooks/useSettings';
import BlankLayout from '../../layouts/BlankLayout';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const defaultValues = {
  email: '',
};

const Login = (props) => {
  const auth = useAuth();
  const { settings } = useSettings();

  const login = (params) => {
    auth.login(params, () => {
      setError('email', {
        type: 'manual',
        message: 'Unable to sign-on! Try again later.'
      });
    });
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => login({ email: data.email });

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5'
              sx={{ fontWeight: 600, mb: 1.5 }}>
              Welcome! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-on to your account</Typography>
          </Box>

          <GoogleLogin
            text="continue_with"
            size='large'
            theme={settings.mode === 'dark' ? 'filled_black' : 'outline'}
            onSuccess={(credentialResponse) => login({ auth_token: credentialResponse.credential, device_type: 'WEB', from_google: 1, })}
            onError={() => {
              console.log('Login with Goggle failed!');
            }}
            useOneTap={false}
          />
          <Divider sx={{ my: theme => `${theme.spacing(3)} !important` }}>or</Divider>
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
                    onChange={onChange}
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
              loading={auth.loading}
              sx={{
                mb: 1,
                mt: 1,
              }}>
              Continue with us
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
};

Login.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Login.guestGuard = true;

export default Login;
