import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Carousel from 'react-material-ui-carousel';
import RtlSvgIcon from '../components/rtl-svgicon';
import LandingLayout from '../layouts/LandingLayout';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>iCenna</title>
      </Head>
      <Stack alignItems="center" direction="column" spacing={2}>
        <Carousel
          autoPlay
          swipe={false}
          indicators={false}
          animation='slide'
          NextIcon={(<RtlSvgIcon><ArrowForwardIosIcon /></RtlSvgIcon>)}
          PrevIcon={(<RtlSvgIcon><ArrowBackIosNewIcon /></RtlSvgIcon>)}
          sx={{ width: "100%", height: '350px', }}>
          {[1, 2]?.map((n, i) => (
            <Box key={i} sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', mx: 25, }}>
              <img src={`/assets/landing/${n}.jpg`} width="100%" height={500} />
            </Box>
          ))}
        </Carousel>
        <Stack alignItems="center" direction="column" spacing={5} sx={{ width: '50%' }}>
          <Typography variant="h3">
            iCenna
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
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

Page.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

Page.authGuard = false;

export default Page;
