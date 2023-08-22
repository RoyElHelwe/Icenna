import { Typography } from '@mui/material';
import Translations from '../components/Translations';
import { Permissions } from '../constants/Permissions';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';

const Healthcare = () => (
  <Typography
    m={3}
    variant="h3"
  >
    <Translations text="Healthcare" />
  </Typography>
);

Healthcare.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

Healthcare.access = Permissions.CanViewHealthcare;

export default Healthcare;
