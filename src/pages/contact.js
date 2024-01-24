import { Button, Container, Grid, Link, Modal, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { getWebsite } from '../api/Website';
import LandingLayout from '../layouts/LandingLayout';
import Image from 'next/image';
import ContactModel from 'src/components/contact'
import React from 'react';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      <Container maxWidth="lg" sx={{ pt: "72px" }}>
        <Stack direction={{ xs: "column", md: 'row' }} spacing={4} justifyContent={'space-between'} >
          <Stack spacing={{ xs: "16px", md: "24px" }} >
            <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '4.5rem', }, fontWeight: 'bold', textWrap: 'nowrap' }}>
              Contact Us
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem', } }}>
              We are here to help you
            </Typography>
            <Button variant='contained' color='primary' sx={{
                                backgroundColor: '#0F4B64',
                                color: 'white',
                                //  onHover
                                '&:hover': {
                                    backgroundColor: '#0F4B64',
                                },
                            }}
                                onClick={handleOpen}
                            >
                                Contact Us
                            </Button>
          </Stack>
          <div style={{ maxWidth: '100%', height: 'auto' }}>
            <Image
              src="/assets/landing/contactus.png"
              alt="support"
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ContactModel handleClose={handleClose} />
        </Modal>
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
