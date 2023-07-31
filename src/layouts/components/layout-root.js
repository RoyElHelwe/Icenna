import { styled } from '@mui/material/styles';
import { TOP_NAV_HEIGHT } from './top-nav';

export const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: `${TOP_NAV_HEIGHT}px`,
}));
