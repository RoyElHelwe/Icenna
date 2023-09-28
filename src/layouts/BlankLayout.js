import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Customizer from '../components/customizer';

export const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}));

const BlankLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Customizer />
      <Box className='app-content'
        sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  );
};

export default BlankLayout;
