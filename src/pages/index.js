import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import { getWebsite } from '../api/Website';
import RtlSvgIcon from '../components/rtl-svgicon';
import LandingLayout from '../layouts/LandingLayout';

export async function getServerSideProps() {
  const website = await getWebsite();

  return { props: { website: website.data } };
};

const Page = ({ website }) => {
  return (
    <>
      <Head>
        <title>iCenna</title>
      </Head>
      <Stack alignItems="center" direction="column" spacing={5}>
        <Carousel
          autoPlay
          swipe={false}
          indicators={false}
          animation='slide'
          NextIcon={(<RtlSvgIcon><ArrowForwardIosIcon /></RtlSvgIcon>)}
          PrevIcon={(<RtlSvgIcon><ArrowBackIosNewIcon /></RtlSvgIcon>)}
          sx={{ width: "100%", }}
        >
          <Box sx={{ height: "450px" }}>
            <img src={`/assets/landing/2.jpg`} width="100%" height={450} />
          </Box>
        </Carousel>
        <Stack alignItems="center" direction="column" spacing={5} sx={{ maxWidth: '42rem' }}>
          <Typography variant="h3">
            iCenna
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', alignContent: 'center', mx: 'auto', textAlign: 'center' }}>
            is a doctor booking app that connects you with doctors in a few steps, whether you have a medical insurance or use cash, iCenna can help you find and book appointments with doctors. Also, iCenna shows you the nearby clinics, doctor time/date availability and the best price.
          </Typography>
          <Typography variant="h3">
            آيسينا
          </Typography>
          <Typography sx={{ fontSize: '1.5rem', alignContent: 'center' }}>
            هو تطبيق يربط المريض بالدكتور والطبيب بخطوات سهله
          </Typography>
        </Stack>
      </Stack>
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
