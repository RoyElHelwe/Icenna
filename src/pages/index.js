import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import { getWebsite } from '../api/Website';
import RtlSvgIcon from '../components/rtl-svgicon';
import LandingLayout from '../layouts/LandingLayout';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Faqs from '../components/faqs';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Autoplay } from 'swiper/modules';


export async function getServerSideProps() {
  const website = await getWebsite();

  return { props: { website: website.data } };
};

const Index = ({ website }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>An AI Healthcare Product</title>
        <meta name="description" content="iCenna is an Artificial Intelligence and Machine learning healthcare product built for Healthcare providers and patients to connect them into one platform, using a sophisticated algorithm" key="desc" />
        <meta property="og:title" content="An AI Healthcare Product" />
        <meta
          property="og:description"
          content="iCenna is an Artificial Intelligence and Machine learning healthcare product built for Healthcare providers and patients to connect them into one platform, using a sophisticated algorithm"
        />
        <meta
          property="og:image"
          content="/assets/logo/png-01.png"
        />
      </Head>
      <Container maxWidth="md" sx={{ pt: "72px" }}>
        <Stack spacing={{ xs: "16px", md: "24px" }} sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '4.5rem', }, fontWeight: 'bold', }}>
            {t("An AI Healthcare Product")}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
            {t("iCenna is an Artificial Intelligence and Machine learning healthcare product built for Healthcare providers and patients to connect them into one platform, using a sophisticated algorithm")}
          </Typography>
        </Stack>
        {/* <Stack spacing={"24px"} direction={{ xs: 'column', md: 'row' }} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: 'center', mt: "48px" }}>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '50px', px: 5, py: 2, }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: '50px', px: 5, py: 2, }}>
            Learn More
          </Button>
        </Stack> */}
        {/* Image */}
        <Stack spacing={2} sx={{ textAlign: 'center', mt: { xs: "32px", md: "60px" } }}>
          <Image
            src="/assets/landing/3.png"
            alt="iCenna"
            width={1280}
            height={720}
            layout="responsive"
            sizes="(max-width: 767px) 100vw, (min-width: 768px) 50vw, (min-width: 1024px) 30vw"
          />
        </Stack>
        <Stack spacing={{ xs: 2, md: 6 }} direction={{ xs: 'column', md: 'row' }} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: 'center', mt: { xs: '25px', md: "3.5rem" } }}>
          <Stack spacing={1} direction={"row"} alignItems={"center"} justifyContent={"center"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.25 10.7121L10.7412 16.1275L20.25 6.75" stroke="#61F8A3" strokeWidth="4" />
            </svg>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Free Up to 5 users")}
            </Typography>
          </Stack>
          <Stack spacing={1} direction={"row"} alignItems={"center"} justifyContent={"center"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.25 10.7121L10.7412 16.1275L20.25 6.75" stroke="#61F8A3" strokeWidth="4" />
            </svg>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("No credit card required")}
            </Typography>
          </Stack>
          <Stack spacing={1} direction={"row"} alignItems={"center"} justifyContent={"center"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.25 10.7121L10.7412 16.1275L20.25 6.75" stroke="#61F8A3" strokeWidth="4" />
            </svg>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Cancel at any time")}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={12} sx={{ textAlign: 'center', mt: { xs: "32px", md: "60px" } }}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', }, fontWeight: 'bold', }}>
            {t("Partners")}
          </Typography>
          {/* <Stack spacing={12} direction={"row"} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: 'center', mt: "7.5rem" }}> */}
          <Swiper
            spaceBetween={30}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 600,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 3, // slidesPerView for mobile screens
              },
              600: {
                slidesPerView: 4, // slidesPerView for tablet screens
              },
              1024: {
                slidesPerView: 5, // slidesPerView for desktop screens
              },
            }}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide><Image src="/assets/partners/ApplePay.png" alt="Apple Pay" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/chi.png" alt="CHI" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide> <Image src="/assets/partners/Mada.png" alt="Mada" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/Mastercard.png" alt="Master Card" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/MCI.png" alt="MCI" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/Nphies.png" alt="Nphies" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/absher.png" alt="Absher" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
            <SwiperSlide><Image src="/assets/partners/elm.png" alt="Elm" width={100} height={100} style={{ height: '30px', width: 'auto' }} /></SwiperSlide>
          </Swiper>
        </Stack>
        {/* </Stack> */}
        {/* <Stack spacing={12} direction={{ xs: 'column', md: "row" }} alignItems={"center"} sx={{ textAlign: 'center', mt: "7.5rem", width: '100%' }}>
          <Stack spacing={2} sx={{ textAlign: 'initial', my: "4.75rem" }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
              {t("1. First step")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Sometimes features require a short description. This can be detailed description or just a short text.")}
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ textAlign: 'initial', my: "4.75rem" }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
              {t("2. Second step")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Sometimes features require a short description. This can be detailed description or just a short text.")}
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ textAlign: 'initial', my: "4.75rem" }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
              {t("3. Last step")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Sometimes features require a short description. This can be detailed description or just a short text.")}
            </Typography>
          </Stack>
        </Stack> */}
      </Container>
      <Faqs />
    </>
  );
};

Index.getLayout = (page) => {
  const { website } = page.props;

  return (
    <LandingLayout website={website?.data}>
      {page}
    </LandingLayout>
  );
};

Index.authGuard = false;

export default Index;
