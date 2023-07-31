import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Translations from 'src/components/Translations';
import { bottomItems } from '../config';

export const BOTTOM_NAV_HEIGHT = 56;

export const BottomNav = (props) => {
  const pathname = usePathname();

  const [value, setValue] = useState(bottomItems.findIndex((i) => pathname === i.path));

  return (
    <Paper sx={{
      width: '100%',
      minHeight: BOTTOM_NAV_HEIGHT,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
      elevation={5}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {
          bottomItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={<Translations text={item.title} />}
              icon={item.icon}
              component={NextLink}
              href={item.path}
            />
          ))
        }
      </BottomNavigation>
    </Paper>
  );
};

BottomNav.propTypes = {
  onNavOpen: PropTypes.func
};
