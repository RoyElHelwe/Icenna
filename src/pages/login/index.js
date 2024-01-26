// material-ui
import { Alert, Box, Button, Card, CardContent, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { useSettings } from 'src/hooks/useSettings';
import ConfirmLoginLayout from 'src/layouts/confirm-login-layout';
import * as yup from 'yup';
import { login } from '../../api/auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import { format } from 'url';
import { LoadingButton } from '@mui/lab';
import LandingLayout from 'src/layouts/LandingLayout';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const defaultValues = {
  email: '',
};

const AuthBackground = ({ auth_token }) => {
  const auth = useAuth();
  const { t } = useTranslation();
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
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const onSubmit = (data) => mutate({ email: data.email, device_type: 'WEB', });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ position: 'absolute', inset: 0, top: 40, display: 'flex', filter: 'blur(18px)', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image src="/assets/logo/png-01.png" alt="Auth" width={1080} height={720} style={{
          transform: 'rotate(90deg)',
          width: '700px',
          height: '300px',
          userSelect: 'none'
        }} />
      </Box>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ zIndex: 10, minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
      >
        <Grid item>
          <Card sx={{ width: '400px', boxShadow: 20, borderRadius: 3 }}>
            <CardContent sx={{ p: theme => `${theme.spacing(6, 9, 7)} !important` }}>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3" sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: '1.5rem',
                    }}>{t("Login")}</Typography>
                  </Stack>
                  {error && (
                    <Alert severity="error" sx={{ mt: 2, }}>{error}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
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
                              label={t('Email')}
                              type='email'
                              value={value}
                              onBlur={onBlur}
                              onChange={(e) => {
                                setError(null);
                                onChange(e);
                              }}
                              size='medium'
                              error={Boolean(errors.email)}
                              placeholder='john@company.com'
                              InputLabelProps={{
                                sx: { color: '#0F4B64' }
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#0F4B64',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#0F4B64',
                                  },
                                  '& label.Mui-focused': {
                                    color: '#0F4B64',
                                  },

                                },
                                '& .MuiInputLabel-root': {
                                  color: '#0F4B64',
                                  '&.Mui-focused': {
                                    color: '#0F4B64',
                                  }
                                },
                              }}
                            />
                          )}
                        />
                        {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                      </FormControl>
                      <LoadingButton
                        fullWidth
                        size='medium'
                        type='submit'
                        variant='contained'
                        loading={isLoading}
                        sx={{ my: 1, backgroundColor: '#0F4B64', '&:hover': { backgroundColor: '#0F4B64' } }}
                      >
                        {t("Sign in")}
                      </LoadingButton>
                    </form>
                    <Grid item xs={12}>
                      <Divider>
                        <Typography variant="caption">{t("Or Login with")}</Typography>
                      </Divider>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                          <GoogleLogin
                            text="continue_with"
                            size='large'
                            theme={settings.mode === 'dark' ? 'filled_black' : 'outline'}
                            locale={settings.language || 'en'}
                            ux_mode='redirect'
                            login_uri={format({ pathname: `${origin}/api/login`, query: router.query, })}
                            useOneTap={false}
                          />
                        </Box>
                        {(!!auth_token || (isLoading && !continueWithUs)) && <CircularProgress size="1.8rem" />}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthBackground;

AuthBackground.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

AuthBackground.authGuard = false