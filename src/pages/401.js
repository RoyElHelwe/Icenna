import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import BlankLayout from '../layouts/BlankLayout';

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw',
  },
}));

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>401</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            You are not authorized! 🔐
          </Typography>
          <Typography variant='body2'>You don&prime;t have permission to access this page. Go Home!</Typography>
        </BoxWrapper>
        <Button href='/' component={Link} variant='contained' sx={{ mt: 5, px: 5.5 }}>
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}

Error401.getLayout = (page) => (<BlankLayout>{page}</BlankLayout>);

Error401.authGuard = false;

export default Error401;
