import { styled } from '@mui/material/styles';
import { BOTTOM_NAV_HEIGHT } from './bottom-nav';
import { TOP_NAV_HEIGHT } from './top-nav';

export const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: `${TOP_NAV_HEIGHT}px`,
  paddingBottom: `${BOTTOM_NAV_HEIGHT + 5}px`,
}));
