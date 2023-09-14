import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getApprovalDetails } from '../../api/rcm';
import CenteredCircularProgress from '../../components/centered-circular-progress';
import Section from '../../components/section';
import Diagnosis from '../patient/diagnosis';
import Procedures from '../patient/procedures';
import Errors from './Errors';

const ApprovalDetails = ({ id, ...props }) => {
  const { t } = useTranslation();

  const { isLoading, data } = useQuery({
    queryKey: ['get_approval_details', id],
    queryFn: getApprovalDetails,
  });

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  const { medical_codes, procedures, total, errors } = data?.data?.data ?? {};

  return (
    <Box sx={{ mx: 5, my: 3 }}>
      {!!medical_codes?.length && (
        <Section title="Diagnosis" withDivider>
          <Diagnosis
            data={medical_codes ?? []}
            initialState={{ density: 'compact' }}
          />
        </Section>
      )}

      {!!procedures?.length && (
        <Section title="Procedures" withDivider>
          <Procedures
            data={procedures ?? []}
            initialState={{ density: 'compact' }}
          />
        </Section>
      )}

      {!!total && (
        <Section title="Total" withDivider>
          <Card sx={{ zIndex: 1, }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("CoPay")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.co_pay?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Tax")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.tax?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Benefit")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.benefit?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("PatientShare")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.patient_share?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Submitted")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.submitted?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Eligible")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{total?.eligible?.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Section>
      )}

      {!!errors?.length && (
        <Section title="Errors" withDivider>
          <Errors
            data={errors ?? []}
            initialState={{ density: 'compact' }}
          />
        </Section>
      )}
    </Box>
  );
};

export default ApprovalDetails;