import { Divider, Grid, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LandingLayout from '../layouts/LandingLayout';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>

      <Grid container justifyContent="center" spacing={5} sx={{ px: 3, }}>
        <Grid item xs={12} lg={6}>
          <Stack direction="column" spacing={5} sx={{ width: '90%' }}>
            <Typography variant="h2">
              Patient Terms and Conditions
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
              These terms and conditions outline the rules and regulations for the use of iCenna's Website, located at icenna.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use icenna.com if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
          <img src="/assets/Terms-Agreement-1.png" height={500} width={500} />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 10 }} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="column" spacing={5} sx={{ width: '90%' }}>
            <Typography variant="h2">
              Clinic Terms and Conditions
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
              These terms and conditions outline the rules and regulations for the use of iCenna's Website, located at icenna.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use icenna.com if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
          <img src="/assets/Terms-Agreement-2.png" height={500} width={500} />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 10 }} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="column" spacing={5} sx={{ width: '90%' }}>
            <Typography variant="h2">
              Practitioner Terms and Conditions
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', alignContent: 'center' }}>
              These terms and conditions outline the rules and regulations for the use of iCenna's Website, located at icenna.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use icenna.com if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
          <img src="/assets/Terms-Agreement-1.png" height={500} width={500} />
        </Grid>
      </Grid>
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
