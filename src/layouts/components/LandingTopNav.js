import {
  AppBar,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { TOP_NAV_HEIGHT } from './top-nav';

const LinkTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
}));

export const LandingTopNav = ({ withTabs, ...rest }) => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV;

  return (
    <AppBar
      component="header"
      sx={{
        backdropFilter: 'blur(2px)',
        backgroundColor: (theme) => alpha(
          theme.palette.customColors[env] ?? theme.palette.background.paper, 0.8
        ),
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
      }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          mx: 6,
        }}>

        <LinkTypography
          variant="h3"
          component={NextLink}
          href="/"
        >
          iCenna
        </LinkTypography>

        <Stack alignItems="center" direction="row" spacing={2}>
          {/* <Button
            variant="contained"
            sx={{ mx: 8 }}
            component={NextLink}
            href={'/login'}
          >
            Login
          </Button> */}
        </Stack>
      </Stack>
    </AppBar>
  );
};

LandingTopNav.propTypes = {
  withTabs: PropTypes.bool,
};
