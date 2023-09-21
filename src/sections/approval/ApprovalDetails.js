import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getApprovalDetails, submitApproval, updateApproval } from '../../api/rcm';
import Section from '../../components/section';
import EncounterAddButton from '../patient/EncounterAddButton';
import Diagnosis from '../patient/diagnosis';
import Medications from '../patient/medications';
import Procedures from '../patient/procedures';
import Errors from './Errors';

const ApprovalDetails = ({ id, ...props }) => {
  const { t } = useTranslation();

  const ref = useRef(null);

  const onSuccess = (data, vars, ctx) => setAppDetails(data?.data?.data);

  const { data } = useQuery({
    queryKey: ['get_approval_details', id],
    queryFn: getApprovalDetails,
  });
  const { mutate: update } = useMutation({
    mutationFn: updateApproval,
    // onSuccess,
  });
  const { mutate: submit } = useMutation({
    mutationFn: submitApproval,
    // onSuccess,
  });

  const [appDetails, setAppDetails] = useState();
  useEffect(() => {
    setAppDetails(data?.data?.data);
  }, [data]);

  const editable = ['Error', 'Rejected', 'Partially Approved'].includes(appDetails?.status);

  return (
    <Box sx={{ mx: 5, my: 3 }}>
      {editable && (
        <Box ref={ref} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
          <EncounterAddButton
            parentRef={ref}
            id={appDetails?.encounter_id}
            onAdd={(sec, item) => setAppDetails((prev) => {
              if (sec.i_type === 1) {
                return { ...prev, medical_codes: [...(prev.medical_codes ?? []), item] }
              } else if (sec.i_type === 2) {
                return { ...prev, procedures: [...(prev.procedures ?? []), item] }
              } else if (sec.i_type === 3) {
                return { ...prev, drugs: [...(prev.drugs ?? []), item] }
              }

              return prev;
            })}
          />
        </Box>
      )}
      {!!appDetails?.medical_codes?.length && (
        <Section title="Diagnosis" withDivider>
          <Diagnosis
            data={appDetails?.medical_codes ?? []}
            initialState={{ density: 'compact' }}
            {...(editable && {
              actions: [{
                name: t('Delete'),
                onClick: (row) => setAppDetails((prev) => {
                  const medical_codes = prev.medical_codes?.filter((mc) => mc.id !== row?.original?.id);

                  return { ...prev, medical_codes };
                }),
              },]
            })}
          />
        </Section>
      )}

      {!!appDetails?.procedures?.length && (
        <Section title="Procedures" withDivider>
          <Procedures
            data={appDetails?.procedures ?? []}
            initialState={{ density: 'compact' }}
            {...(editable && {
              actions: [{
                name: t('Delete'),
                onClick: (row) => setAppDetails((prev) => {
                  const procedures = prev.procedures?.filter((p) => p.id !== row?.original?.id);

                  return { ...prev, procedures };
                }),
              },]
            })}
          />
        </Section>
      )}

      {!!appDetails?.total && (
        <Section title="Total" withDivider>
          <Card sx={{ zIndex: 1, }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("CoPay")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.co_pay?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Tax")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.tax?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Benefit")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.benefit?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("PatientShare")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.patient_share?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Submitted")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.submitted?.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
                    {t("Eligible")}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, }}>{appDetails?.total?.eligible?.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Section>
      )}

      {!!appDetails?.errors?.length && (
        <Section title="Errors" withDivider>
          <Errors
            data={appDetails?.errors ?? []}
            initialState={{ density: 'compact' }}
          />
        </Section>
      )}

      {editable && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
          <LoadingButton
            variant='contained'
            sx={{ borderRadius: 1.5, textTransform: 'none', px: 15, }}
            loading={false}
            onClick={submit}
          >
            Submit
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};

export default ApprovalDetails;