import Box from '@mui/material/Box';
import { BlankLayoutWrapper } from './BlankLayout';
import { LandingFooter } from './components/LandingFooter';
import { LandingTopNav } from './components/LandingTopNav';
import { TOP_NAV_HEIGHT } from './components/top-nav';

const LandingLayout = ({ website, children }) => {
  return (
    <>
      <BlankLayoutWrapper>
        <LandingTopNav />
        <Box sx={{ minHeight: '100vh', overflowX: 'hidden', bgcolor: 'background.paper', mt: `${TOP_NAV_HEIGHT}px`, px: 5, pb: 5, }}>
          {children}
        </Box>
        <Box sx={{ bgcolor: '#0F4B64' }}>
          <LandingFooter website={website} />
        </Box>
      </BlankLayoutWrapper>
    </>
  );
}

export default LandingLayout;
