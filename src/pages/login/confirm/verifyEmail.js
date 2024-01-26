import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from '../../../components/auth-card';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';
import VerifyOtpForm from '../../../sections/login/VerifyOtpForm';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmLogin = () => {
  const {t} = useTranslation();
  return (
    <Box sx={{ minHeight: '100vh', mt: 20 }}>
      <Box sx={{ position: 'absolute', inset: 0, top:40, display: 'flex', filter: 'blur(18px)',  justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image src="/assets/logo/png-01.png" alt="Auth" width={1080} height={720} style={{
          transform: 'rotate(90deg)',
          width: '700px',
          height: '300px',
          userSelect:'none'
        }} />
      </Box>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
      >
        <Card sx={{ zIndex: 1, width: '400px', boxShadow: 20, borderRadius: 3 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8 }}>
              <Typography variant='h5'
                sx={{ mb: 2 }}>
                {t("Verify your email")} ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("We sent a verification code to your Email. Enter the code from the email in the field below.")}
              </Typography>
            </Box>
            <VerifyOtpForm />
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

ConfirmLogin.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default ConfirmLogin;
