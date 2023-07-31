import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from '../../../components/auth-card';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';
import VerifyOTP from '../../../sections/doctor/verify-otp';

const ConfirmLogin = () => {

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5'
              sx={{ mb: 2 }}>
              Verify your email ✉️
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We sent a verification code to your Email. Enter the code from the email in the field below.
            </Typography>
          </Box>
          <VerifyOTP />
        </CardContent>
      </Card>
    </Box>
  );
};

ConfirmLogin.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default ConfirmLogin;
