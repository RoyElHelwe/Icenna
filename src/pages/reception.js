import { Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import Translations from '../components/Translations';

const Reception = () => (
  <Typography
    m={3}
    variant="h3"
  >
    <Translations text="Reception" />
  </Typography>
);

Reception.getLayout = (page) => (
  <DashboardLayout pageTitle="Reception">
    {page}
  </DashboardLayout>
);

export default Reception;
