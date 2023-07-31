import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        iCenna
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">

      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
