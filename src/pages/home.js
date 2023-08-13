import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';

const Sales = dynamic(() => import('../sections/home/Sales'), { ssr: false });
const PatientStatues = dynamic(() => import('../sections/home/PatientStatues'), { ssr: false });
const PatientColumns = dynamic(() => import('../sections/home/PatientColumns'), { ssr: false });
const PatientTracker = dynamic(() => import('../sections/home/PatientTracker'), { ssr: false });
const AgeGroups = dynamic(() => import('../sections/home/AgeGroups'), { ssr: false });
const PatientVisits = dynamic(() => import('../sections/home/PatientVisits'), { ssr: false });
const PatientAppointments = dynamic(() => import('../sections/home/PatientAppointments'), { ssr: false });

const Home = () => (
  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, }} sx={{ pt: 5, px: '3.5%', pb: 12, }}>
    <Grid item xs={12} lg={4}>
      <Sales title="$424,652" subtitle="Sales" colors={['#008FFB']} />
    </Grid>
    <Grid item xs={12} lg={4}>
      <Sales title="$235,312" subtitle="Expenses" colors={['#FF4560']} />
    </Grid>
    <Grid item xs={12} lg={4}>
      <Sales title="$135,312" subtitle="Profits" colors={['#4CAF50']} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <PatientStatues />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <PatientColumns />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <PatientTracker />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <AgeGroups />
    </Grid>
    <Grid item xs={12} md={12} lg={6}>
      <PatientVisits />
    </Grid>
    <Grid item xs={12}>
      <PatientAppointments />
    </Grid>
  </Grid>
);

Home.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Home;
