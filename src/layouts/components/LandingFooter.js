import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const LinkTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  textDecoration: 'none',
}));

export const LandingFooter = ({ withTabs, ...rest }) => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV;

  return (
    <Box
      component="footer"
      sx={{
        pb: 5,
        backdropFilter: 'blur(2px)',
        backgroundColor: (theme) => alpha(
          theme.palette.customColors[env] ?? theme.palette.background.paper,
        ),
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
      }}>
      <Box sx={{ mx: 6 }}>
        <Grid container sx={{ py: 5, gap: 5, }}>
          <Grid item xs={4} lg={1}>
            <LinkTypography component={NextLink} target="_blank" href="https://twitter.com/icenna_com">Twitter</LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography component={NextLink} target="_blank" href="https://www.linkedin.com/company/icenna/about/">Linkedin</LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography component={NextLink} target="_blank" href="https://www.instagram.com/icenna_com/">Instagram</LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography component={NextLink} target="_blank" href="https://maroof.sa/businesses/details/54371">Maroof</LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography component={NextLink} href="/contact">Contact</LinkTypography>
          </Grid>
          <Grid item xs={4} lg={2}>
            <LinkTypography component={NextLink} href="/tc">Terms and Conditions</LinkTypography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">© iCenna</Typography>
        <Typography variant="subtitle1">AviCenna for Information Technology | Commercial Registration: 4030497928</Typography>
        <Typography variant="subtitle1">شركة افي سينا لتقنية المعلومات | سجل تجاري 4030497928</Typography>
      </Box>
    </Box>
  );
};

LandingFooter.propTypes = {
  withTabs: PropTypes.bool,
};
