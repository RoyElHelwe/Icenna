import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAuth } from '../hooks/use-auth';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';

const Settings = () => {
  const { user, } = useAuth();

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, mx: 15, my: 5, }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5, }}>Settings</Typography>
          </Box>
          <Divider sx={{ my: theme => `${theme.spacing(3)} !important` }} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', }}>Name</Typography>
              <Typography variant="body1" sx={{ p: 1, }}>{user?.full_name}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', }}>Email</Typography>
              <Typography variant="body1" sx={{ p: 1, }}>{user?.email}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', }}>Phone</Typography>
              <Typography variant="body1" sx={{ p: 1, }}>{user?.mobile_no}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;