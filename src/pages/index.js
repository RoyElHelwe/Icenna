import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Carousel from 'react-material-ui-carousel';
import { getWebsite } from '../api/Website';
import RtlSvgIcon from '../components/rtl-svgicon';
import LandingLayout from '../layouts/LandingLayout';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Faqs from '../components/faqs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from '@mui/material';
import Sales from '../sections/home/Sales';
import PatientStatues from '../sections/home/PatientStatues';
import PieCustom from '../sections/home/PieCustom';
import LineCustom from '../sections/home/LineCustomV2';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Autoplay } from 'swiper/modules';
import { useSettings } from 'src/hooks/useSettings';


export async function getServerSideProps() {
  const website = await getWebsite();

  return { props: { website: website.data } };
};

const Index = ({ website }) => {
  const { t } = useTranslation();
  const { settings, saveSettings } = useSettings();
  const {
    language,
  } = settings;
  return (
    <>
      <Head>
        <title>An AI Healthcare Product</title>
        <meta name="description" content="iCenna is an Artificial Intelligence and Machine learning healthcare product for providers and patients using NPHIES" key="desc" />
        <meta property="og:title" content="An AI Healthcare Product" />
        <meta
          property="og:description"
          content="iCenna is an Artificial Intelligence and Machine learning healthcare product for providers and patients using NPHIES"
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
            {t("iCenna is an Artificial Intelligence and Machine learning healthcare product for providers and patients using NPHIES")}
          </Typography>
        </Stack>
      </Container>
      {/* <Stack spacing={"24px"} direction={{ xs: 'column', md: 'row' }} alignItems={"center"} justifyContent={"center"} sx={{ textAlign: 'center', mt: "48px" }}>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '50px', px: 5, py: 2, }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: '50px', px: 5, py: 2, }}>
            Learn More
          </Button>
        </Stack> */}
      {/* Image */}

      <Container maxWidth="lg" >
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, }} sx={{ pt: 5, px: '3.5%', pb: 12, }}>
          <Grid item xs={12} lg={12}>
            <LineCustom />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PieCustom />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Sales title="$135,312" subtitle={"Profits"} colors={['#4CAF50']} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PatientStatues />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" >
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
            dir={language == 'ar' ? "rtl" : "ltr"}
            key={language}
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
        <Stack spacing={12} direction={{ xs: 'column', md: "row" }} alignItems={"center"} sx={{ textAlign: 'center', mt: "7.5rem", width: '100%' }}>
          <Stack spacing={2} sx={{ textAlign: 'initial', }}>
            <Stack direction={"row"} alignItems={"center"}>
              <Image src={"/assets/icons/cloud.png"} width={60} height={60} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                {t("Cloud")}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Efficiently utilize iCenna from anywhere using cloud technology to enhance mobility and communication.")}
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ textAlign: 'initial', }}>
            <Stack direction={"row"} alignItems={"center"}>
              <Image src={"/assets/icons/privacy.png"} width={60} height={60} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                {t("Privacy")}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Your privacy comes first. We adhere to strict policies to safeguard your data and carefully define access levels.")}
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ textAlign: 'initial', }}>
            <Stack direction={"row"} alignItems={"center"}>
              <Image src={"/assets/icons/protection.png"} width={60} height={60} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                {t("Protection")}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
              {t("Ensure the safety of your data. We employ the latest technologies for encryption and perpetual data protection.")}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={12} sx={{ my: '7.5rem' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
            {t("Receive Bookings and Manage Patient Cases Through iCenna Mobile App")}
          </Typography>
          <Stack direction={{ xs: "column", md: 'row' }} justifyContent={"space-between"} alignItems={"center"}>
            <Stack spacing={5}>
              <Stack direction={"row"} spacing={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="30"
                  x="0"
                  y="0"
                  viewBox="0 0 256 250"
                >
                  <path
                    fill="#0f4b64"
                    strokeMiterlimit="10"
                    d="M43.171 10.925L24.085 33.446l-9.667-9.015 1.363-1.463 8.134 7.585L41.861 9.378C37.657 4.844 31.656 2 25 2 12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23a22.876 22.876 0 00-4.829-14.075z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(5.12)"
                  ></path>
                </svg>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                    {t("Online Payment")}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
                    {t("Accepting all online payment methods: Visa, Mastercard, STC Pay, and Apple Pay.")}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction={"row"} spacing={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="30"
                  x="0"
                  y="0"
                  viewBox="0 0 256 250"
                >
                  <path
                    fill="#0f4b64"
                    strokeMiterlimit="10"
                    d="M43.171 10.925L24.085 33.446l-9.667-9.015 1.363-1.463 8.134 7.585L41.861 9.378C37.657 4.844 31.656 2 25 2 12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23a22.876 22.876 0 00-4.829-14.075z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(5.12)"
                  ></path>
                </svg>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                    {t("Absher Intergration")}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
                    {t("Integration with Absher to access insurance benefits based on insurance plans.")}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction={"row"} spacing={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="30"
                  x="0"
                  y="0"
                  viewBox="0 0 256 250"
                >
                  <path
                    fill="#0f4b64"
                    strokeMiterlimit="10"
                    d="M43.171 10.925L24.085 33.446l-9.667-9.015 1.363-1.463 8.134 7.585L41.861 9.378C37.657 4.844 31.656 2 25 2 12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23a22.876 22.876 0 00-4.829-14.075z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(5.12)"
                  ></path>
                </svg>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', }, fontWeight: 'bold', }}>
                    {t("Appointment Management")}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1rem', } }}>
                    {t("Streamline your scheduling process for improved efficiency and patient care.")}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Image src={"/assets/landing/booking.png"} width={680} height={480} layout="responsive"
              objectFit="contain"
              objectPosition="center" style={{ width: '680px', height: '480px' }} />
          </Stack>
        </Stack>
      </Container >
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
