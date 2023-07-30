import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../../hooks/use-auth';

const schema = yup.object().shape({
  code: yup.string().matches(/[0-9]{6}/, 'Code is not valid'),
});

const defaultValues = {
  code: '',
};

const VerifyOTP = () => {
  const { user, verifyOTP } = useAuth();
  const { otp_token } = user;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ code }) => {
    verifyOTP({ code, otp_token }, () => {
      // TODO: show error Toast
      setError('code', {
        type: 'manual',
        message: 'Unable to verify code! Try again later.'
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, }}>Type your 6 digit security code</Typography>
      <FormControl fullWidth
        sx={{ mb: 4 }}>
        <Controller
          name='code'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <MuiOtpInput
              value={value}
              length={6}
              validateChar={(c) => !isNaN(c)}
              onBlur={onBlur}
              onChange={onChange}
              error={errors.code}
            />
          )}
        />
        {errors.code && <FormHelperText sx={{ color: 'error.main' }}>{errors.code.message}</FormHelperText>}
      </FormControl>
      <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>
        Verify
      </Button>
    </form>
  );
};

export default VerifyOTP;
