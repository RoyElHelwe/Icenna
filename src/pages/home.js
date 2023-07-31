import { Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import Translations from '../components/Translations';

const Home = () => (
  <Typography
    m={3}
    variant="h3"
  >
    <Translations text="Home" />
  </Typography>
);

Home.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Home;
