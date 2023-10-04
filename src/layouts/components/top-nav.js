import MenuIcon from '@mui/icons-material/Menu';
import { TabContext, TabList } from '@mui/lab';
import {
  AppBar,
  Avatar,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Tab,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Translations from '../../components/Translations';
import { useAuth } from '../../hooks/use-auth';
import { usePopover } from '../../hooks/use-popover';
import { useNavItems } from '../../hooks/useNavItems';
import { AccountPopover } from './account-popover';

export const TOP_NAV_HEIGHT = 60;

export const TopNav = ({ withTabs, ...rest }) => {
  const accountPopover = usePopover();
  const tabsPopover = usePopover();
  const auth = useAuth();
  const env = process.env.NEXT_PUBLIC_NODE_ENV;

  const router = useRouter();
  const pathname = router.pathname?.split('/')[1];
  const [value, setValue] = useState('0');
  const navItems = useNavItems();

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  useEffect(() => {
    if (!mdUp && tabsPopover.open) {
      tabsPopover.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdUp]);

  useEffect(() => {
    const index = navItems.findIndex((i) => `/${pathname}` === i.path);
    if (index !== -1) {
      setValue(String(index));
    } else {
      setValue(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          spacing={30}
        >
          <Typography variant="h3">iCenna</Typography>
          {(withTabs ?? true) && mdUp && (
            <TabContext value={value}>
              <TabList
                sx={{ minHeight: TOP_NAV_HEIGHT, display: 'flex', alignItems: 'flex-end', }}
                onChange={handleChange}
              >
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
        {auth.user && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!mdUp && (
              <IconButton
                onClick={tabsPopover.handleOpen}
                ref={tabsPopover.anchorRef}
              >
                <MenuIcon />
              </IconButton>
            )}
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
        )}
      </Stack>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <Popover
        anchorEl={tabsPopover.anchorRef.current}
        open={tabsPopover.open}
        onClose={tabsPopover.handleClose}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
      >
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
          {navItems.map((item, i) => (
            <MenuItem
              key={i}
              component={NextLink}
              href={item.path}
              selected={value === `${i}`}
            >
              <Translations text={item.title} />
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </AppBar >
  );
};

TopNav.propTypes = {
  withTabs: PropTypes.bool,
};
