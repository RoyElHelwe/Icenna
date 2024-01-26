import {
  AppBar,
  Avatar,
  Box,
  Container,
  Popover,
  Stack,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { usePopover } from '../../hooks/use-popover';
import { useNavItems } from '../../hooks/useNavItems';
import { AccountPopover } from './account-popover';
import Link from 'next/link';
import Image from 'next/image';
import LanguageButton from 'src/components/languageButton';
import { useSettings } from 'src/hooks/useSettings';


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
  const { settings } = useSettings();
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
        direction: `${settings.language == 'ar' ? 'rtl' : 'ltr'}`
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Image */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/">
              <Image src="/assets/logo/png-01.png" alt="iCenna" width={150} height={150} style={{ width: 150, height: 50 }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1, justifyContent: 'center', widht: '100%' }}>
            <Link href="/">
              <Image
                src="/assets/logo/png-01.png"
                alt="iCenna"
                width={150}
                height={150}
                style={{
                  width: '100%', // Use 100% width for responsiveness
                  height: 'auto', // Maintain aspect ratio

                }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <LanguageButton />
            {(auth.user && router.pathname !== '/login') && (
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
                    height: 50,
                    width: 50,
                  }}
                  src={auth.user?.image ?? "/assets/errors/error-401.png"}
                />
              </Stack>
            )}
          </Box>
        </Toolbar>
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
        </Popover>
      </Container>
    </AppBar>
  );
};

TopNav.propTypes = {
  withTabs: PropTypes.bool,
};
