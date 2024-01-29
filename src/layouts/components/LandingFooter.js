import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';


import React from 'react';
import { useTranslation } from 'react-i18next';

const InstagramIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ fill: 'white' }}
    >
      <path d="M8 3a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5H8zm10 2a1 1 0 110 2 1 1 0 010-2zm-6 2a5 5 0 11-.001 10.001A5 5 0 0112 7zm0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"></path>
    </svg>
  );
};
const TwitterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ fill: 'white' }}
    >
      <path d="M22 3.999c-.78.463-2.345 1.094-3.265 1.276-.027.007-.049.016-.075.023A4.5 4.5 0 0011 8.499c0 .131-.011.372 0 .5-3.353 0-5.905-1.756-7.735-4-.199.5-.286 1.29-.286 2.032 0 1.401 1.095 2.777 2.8 3.63-.314.081-.66.139-1.02.139A2.686 2.686 0 013 10.183v.051c0 1.958 2.078 3.291 3.926 3.662-.375.221-1.131.243-1.5.243-.26 0-1.18-.119-1.426-.165.514 1.605 2.368 2.507 4.135 2.539-1.382 1.084-2.341 1.486-5.171 1.486H2C3.788 19.145 6.065 20 8.347 20 15.777 20 20 14.337 20 8.999l-.005-.447c0-.018.005-.035.005-.053 0-.027-.008-.053-.008-.08a18.384 18.384 0 00-.009-.329A8.217 8.217 0 0022 5.999a8.07 8.07 0 01-2.32.636c.834-.5 2.019-1.692 2.32-2.636z"></path>
    </svg>
  );
};
const LinkedInIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ fill: 'white' }}
    >
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.477v-7H9v7zM7.694 8.717c-.771 0-1.286-.514-1.286-1.2s.514-1.2 1.371-1.2c.771 0 1.286.514 1.286 1.2s-.514 1.2-1.371 1.2zM18 17h-2.442v-3.826c0-1.058-.651-1.302-.895-1.302s-1.058.163-1.058 1.302V17h-2.523v-7h2.523v.977c.325-.57.976-.977 2.197-.977S18 10.977 18 13.174V17z"></path>
    </svg>
  );
};
const Maroof = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="24"
      fill="none"
      viewBox="50 0 115 56"
    >
      <g clipPath="url(#clip0_126588_92840)">
        <path
          fill="#E6E6E6"
          d="M86.785 0c-15.464 0-28 12.537-28 28s12.536 28 28 28 28-12.537 28-28-12.536-28-28-28zM72.136 29.352c-.448 0-.788-.149-1.06-.446-.271-.298-.4-.67-.4-1.115.047-2.177.516-4.231 1.385-6.157a15.707 15.707 0 013.547-5.008 17.079 17.079 0 015.184-3.339 15.109 15.109 0 015.857-1.156h.367c4.423.102 8.174 1.703 11.259 4.819a16.273 16.273 0 013.431 5.231 15.171 15.171 0 011.121 6.116c-.048 2.177-.483 4.218-1.305 6.117-.822 1.906-2.024 3.595-3.614 5.082-1.543 1.48-3.282 2.676-5.219 3.467-1.936.79-4.001 1.17-6.19 1.17h-.149c-.15 0-.482-.082-1.005-.13-.523-.046-1.183-.209-1.977-.432-.136-.04-.286-.094-.428-.142.659-.824 1.284-1.73 1.596-2.5.66.115 1.339.189 2.038.21.3 0 .598-.014.897-.035.3-.026.571-.04.822-.04a12.83 12.83 0 004.553-1.413 13.702 13.702 0 003.655-2.818 12.897 12.897 0 002.46-3.893c.598-1.46.917-3 .971-4.636 0-1.831-.326-3.548-.971-5.156-.646-1.609-1.556-3.001-2.725-4.19a13.604 13.604 0 00-4.138-2.887 12.386 12.386 0 00-5.143-1.101h-.822c-.3 0-.598.054-.897.101-1.59.196-3.085.67-4.47 1.386a13.08 13.08 0 00-3.656 2.79 13.456 13.456 0 00-2.534 3.934c-.619 1.487-.972 3.048-.972 4.677v.074c0 .94-.557 1.413-1.454 1.413m14.628 1.365A2.717 2.717 0 0184.054 28a2.717 2.717 0 012.724-2.71A2.717 2.717 0 0189.503 28a2.721 2.721 0 01-2.725 2.71z"
        ></path>
        <path
          fill="url(#paint0_linear_126588_92840)"
          d="M85.647 32.177c-1.157-.293-2.048-.988-2.58-2.01a4.122 4.122 0 01-.482-2.876 4.239 4.239 0 011.51-2.514l.205-.143.32-.19c.972-.58 2.082-.73 3.211-.444 1.13.287 2.035.954 2.613 1.929l.055.102c.49.967.619 1.955.401 2.937a4.33 4.33 0 01-1.368 2.31c-.17.204-.388.374-.64.524l-.101.054c-.62.314-1.293.47-1.98.47-.388 0-.783-.047-1.17-.15M83.482 2.212c-3.341.443-6.573 1.554-9.608 3.305-3.07 1.771-5.668 4.06-7.724 6.8-2.061 2.752-3.558 5.777-4.443 8.993-.885 3.21-1.136 6.568-.742 9.975.395 3.4 1.47 6.698 3.205 9.805.742 1.246 1.701 2.282 2.845 3.052a10.98 10.98 0 003.81 1.635c1.368.3 2.797.354 4.233.164 1.408-.191 2.763-.661 4.015-1.41l.707-.423c.164-.096.3-.198.408-.293l.075-.068c1.225-.981 2.192-2.14 2.865-3.434l.551-1.063 1.178.197c2.68.457 5.185.014 7.662-1.355.183-.11.394-.246.592-.389.258-.184.49-.34.714-.477a11.185 11.185 0 002.715-3.045 12.247 12.247 0 001.497-3.802c.273-1.322.306-2.691.102-4.06a11.837 11.837 0 00-1.36-3.966 12.127 12.127 0 00-3.05-3.462 11.153 11.153 0 00-3.919-1.955 12.015 12.015 0 00-4.43-.307c-1.496.17-2.953.668-4.327 1.486l-.708.422a3.608 3.608 0 00-.517.368l-.048.041a11.772 11.772 0 00-2.763 3.052 11.682 11.682 0 00-1.503 3.748 11.938 11.938 0 00-.11 4.122 10.603 10.603 0 001.389 3.918l.116.218c.748 1.628.285 3.188-1.212 4.08-.782.464-1.633.58-2.47.328-.782-.239-1.422-.75-1.864-1.485-1.198-2.126-1.933-4.368-2.198-6.691a17.59 17.59 0 01.524-6.786 18.728 18.728 0 013.008-6.078 16.805 16.805 0 015.28-4.633c4.226-2.385 8.737-2.978 13.392-1.744a18.054 18.054 0 016.22 3.059 17.055 17.055 0 014.545 5.233c1.177 2.084 1.919 4.292 2.218 6.561.299 2.29.116 4.62-.551 6.93-.606 2.24-1.715 4.258-3.008 6.158-2.899 4.28-4.11 6.766-14.147 15.065 0 0 2.845-.143 4.07-.354 1.707-.293 3.211-.648 4.477-1.043 1.252-.395 2.273-.776 3.028-1.151 1.034-.504 1.388-.702 1.51-.777a27.675 27.675 0 002.797-1.908c4.648-3.53 7.778-8.169 9.309-13.804.926-3.38 1.177-6.779.735-10.124-.442-3.353-1.531-6.61-3.246-9.675-1.701-3.053-3.933-5.635-6.628-7.68a27.601 27.601 0 00-9.131-4.544A25.755 25.755 0 0086.715 2c-1.082 0-2.164.068-3.239.211"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_126588_92840"
          x1="60.796"
          x2="112.804"
          y1="27.993"
          y2="27.993"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#003CAC"></stop>
          <stop offset="1" stopColor="#00AB8D"></stop>
        </linearGradient>
        <clipPath id="clip0_126588_92840">
          <path fill="#fff" d="M0 0H115V56H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
const FacebookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ fill: 'white' }}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896 1.411-4.167 3.818-4.167 1.153 0 1.762.085 2.051.124v2.294h-1.642c-1.022 0-1.379.969-1.379 2.061v1.437h2.995l-.406 2.629h-2.588v7.247C18.235 21.236 22 17.062 22 12c0-5.523-4.477-10-10-10z"></path>
    </svg>
  );
}
const GoogleIocn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      x="0"
      y="0"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="AraffhWwwEqZfgFEBZFoqa_L1ws9zn2uD01_gr1"
        x1="18.102"
        x2="25.297"
        y1="3.244"
        y2="34.74"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#35ab4a"></stop>
        <stop offset="0.297" stopColor="#31a145"></stop>
        <stop offset="0.798" stopColor="#288739"></stop>
        <stop offset="1" stopColor="#237a33"></stop>
      </linearGradient>
      <path
        fill="url(#AraffhWwwEqZfgFEBZFoqa_L1ws9zn2uD01_gr1)"
        d="M13.488 4.012c-2.694-1.504-5.883-.234-7.038 2.311L24.126 24l9.014-9.014L13.488 4.012z"
      ></path>
      <linearGradient
        id="AraffhWwwEqZfgFEBZFoqb_L1ws9zn2uD01_gr2"
        x1="19.158"
        x2="21.194"
        y1="23.862"
        y2="66.931"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f14e5d"></stop>
        <stop offset="0.499" stopColor="#ea3d4f"></stop>
        <stop offset="1" stopColor="#e12138"></stop>
      </linearGradient>
      <path
        fill="url(#AraffhWwwEqZfgFEBZFoqb_L1ws9zn2uD01_gr2)"
        d="M33.14 33.014L24.126 24 6.45 41.677c1.156 2.546 4.345 3.815 7.038 2.312L33.14 33.014z"
      ></path>
      <linearGradient
        id="AraffhWwwEqZfgFEBZFoqc_L1ws9zn2uD01_gr3"
        x1="32.943"
        x2="36.541"
        y1="14.899"
        y2="43.612"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ffd844"></stop>
        <stop offset="0.519" stopColor="#ffc63f"></stop>
        <stop offset="1" stopColor="#ffb03a"></stop>
      </linearGradient>
      <path
        fill="url(#AraffhWwwEqZfgFEBZFoqc_L1ws9zn2uD01_gr3)"
        d="M41.419 28.393c1.72-.96 2.58-2.676 2.581-4.393-.001-1.717-.861-3.434-2.581-4.393l-8.279-4.621L24.126 24l9.014 9.014 8.279-4.621z"
      ></path>
      <linearGradient
        id="AraffhWwwEqZfgFEBZFoqd_L1ws9zn2uD01_gr4"
        x1="13.853"
        x2="15.572"
        y1="5.901"
        y2="42.811"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.003" stopColor="#0090e6"></stop>
        <stop offset="1" stopColor="#0065a0"></stop>
      </linearGradient>
      <path
        fill="url(#AraffhWwwEqZfgFEBZFoqd_L1ws9zn2uD01_gr4)"
        d="M6.45 6.323A5.054 5.054 0 006 8.408v31.179c0 .761.164 1.463.45 2.09l17.674-17.68L6.45 6.323z"
      ></path>
    </svg>
  );
}
const AppleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      x="0"
      y="0"
      viewBox="0 0 48 48"
    >
      <path
        fill="#0091ea"
        d="M14.1 42h19.8a8.1 8.1 0 008.1-8.1V27H6v6.9a8.1 8.1 0 008.1 8.1z"
      ></path>
      <path fill="#00b0ff" d="M6 16H42V27H6z"></path>
      <path
        fill="#40c4ff"
        d="M33.9 6H14.1A8.1 8.1 0 006 14.1V16h36v-1.9A8.1 8.1 0 0033.9 6z"
      ></path>
      <path
        fill="#fff"
        d="M22.854 18.943l1.738-2.967-1.598-2.727a1.5 1.5 0 00-2.588 1.516l2.448 4.178z"
      ></path>
      <path
        fill="#fff"
        d="M26.786 12.714a1.498 1.498 0 00-2.052.536L16.09 28h3.477l7.754-13.233a1.5 1.5 0 00-.535-2.053zM34.521 32.92L26.91 19.933l-.763 1.303a4.115 4.115 0 00-.185 3.011l5.972 10.191a1.498 1.498 0 002.052.535 1.5 1.5 0 00.535-2.053z"
      ></path>
      <path
        fill="#fff"
        d="M25.473 27.919l-.171-.289a4.01 4.01 0 00-.498-.621H12.3c-.829 0-1.5.665-1.5 1.484s.671 1.484 1.5 1.484h13.394a2.696 2.696 0 00-.221-2.058zM16.66 32.961a2.78 2.78 0 00-2.03-.959h-.004a4.132 4.132 0 00-.932.087l-.487.831a1.5 1.5 0 002.588 1.518l.865-1.477zM30.196 27.009H35.7c.829 0 1.5.665 1.5 1.484s-.671 1.484-1.5 1.484h-5.394c-.194-.653-.296-2.781-.11-2.968z"
      ></path>
    </svg>
  );
}

export const LandingFooter = ({ withTabs, website, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ mt: 'auto', py: 5, color: 'white', textAlign: { xs: 'center', md: 'initial' } }}>
      <Grid container rowSpacing={3} >
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', fontWeight: '700', color: 'white' } }}>
              {t("About Us")}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem', color: 'white' } }}>
                {t("AviCenna for Information Technology")}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem', color: 'white' } }}>
                شركة افي سينا لتقنية المعلومات 
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem', color: 'white' } }}>
                {t("Commercial Registration: 4030497928")}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', fontWeight: '700', color: 'white' } }}>
              {t("Legal")}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem', color: 'white' } }}>
                <Link href={"/tc"} underline="hover" color="inherit" style={{ textDecoration: 'none', color: 'white' }}>
                  {t("Terms & Conditions")}
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem', color: 'white' } }}>
                <Link href="/privacy" underline="hover" color="inherit" style={{ textDecoration: 'none', color: 'white' }}>
                  {t("Privacy Policy")}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack spacing={3} alignItems={{ xs: 'center', md: "flex-end" }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', fontWeight: '700', color: 'white' } }}>
              {t("Download App")}
            </Typography>
            <Stack spacing={10} direction={'row'} alignItems={"flex-start"}>
              {/* <Box>
                <Link href="https://apps.apple.com/sa/app/icenna/id6446591202" target='_blank'>
                  <AppleIcon />
                </Link>
              </Box> */}
              <Box>
                <Link href="https://play.google.com/store/apps/details?id=com.icenna" target='_blank'>
                  <GoogleIocn />
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Divider color={"#E5E5E5"} sx={{ my: 10 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent={'space-between'} alignItems={"center"} >
        <Stack spacing={6} direction={"row"} alignItems={"center"}>
          <Link href="/">
            <Image src="/assets/logo/white-01.png" alt="iCenna" width={150} height={150} style={{ width: 150, height: 50 }} />
          </Link>
          <Typography variant='body2' sx={{ color: 'white' }}>
            {t(" © 2021 iCenna. All rights reserved")}
          </Typography>
        </Stack>
        <Stack spacing={2} direction={"row"}>
          {/* Social Media */}
          <Stack direction={'row'} spacing={2}>
            <Box>
              <Link href="https://www.linkedin.com/company/icenna/" target='_blank'>
                <LinkedInIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://twitter.com/iCenna_Official" target='_blank'>
                <TwitterIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.instagram.com/icenna_official/" target='_blank'>
                <InstagramIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.facebook.com/iCenna.Official" target='_blank'>
                <FacebookIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://maroof.sa/businesses/details/54371/" target='_blank'>
                <Maroof />
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

LandingFooter.propTypes = {
  withTabs: PropTypes.bool,
};