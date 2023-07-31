import {
  AppBar,
  Avatar,
  Stack,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useAuth } from 'src/hooks/use-auth';
import { usePopover } from 'src/hooks/use-popover';
import Translations from '../../components/Translations';
import { AccountPopover } from './account-popover';

export const TOP_NAV_HEIGHT = 50;

export const TopNav = (props) => {
  const { pageTitle } = props;
  const accountPopover = usePopover();
  const auth = useAuth();

  return (
    <>
      <AppBar
        component="header"
        sx={{
          backdropFilter: 'blur(2px)',
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 3
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 6,
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="h6"><Translations text={pageTitle} /></Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={auth.user.image ?? "/assets/errors/error-401.png"}
            />
          </Stack>
        </Stack>
      </AppBar>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
