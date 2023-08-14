import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Card } from '../../../components/auth-card';
import { useAuth } from '../../../hooks/use-auth';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';

const phoneRegExp = /^[+]((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const defaultValues = {
  mobile: '',
};

const ConfirmLogin = () => {
  const { user, loading, addMobile } = useAuth();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const { mobile, } = values;
    addMobile({ id: user.email, mobile_no: mobile, }, () => {
      setError('email', {
        type: 'manual',
        message: 'Unable to add mobile! Try again later.'
      });
    });
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5'
              sx={{ mb: 2 }}>
              Add your mobile number
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Please add a mobile number to continue.
            </Typography>
          </Box>
          <form noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth
              sx={{ mb: 4 }}>
              <Controller
                name='mobile'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <MuiTelInput
                    label='Mobile number'
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.mobile)}
                  />
                )}
              />
              {errors.mobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>}
            </FormControl>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={loading}
              sx={{
                mb: 1,
                mt: 1,
              }}>
              Submit mobile
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

ConfirmLogin.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default ConfirmLogin;
