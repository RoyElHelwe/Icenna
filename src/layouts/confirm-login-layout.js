import Box from '@mui/material/Box';
import Customizer from '../components/customizer';
import { BlankLayoutWrapper } from './BlankLayout';
import { TopNav } from './components/top-nav';

const ConfirmLoginLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <TopNav withTabs={false} />
      <Customizer />
      <Box className='app-content'
        sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  );
}

export default ConfirmLoginLayout;
