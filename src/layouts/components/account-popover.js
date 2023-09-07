import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/use-auth';

export const AccountPopover = ({ anchorEl, onClose, open }) => {
  const router = useRouter();
  const auth = useAuth();
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    onClose?.();
    auth.logout(() => {
      console.error('Failed to Sign out! Internal server error.');
    });
  }, [onClose, auth, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'black', }}>
          {t('Account')}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth.user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>
          {t('Sign Out')}
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};