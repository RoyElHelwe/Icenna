import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const LinkTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  textDecoration: 'none',
}));

export const LandingFooter = ({ withTabs, website, ...rest }) => {
  return (
    <Box
      component="footer"
      sx={{
        pb: 5,
        backdropFilter: 'blur(2px)',
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
      }}>
      <Box sx={{ mx: 6 }}>
        <Grid container sx={{ py: 5, gap: 5, }}>
          <Grid item xs={4} lg={1}>
            <LinkTypography
              component={NextLink}
              target="_blank"
              href={website?.social_links?.find((l) => l.name === 'twitter')?.url ?? ''}
            >
              Twitter
            </LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography
              component={NextLink}
              target="_blank"
              href={website?.social_links?.find((l) => l.name === 'linkedin')?.url ?? ''}
            >
              Linkedin
            </LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography
              component={NextLink}
              target="_blank"
              href={website?.social_links?.find((l) => l.name === 'instagram')?.url ?? ''}
            >
              Instagram
            </LinkTypography>
          </Grid>
          <Grid item xs={4} lg={1}>
            <LinkTypography
              component={NextLink}
              target="_blank"
              href={website?.social_links?.find((l) => l.name === 'maroof')?.url ?? ''}
            >
              Maroof
            </LinkTypography>
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
