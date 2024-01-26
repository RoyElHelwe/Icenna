import Box from '@mui/material/Box';
import Customizer from '../components/customizer';
import { BlankLayoutWrapper } from './BlankLayout';
import { TopNav } from './components/top-nav';
import { LandingFooter } from './components/LandingFooter';

const ConfirmLoginLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <TopNav withTabs={false} />
      <Box className='app-content'
        sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
      <Box sx={{ bgcolor: '#0F4B64' }}>
        <LandingFooter  />
      </Box>
    </BlankLayoutWrapper>
  );
}

export default ConfirmLoginLayout;
