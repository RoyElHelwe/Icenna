import LoadingButton from '@mui/lab/LoadingButton';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { getTerms } from '../../../api/get-terms';
import { useAuth } from '../../../hooks/use-auth';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';

export const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
  [theme.breakpoints.up('md')]: { width: '50rem' },
}));

const AcceptTerms = () => {
  const { user, acceptTerms } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['terms_and_conditions', user.terms_and_conditions_id],
    queryFn: getTerms,
  })

  const onSubmit = (e) => {
    acceptTerms({ user_id: user.email, id: user.terms_and_conditions_id, }, () => {
      // TODO: show error Toast
      console.log('Error');
    })
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            {isLoading && (
              <Skeleton height="200px" />
            )}
            {!isLoading && data?.data?.data?.terms && (
              parse(data.data.data.terms)
            )}
            <Divider sx={{ my: theme => `${theme.spacing(3)} !important` }} />
            <Typography sx={{ color: 'text.secondary' }}>
              Do you accept our terms and conditions?
            </Typography>
          </Box>
          <LoadingButton fullWidth
            loading={isLoading}
            variant='contained'
            sx={{ mt: 2 }}
            onClick={onSubmit}>
            Accept Terms
          </LoadingButton>
        </CardContent>
      </Card>
    </Box >
  );
};

AcceptTerms.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default AcceptTerms;
