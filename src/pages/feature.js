import { Button, Container, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image';
import React from 'react'
import { useTranslation } from 'react-i18next';
import LandingLayout from 'src/layouts/LandingLayout';
import Link from 'next/link';

const Feature = () => {
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
            {t("Comprehensive Accounting Software Solutions")}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
            {t("Powered by Artificial Intelligence, Machine Learning For Your Business")}
          </Typography>
        </Stack>
        <Stack direction={{xs:'column', md:"row"}} justifyContent={"space-between"} alignItems={"center"} sx={{ pt: '7.5rem' }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', }, fontWeight: 'bold', }}>
              {t("Automated Bookkeeping Process")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
              {t("Discover unparalleled accuracy in financial management through the Automated Bookkeeping Process enhanced by Artificial Intelligence. Experience precision in every transaction.")}
            </Typography>
          </Stack>
          <Image src={"/assets/landing/feature1.png"}
            width={500}
            height={480}
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            style={{ width: '600', height: '480px' }} />
        </Stack>
        <Stack direction={{xs:'column', md:"row"}} justifyContent={"space-between"} alignItems={"center"}>
          <Image src={"/assets/landing/feature2.png"}
            width={500}
            height={480}
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            style={{ width: '600', height: '480px' }} />
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', }, fontWeight: 'bold', }}>
              {t("Medical Record Management")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
              {t("Efficiently organize patient data by NAPHIES and medical codes such as ICD-10 and SBS to document diagnoses and procedures. The record includes healthcare details, radiology management, and prescriptions")}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={{xs:'column', md:"row"}} justifyContent={"space-between"} sx={{pt:'3rem'}}>
          <Stack>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', textAlign: 'center' }, fontWeight: 'bold', }}>
              {t("Other")}
            </Typography>
            <Image src={"/assets/landing/feature3.png"}
              width={500}
              height={480}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
              style={{ width: '600', height: '480px' }} />
          </Stack>
          <Stack>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', textAlign: 'center' }, fontWeight: 'bold', }}>
              {t("iCenna")}
            </Typography>
            <Image src={"/assets/landing/feature4.png"}
              width={500}
              height={480}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
              style={{ width: '600', height: '480px' }} />
          </Stack>
        </Stack>
        {/* <Stack spacing={8} sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.25rem', textAlign: 'center' }, fontWeight: 'bold', }}>
            iCenna App Brings Everything You Need In Medical Life
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '1rem', md: '1.2rem', textAlign: 'center' } }}>
            Appointments, reports, and medical records. Download now for a comprehensive experience of convenience
          </Typography>
          <Stack direction={"row"} spacing={4} alignItems={"center"} justifyContent={"center"}>
            <Button variant='outlined' color='secondary'>
              <Link style={{ textDecoration: 'none' }} href="https://apps.apple.com/sa/app/icenna/id6446591202" target="_blank" >
                <Typography variant="body2" sx={{ fontSize: { xs: '1rem', md: '1.2rem', textAlign: 'center', display: 'flex', alignItems: 'center' } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.1053 2C16.1942 3.16113 15.827 4.31118 15.0817 5.20594C14.3585 6.10534 13.2628 6.62339 12.1089 6.61151C12.0355 5.48381 12.4134 4.37318 13.1593 3.52426C13.9147 2.66383 14.9666 2.1196 16.1053 2ZM19.7549 8.82252C18.4274 9.63862 17.6106 11.0778 17.5905 12.636C17.5924 14.3988 18.6481 15.9897 20.2717 16.6763C19.9594 17.6907 19.4887 18.6493 18.8771 19.5166C18.0556 20.7454 17.1944 21.9459 15.8274 21.9681C15.1772 21.9831 14.7384 21.7962 14.2811 21.6013C13.8041 21.3982 13.307 21.1864 12.5292 21.1864C11.7043 21.1864 11.185 21.405 10.6842 21.6157C10.2514 21.7979 9.83232 21.9743 9.24176 21.9988C7.93991 22.047 6.94498 20.6873 6.09368 19.47C4.39216 16.9841 3.06722 12.4644 4.84349 9.38909C5.6776 7.89021 7.23718 6.93909 8.95162 6.8837C9.68997 6.8685 10.3985 7.15309 11.0196 7.40259C11.4947 7.5934 11.9186 7.76369 12.2658 7.76369C12.571 7.76369 12.9831 7.60013 13.4634 7.4095C14.22 7.10922 15.1458 6.74179 16.0892 6.84081C17.5551 6.88668 18.9136 7.6211 19.7549 8.82252Z" fill="black" />
                  </svg>&nbsp; App Store
                </Typography>
              </Link>
            </Button>
            <Button variant='outlined' color='secondary'>
              <Link style={{ textDecoration: 'none' }} href="https://play.google.com/store/apps/details?id=com.icenna" target="_blank" >
                <Typography variant="body2" sx={{ fontSize: { xs: '1rem', md: '1.2rem', textAlign: 'center', display: 'flex', alignItems: 'center' } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5655 6.53417L16.9012 9.49617C19.7591 11.0934 21.7137 14.0664 22 17.5789H2C2.28594 14.0664 4.24078 11.0934 7.09879 9.49617L5.4343 6.53368C5.37245 6.42359 5.37247 6.28795 5.43434 6.17787C5.49621 6.06779 5.61054 5.99998 5.73425 6C5.85797 6.00002 5.97227 6.06785 6.03412 6.17795L7.71933 9.17736C9.00811 8.57345 10.4554 8.23641 11.9998 8.23641C13.5443 8.23641 14.9917 8.57296 16.2805 9.17736L17.9659 6.17795C18.0278 6.06788 18.1422 6.00012 18.2659 6.00019C18.3896 6.00026 18.5039 6.06816 18.5657 6.1783C18.6276 6.28844 18.6275 6.4241 18.5655 6.53417ZM7.39745 14.6508C6.93746 14.6509 6.5645 14.2678 6.56442 13.7952C6.56433 13.3225 6.93715 12.9393 7.39713 12.9392C7.85712 12.9391 8.23008 13.3222 8.23017 13.7948C8.22973 14.2673 7.85722 14.6502 7.39745 14.6508ZM16.6026 14.6508C16.1426 14.6509 15.7696 14.2678 15.7695 13.7952C15.7694 13.3225 16.1423 12.9393 16.6022 12.9392C17.0622 12.9391 17.4352 13.3222 17.4353 13.7948C17.4348 14.2672 17.0623 14.6501 16.6026 14.6508Z" fill="#3DDC84" />
                  </svg>&nbsp; Android
                </Typography>
              </Link>
            </Button>
          </Stack>
        </Stack> */}
      </Container>
    </>
  )
}

Feature.getLayout = (page) => {
  return (
    <LandingLayout>
      {page}
    </LandingLayout>
  )
}

Feature.authGuard = false;

export default Feature
