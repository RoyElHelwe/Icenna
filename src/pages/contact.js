import { Button, Container, FormControl, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { getWebsite } from '../api/Website';
import LandingLayout from '../layouts/LandingLayout';
import Image from 'next/image';
import * as yup from 'yup';
import { useState } from 'react';
import { sendEmail } from 'src/api/contactusmail';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

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
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    phone_no: yup.string().required("Phone Number is required"),
  });
  const defaultValues = {
    email: '',
    name: '',
    phone_no: '',
  };

  const [message, setMessage] = useState({
    message: "",
    type: "",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: sendEmail,
    enabled: false,
    onSuccess: async (data, vars, ctx) => {
      setMessage({
        message: "We have received you contact and we will get back to you.",
        type: "success",
      });
      setTimeout(() => {
        handleClose();
      }, 1000);
    },
    onError: (err, vars, ctx) => {
      setMessage({
        message: "Email not sent!",
        type: "error",
      });
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = (data) => {
    matchIsValidTel(data.phone_no) ?
      mutate({ ...data }) :
      setMessage({
        message: "Phone Number is not valid!",
        type: "error",
      });
  };
  const {
    phone,
    address,
    email,
  } = data?.data?.contact ?? {};
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      <Container maxWidth="lg" sx={{ pt: "72px" }}>
        <Stack direction={{ xs: "column-reverse", md: 'row' }} spacing={4} alignItems={{ xs: 'flex-start', md: "center" }} >
          <Stack sx={{ maxWidth: '100%', height: 'auto', minWidth: { xs: '100%', md: '50%' } }}>
            <Link style={{ position: 'relative' }} target='_blanc' href='https://www.google.com/maps/place/iCenna/@21.6479375,39.127661,15z/data=!4m2!3m1!1s0x0:0x3ac06bd9bf2040fc?sa=X&ved=2ahUKEwihtNbS0_qDAxUMfKQEHfwKDkcQ_BJ6BAhbEAA'>
              <Image
                src="/assets/landing/location.png"
                alt="support"
                width={500}
                height={200}
                layout="responsive"
                objectFit="contain"
                objectPosition="center"
                style={{ borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)' }}
              />
              <Typography variant="h6" sx={{ fontSize: { xs: '2rem', md: '2.2rem', }, position: 'absolute', inset: 0, pb: 30, zIndex: 5, display: "flex", justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)' }}>
                {t("See on Google Maps")}
              </Typography>
            </Link>
          </Stack>
          <Stack spacing={{ xs: "16px", md: "24px" }} sx={{ minWidth: { xs: '100%', md: '40%' }, p: 2 }} >
            <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '4.5rem', }, fontWeight: 'bold', textWrap: 'nowrap' }}>
              {t("Contact Us")}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
              {t("Fill up the form our team will get back to you within 24 Hours")}
            </Typography>
            {message && (
              <Typography variant="body1" sx={{ color: message.type == 'success' ? 'green' : 'red' }}>
                {t(message.message)}
              </Typography>
            )}
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      disabled={isLoading}
                      fullWidth
                      label={t("Name")}
                      margin="normal"
                      required
                      {...field}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      disabled={isLoading}
                      fullWidth
                      label={t("Email")}
                      margin="normal"
                      required
                      type="email"
                      {...field}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                <Controller
                  name="phone_no"
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      disabled={isLoading}
                      defaultCountry="SA"
                      fullWidth
                      label={t("Phone Number")}
                      margin="normal"
                      required
                      {...field}
                    />
                  )}
                />
                {errors.phone_no && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone_no.message}</FormHelperText>}
                <LoadingButton
                  disabled={isLoading}
                  fullWidth
                  type="submit"
                  size='medium'
                  variant='contained'
                  sx={{ my: 1, backgroundColor: '#0F4B64', '&:hover': { backgroundColor: '#0F4B64' } }}
                >
                  {t("Submit")}
                </LoadingButton>
              </FormControl>
            </form>
          </Stack>

        </Stack>
      </Container>
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
