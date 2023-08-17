import { TabContext, TabList } from '@mui/lab';
import {
  AppBar,
  Avatar,
  Stack,
  Tab,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { usePopover } from '../../hooks/use-popover';
import Translations from '../../components/Translations';
import { navItems } from '../config';
import { AccountPopover } from './account-popover';

export const TOP_NAV_HEIGHT = 60;

export const TopNav = ({ withTabs, ...rest }) => {
  const accountPopover = usePopover();
  const auth = useAuth();

  const router = useRouter();
  const pathname = router.pathname;
  const [value, setValue] = useState('0');

  useEffect(() => {
    const index = navItems.findIndex((i) => pathname === i.path);
    if (index !== -1) {
      setValue(String(index));
    }
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        boxShadow: 3,
      }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 6,
        }}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={35}>
          <Typography variant="h3">iCenna</Typography>
          {(withTabs ?? true) && (
            <TabContext value={value}>
              <TabList onChange={handleChange} sx={{ minHeight: TOP_NAV_HEIGHT, display: 'flex', alignItems: 'flex-end', }}>
                {navItems.map((item, i) => (
                  <Tab
                    key={i}
                    value={String(i)}
                    label={<Translations text={item.title} />}
                    component={NextLink}
                    icon={item.icon}
                    iconPosition="start"
                    href={item.path}
                    sx={{ textTransform: 'none', }}
                  />
                ))}
              </TabList>
            </TabContext>
          )}
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}>
          <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{
              cursor: 'pointer',
              height: 50,
              width: 50,
            }}
            src={auth.user?.image ?? "/assets/errors/error-401.png"}
          />
        </Stack>
      </Stack>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </AppBar>
  );
};

TopNav.propTypes = {
  withTabs: PropTypes.bool,
};
