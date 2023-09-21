import { Grid, Link, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LandingLayout from '../layouts/LandingLayout';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      <Grid container justifyContent="center" spacing={5} sx={{ px: 3 }}>
        <Grid item xs={12} lg={5}>
          <Stack direction="column" spacing={5}>
            <Typography variant="h1">
              Contact US
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
              JEMA2247 2247 Abdullah Al Tijani-Al Muhammadiyah Dist. Jeddah 23625 Saudi Arabia
            </Typography>
            <Stack direction="row" spacing={2} >
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Email:</Typography>
              <Link href="mailto:sales@icenna.com" underline="hover" sx={{ fontSize: '1.25rem', }}>sales@icenna.com</Link>
            </Stack>
            <Stack direction="row" spacing={2} >
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Phone:</Typography>
              <Link href="tel:+966503648038" underline="hover" sx={{ fontSize: '1.25rem', }}>+966-50-364-8038</Link>
              <Typography></Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4} sx={{ p: 5, }}>
          <img src="/assets/contact-us.png" height={500} />
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

Page.authGuard = false;

export default Page;
