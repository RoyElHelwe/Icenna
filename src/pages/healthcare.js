import { Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import Translations from '../components/Translations';

const Healthcare = () => (
  <Typography
    m={3}
    variant="h3"
  >
    <Translations text="Healthcare" />
  </Typography>
);

Healthcare.getLayout = (page) => (
  <DashboardLayout pageTitle="Healthcare">
    {page}
  </DashboardLayout>
);

export default Healthcare;
