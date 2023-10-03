import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
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
    terms_and_conditions
  } = data?.data?.contact ?? {};

  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>

      <Box sx={{ my: 3, }}>
        <Typography variant="h2">
          Terms and Conditions
        </Typography>
        <Box sx={{ mx: 5, direction: 'rtl' }}>
          {parse(terms_and_conditions?.terms ?? '')}
        </Box>
      </Box>
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
