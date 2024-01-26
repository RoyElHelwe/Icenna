import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { TOP_NAV_HEIGHT } from './top-nav';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageButton from 'src/components/languageButton';
import { useSettings } from 'src/hooks/useSettings';
import { useTranslation } from 'react-i18next';

export const LandingTopNav = ({ withTabs, ...rest }) => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV;
  const { t } = useTranslation();
  const pages = [
    {
      name: 'Price',
      href: '/pricing',
    },
    {
      name: 'Feature',
      href: '/feature',
    },
    {
      name: 'Support',
      href: '/support',
    }, {
      name: 'Contact',
      href: '/contact',
    },
  ]
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const {settings} = useSettings();

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
        direction: `${settings?.language == 'ar' ? 'rtl' : 'ltr'}`,
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Image */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/">
              <Image src="/assets/logo/png-01.png" alt="iCenna" width={150} height={150} style={{ width: 150, height: 50 }} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: { md: 1 }, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: 'none' }} href={page.href}>
                    <Typography textAlign="center">
                      {t(page.name)}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
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
          <Box sx={{ justifyContent: 'center', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link style={{ textDecoration: 'none' }} href={page.href}>
                  <Typography>{t(page.name)}</Typography>
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display:'flex' }}>
            {/* <LanguageButton /> */}
            {/* <Button color="primary" sx={{ color: 'black' }}>
              <Link style={{ textDecoration: 'none' }} href="/login">
                <Typography>{t("Login")}</Typography>
              </Link>
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

LandingTopNav.propTypes = {
  withTabs: PropTypes.bool,
};
