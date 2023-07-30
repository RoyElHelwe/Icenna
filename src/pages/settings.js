import { Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import Translations from '../components/Translations';

const Settings = () => (
  <Typography
    m={3}
    variant="h3"
  >
    <Translations text="Settings" />
  </Typography>
);

Settings.getLayout = (page) => (
  <DashboardLayout pageTitle="Settings">
    {page}
  </DashboardLayout>
);

export default Settings;