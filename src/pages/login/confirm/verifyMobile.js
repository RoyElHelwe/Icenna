import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from '../../../components/auth-card';
import { useAuth } from '../../../hooks/use-auth';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';
import VerifyOtpForm from '../../../sections/login/VerifyOtpForm';

const ConfirmLogin = () => {
  const { user, } = useAuth();
  const { mobile_no, } = user;

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Verify your mobile number 💬
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: 700 }}>{`${'*'.repeat(mobile_no.length - 4)}${mobile_no.slice(-4)}`}</Typography>
          </Box>
          <VerifyOtpForm />
        </CardContent>
      </Card>
    </Box>
  );
};

ConfirmLogin.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default ConfirmLogin;
