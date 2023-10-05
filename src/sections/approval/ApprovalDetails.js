import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getApprovalDetails, submitApproval, updateApproval } from '../../api/rcm';
import Section from '../../components/section';
import EncounterAddButton from '../patient/EncounterAddButton';
import Diagnosis from '../patient/diagnosis';
import Procedures from '../patient/procedures';
import Errors from './Errors';

const ApprovalDetails = ({ id, ...props }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const ref = useRef(null);
  const [error, setError] = useState();

  const onSuccess = (data, vars, ctx) => setAppDetails(data?.data?.data);
  const onSettled = (data, err, vars, ctx) => {
    if (!data?.data?.data?.medical_codes?.medical_codes?.find((mc) => mc.type === 'Principal')) {
      setError("Please choose just 1 medical code principal");
    } else {
      setError(null);
    }
  };

  const { data } = useQuery({
    queryKey: ['get_approval_details', id],
    queryFn: getApprovalDetails,
    onSettled,
  });

  const { mutate: update } = useMutation({
    mutationFn: updateApproval,
    onSettled,
  });
  const { isLoading: isSubmitting, mutate: submit } = useMutation({
    mutationFn: submitApproval,
    onSuccess,
  });

  const [appDetails, setAppDetails] = useState();
  useEffect(() => {
    setAppDetails(data?.data?.data);
  }, [data]);

  const editable = ['Error', 'Rejected', 'Partially Approved'].includes(appDetails?.status);

  const handleGoBack = (e) => {
    if (window.history?.length > 2) {
      router.back();
    } else {
      router.push('/calendar');
    }
  };

  useEffect(() => {
    const medical_codes = appDetails?.medical_codes?.medical_codes?.map((mc) => ({
      medical_code_id: mc.id, diagnosis_type: mc.type?.toLowerCase(),
    })) ?? [];
    const procedures = appDetails?.procedures?.items?.map((p) => ({
      service_item: p.code, qty: 1, price: p.price, tooth_code: ''
    })) ?? [];

    if (appDetails?.id) {
      update({
        id: appDetails?.id,
        medical_codes,
        procedures,
      })
    }
  }, [appDetails]);

  return (
    <Box sx={{ px: 5, my: 3, width: '100%' }}>
      <Box ref={ref} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
        <Box flexGrow={1} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton size="large" onClick={handleGoBack}>
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {editable && (
          <EncounterAddButton
            parentRef={ref}
            id={appDetails?.encounter_id}
            department={appDetails?.medical_department}
            onAdd={(sec, item) => setAppDetails((prev) => {
              if (sec.i_type === 1) {
                const medical_codes = {
                  ...prev?.medical_codes,
                  medical_codes: [
                    ...prev?.medical_codes?.medical_codes,
                    item,
                  ],
                };

                return { ...prev, medical_codes };
              } else if (sec.i_type === 2) {
                const procedures = {
                  ...prev?.procedures,
                  items: [
                    ...prev?.procedures?.items,
                    item,
                  ],
                };

                return { ...prev, procedures };
              }

              return prev;
            })}
          />
        )}
      </Box>

      {!!appDetails?.medical_codes?.medical_codes?.length && (
        <Section title="Diagnosis" withDivider>
          <Diagnosis
            rows={appDetails?.medical_codes?.medical_codes ?? []}
            editable={editable}
            visibleColumns={['error']}
            {...(editable && {
              actions: [{
                name: t('Remove'),
                onClick: (row) => setAppDetails((prev) => {
                  const medical_codes = prev.medical_codes?.medical_codes;
                  const index = medical_codes.findIndex((i) => i.id === row.id);

                  const new_medical_codes = medical_codes.slice(0, index).concat(medical_codes.slice(index + 1));

                  return {
                    ...prev,
                    medical_codes: {
                      ...prev.medical_codes,
                      medical_codes: new_medical_codes,
                    }
                  };
                }),
              }],
              onRowChange: (row, params) => setAppDetails((prev) => {
                const medical_codes = prev.medical_codes?.medical_codes;
                const index = medical_codes.findIndex((i) => i.id === row.id);

                const new_medical_codes = [
                  ...medical_codes.slice(0, index),
                  row,
                  ...medical_codes.slice(index + 1),
                ];

                return {
                  ...prev,
                  medical_codes: {
                    ...prev.medical_codes,
                    medical_codes: new_medical_codes,
                  }
                };
              }),
            })}
            renderFooter={!!appDetails?.medical_codes?.errors?.length && (
              <Box sx={{ m: 5, }}>
                <Errors rows={appDetails?.medical_codes?.errors ?? []} />
              </Box>
            )}
          />
        </Section>
      )}

      {!!appDetails?.procedures?.items.length && (
        <Section title="Procedures" withDivider>
          <Procedures
            rows={appDetails?.procedures?.items ?? []}
            editable={editable}
            visibleColumns={['error']}
            nonEditableColumns={['status']}
            {...(editable && {
              actions: [{
                name: t('Remove'),
                onClick: (row) => setAppDetails((prev) => {
                  const items = prev.procedures?.items;
                  const index = items.findIndex((i) => i.id === row.id);

                  const new_items = items.slice(0, index).concat(items.slice(index + 1));

                  return {
                    ...prev,
                    procedures: {
                      ...prev.procedures,
                      items: new_items,
                    }
                  };
                }),
              },],
            })}
            onRowChange={(row, params) => setAppDetails((prev) => {
              const items = prev.procedures?.items;
              const index = items.findIndex((i) => i.id === row.id);

              const new_items = [
                ...items.slice(0, index),
                row,
                ...items.slice(index + 1),
              ];

              return {
                ...prev,
                procedures: {
                  ...prev.procedures,
                  items: new_items,
                }
              };
            })}
            renderFooter={!!appDetails?.procedures?.errors?.length && (
              <Box sx={{ m: 5, }}>
                <Errors rows={appDetails?.procedures?.errors ?? []} />
              </Box>
            )}
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
          <Errors rows={appDetails?.errors ?? []} />
        </Section>
      )}

      {editable && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
          <LoadingButton
            variant='contained'
            sx={{ borderRadius: 1.5, textTransform: 'none', px: 15, }}
            loading={isSubmitting}
            onClick={(e) => submit({ id: appDetails?.id })}
            disabled={!!error}
          >
            {error ? error : 'Submit'}
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};

export default ApprovalDetails;