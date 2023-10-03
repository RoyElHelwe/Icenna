import { Grid, Link, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { getWebsite } from '../api/Website';
import LandingLayout from '../layouts/LandingLayout';

export async function getServerSideProps() {
  const website = await getWebsite();

  return { props: { website: website.data } };
};

const Page = ({ website }) => {
  const { data } = useQuery({
    queryKey: ['getWebsite'],
    queryFn: getWebsite,
    initialData: website,
  });

  const {
    phone,
    address,
    email,
  } = data?.data?.contact ?? {};

  return (
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      <Grid container justifyContent="center" spacing={5} sx={{ px: 3, my: 10, }}>
        <Grid item xs={12} lg={5}>
          <Stack direction="column" spacing={5}>
            <Typography variant="h2">
              Contact US
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
              {address}
            </Typography>
            <Stack direction="row" spacing={2} >
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Email:</Typography>
              <Link href={`mailto:${email}`} underline="hover" sx={{ fontSize: '1.25rem', }}>{email}</Link>
            </Stack>
            <Stack direction="row" spacing={2} >
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Phone:</Typography>
              <Link href={`tel:${phone}`} underline="hover" sx={{ fontSize: '1.25rem', }}>{phone}</Link>
              <Typography></Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4} sx={{ p: 5, }}>
          <img src="/assets/contact-us.png" height={500} style={{ maxWidth: '100%' }} />
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => {
  const { website } = page.props;

  return (
    <LandingLayout website={website?.data}>
      {page}
    </LandingLayout>
  );
};

Page.authGuard = false;

export default Page;
