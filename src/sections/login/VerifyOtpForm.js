import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useMutation } from '@tanstack/react-query';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { verify_otp } from '../../api/auth';
import { useAuth } from '../../hooks/use-auth';

const VerifyOtpForm = ({
  values
}) => {
  const { user, storeUser, redirectUser, } = useAuth();

  const { isLoading, error, data, mutate, } = useMutation({
    mutationFn: verify_otp,
    enabled: false,
    onSuccess: async (data, vars, ctx) => {
      const userData = data?.data?.data;
      if (!!userData) {
        storeUser(userData);
        await redirectUser(userData?.user);
      }
    },
  });

  const defaultValues = {
    ...values,
    code: '',
  };

  const schema = yup.object().shape({
    code: yup.string().matches(/[0-9]{6}/, 'Code is not valid'),
  });

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const otpRef = useRef(null);

  useEffect(() => {
    if (error) {
      setError('code',
        { type: 'manual', message: 'Invalid OTP code! Try again.' },
        { shouldFocus: false, }
      );
      setValue('code', '');
      otpRef.current?.children?.[0]?.children?.[0]?.children?.[0]?.focus();
    }
  }, [error, setError]);

  const onSubmit = ({ code }) => mutate({ code, otp_token: user?.otp_token });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, }}>Type your 6 digit security code</Typography>
      <FormControl
        fullWidth
        sx={{ mb: 4 }}
      >
        <Controller
          name='code'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur, } }) => (
            <MuiOtpInput
              autoFocus
              ref={otpRef}
              value={value}
              length={6}
              validateChar={(c) => !isNaN(c)}
              onBlur={onBlur}
              onChange={onChange}
              type="number"
              onComplete={handleSubmit(onSubmit)}
              error={errors.code}
            />
          )}
        />
        {errors.code && <FormHelperText sx={{ color: 'error.main' }}>{errors.code.message}</FormHelperText>}
      </FormControl>
      <LoadingButton fullWidth loading={isLoading} type='submit' variant='contained' sx={{ mt: 4 }}>
        Verify
      </LoadingButton>
    </form>
  );
};

export default VerifyOtpForm;
