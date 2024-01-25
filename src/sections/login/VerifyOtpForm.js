import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Input, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useMutation } from '@tanstack/react-query';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { verify_otp } from '../../api/auth';
import { useAuth } from '../../hooks/use-auth';
import OTPInput from 'src/components/otpInput';
import { useSettings } from 'src/hooks/useSettings';

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
    // code must be number and its betwenn 100000 and 999999
    // code: yup.number().integer().min(100000).max(999999).required('Code is required'),

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

  const { settings } = useSettings()
  const otpRef = useRef(null);
  const {
    language,
  } = settings;
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
        sx={{ mb: 4, direction: `${language == 'ar' ? 'rtl !important' : 'ltr !important'}` }}
      >
        <Controller
          name='code'
          control={control}
          rules={{ required: true, valueAsNumber: true }}
          render={({ field: { value, onChange, onBlur, } }) => (
            // <MuiOtpInput
            //   autoFocus
            //   ref={otpRef}
            //   value={value}
            //   length={6}
            //   validateChar={(c) => !isNaN(c)}
            //   onBlur={onBlur}
            //   onChange={onChange}
            //   type="number"
            //   patern="[0-9]*"
            //   inputMode="numeric"
            //   isInpNum={true}
            //   onComplete={handleSubmit(onSubmit)}
            //   error={errors.code}
            // />
            <OTPInput
              inputStyle={{
                width: '3rem', height: '3rem', fontSize: '1.5rem', borderRadius: 4, border: '1px solid rgba(0, 0, 0, 0.3)',
                // screen phone
                '@media (max-width: 600px)': {
                  width: '2rem', height: '2rem', fontSize: '1rem',
                },
              }}
              numInputs={6}
              onChange={onChange}
              renderSeparator={<span>-</span>}
              value={value}
              placeholder={"123456"}
              inputType={"number"}
              renderInput={(props) => <input style={{ width: '100%' }} {...props} />}
              shouldAutoFocus
              onComplete={handleSubmit(onSubmit)}
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
