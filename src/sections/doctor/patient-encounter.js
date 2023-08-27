import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { checkApproval, encounterCheckout, encounterItem } from '../../api/practitioner';
import { getGeneralSettings } from '../../api/settings';
import { AsyncAutocomplete } from '../../components/AsyncAutocomplete';
import Translations from '../../components/Translations';
import CustomDialog, { DefaultOptions } from '../../components/custom-dialog';
import Section from '../../components/section';
import ChiefComplaintForm from '../../forms/chief-complaint';
import DiagnosisDescriptionForm from '../../forms/diagnosis-description';
import { useSettings } from '../../hooks/useSettings';
import { pusherClient } from '../../lib/pusher';
import { CommunicationRequest } from './CommunicationRequest';
import { AddToEncounter } from './add-to-encounter';
import Diagnosis from './diagnosis';
import Medications from './medications';
import Procedures from './procedures';

export const LinkTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

export const PatientEncounter = ({ patientData, setPatientData }) => {
  useEffect(() => {
    const channel = pusherClient.subscribe('iCenna');

    channel.bind('patient_encounter_updates', (data) => {
      setPatientData(data.message);
    });

    return () => {
      pusherClient.unsubscribe('iCenna');
    };
  }, []);

  const { settings: ctxSettings } = useSettings();
  const ref = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const popOpen = Boolean(anchorEl);

  const [dialogOptions, setDialogOptions] = useState(DefaultOptions);
  const setOpen = (open) => setDialogOptions({ ...dialogOptions, open, });
  const onClose = () => setDialogOptions({ ...DefaultOptions, });

  const onSuccess = (data, vars, ctx) => setPatientData(data?.data?.data);
  const { isLoading, mutate: updateEncItem } = useMutation({
    mutationFn: encounterItem, enabled: false, onSuccess, onMutate: () => setOpen(false),
  });

  const { isLoading: isSubmitting, mutate: submit } = useMutation({
    mutationFn: encounterCheckout, enabled: false, onSuccess,
  });
  const { isLoading: isChecking, mutate: check } = useMutation({
    mutationFn: checkApproval, enabled: false, onSuccess,
  });

  const { isLoading: loadingSettings, data: settings, } = useQuery({
    queryKey: ['getSettings'],
    queryFn: () => getGeneralSettings(ctxSettings?.language ?? 'en'),
  });

  const { duration_labels } = settings?.data?.data ?? {};
  const labels = [
    { label: 'No Session', duration: 0, },
    ...duration_labels ?? [],
  ];

  const [isWritingDiagnosis, setIsWritingDiagnosis] = useState(false);
  const formRef = useRef();

  const [duration, setDuration] = useState(0);

  const handleCheckout = (e) => {
    if (patientData?.action === 1) {
      check({ id: patientData?.id });
    } else if (patientData?.action === 3) {
      submit({
        id: patientData?.id,
        ...(duration ? {
          extension: 1,
          duration,
        } : {}),
      });
    } else {
      submit({ id: patientData?.id, });
    }
  };

  const getCheckoutText = () => {
    if (patientData?.action === 1) {
      return 'Ask for Approval';
    } else if (patientData?.action === 2) {
      const total = patientData?.total_required_to_pay ?? 0;
      const rounded = Number(total.toFixed(2));
      const formattedPrice = rounded.toLocaleString('en-US');

      return `Checkout for Pay (${formattedPrice.includes('.') ? formattedPrice : formattedPrice + '.00'} SAR)`;
    } else {
      return 'Submit';
    }
  };

  return (
    <>
      <CustomDialog {...dialogOptions} setOpen={setOpen} />

      <Box ref={ref} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3, }}>
        <Button
          variant="outlined"
          sx={{ mr: 3, }}
          onClick={() => setDialogOptions({
            ...DefaultOptions,
            onClose,
            open: true,
            title: 'Write Chief Complaint',
            children: (
              <ChiefComplaintForm
                values={{ id: patientData?.id, text: patientData?.chief_complaint ?? '', }}
                onSubmit={(data) => setPatientData(data)}
                onClose={onClose}
              />
            ),
          })}>
          Chief Complaint
        </Button>

        <LoadingButton
          variant="contained"
          startIcon={popOpen ? <CloseIcon /> : <AddIcon />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {popOpen ? 'Finish' : 'Add'}
        </LoadingButton>
        <Popover
          open={popOpen}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{ sx: { width: ref.current?.clientWidth + 30 ?? '', mt: 3, }, }}
        >
          <AddToEncounter
            id={patientData?.id}
            onItemClick={(params) => updateEncItem({
              id: patientData?.id, t_type: 'add', ...params,
            })}
          />
        </Popover>
      </Box>

      {!!patientData?.chief_complaint?.length && (
        <Section title="Chief Complaint" withDivider>
          <Typography sx={{ mt: 3, mx: 3, }}>{patientData?.chief_complaint}</Typography>
        </Section>
      )}

      <Section title={(
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 3, }}>
            <Translations text='Diagnosis' />
          </Typography>
          <LinkTypography sx={{ p: 1, }} onClick={() => {
            if (isWritingDiagnosis) {
              formRef?.current?.submitForm();
            } else {
              setIsWritingDiagnosis((prev) => !prev);
            }
          }}>
            {isWritingDiagnosis ? 'Done' : 'Write Diagnosis'}
          </LinkTypography>
        </Box>
      )} withDivider>
        {!!patientData?.medical_code?.length && (
          <>
            <Box sx={{ mb: 5, }}>
              {isWritingDiagnosis ? (
                <DiagnosisDescriptionForm
                  reference={formRef}
                  values={{ id: patientData?.id, text: patientData?.diagnosis_description ?? '', }}
                  onSubmit={(data) => {
                    setIsWritingDiagnosis((prev) => !prev);
                    setPatientData(data);
                  }}
                />
              ) : (
                <Typography sx={{ mt: 3, mx: 3, }}>{patientData?.diagnosis_description}</Typography>
              )}
            </Box>

            <Diagnosis
              data={patientData?.medical_code ?? []}
              actions={[
                {
                  name: 'Delete',
                  onClick: (row) => updateEncItem({
                    id: patientData?.id, t_type: 'delete', i_type: 1, code: row?.original?.id,
                  }),
                },
              ]}
            />
          </>
        )}
      </Section>

      {!!patientData?.procedure?.length && (
        <Section title="Procedures" withDivider>
          {patientData?.procedure?.map((p, i) => (
            <Procedures
              key={p.approval_id}
              data={p.items ?? []}
              {...(i > 0 ? { muiTableHeadCellProps: { sx: { display: 'none' } } } : {})}
              actions={[
                {
                  name: 'Delete',
                  onClick: (row) => updateEncItem({
                    id: patientData?.id, record_id: row.original.id, i_type: 2, code: row.original.code, t_type: 'delete',
                  }),
                },
              ]}
              {...(p.communication_request && {
                enableBottomToolbar: true,
                renderBottomToolbar: () => (<CommunicationRequest data={p.communication_request} onSubmit={(data) => setPatientData(data)} />)
              })}
              onUpdate={(row, params) => updateEncItem({
                id: patientData?.id, record_id: row.original.id, i_type: 2, code: row.original.code, t_type: 'update', ...params,
              })}
            />
          ))}
        </Section>
      )}

      {!!patientData?.drugs?.length && (
        <Section title="Medications" withDivider>
          <Medications
            data={patientData?.drugs ?? []}
            actions={[
              {
                name: 'Delete',
                onClick: (row) => updateEncItem({
                  id: patientData?.id, t_type: 'delete', i_type: 3, code: row?.original?.id,
                }),
              },
            ]}
          />
        </Section>
      )}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
        {patientData?.action === 3 && (
          <AsyncAutocomplete
            label='Duration'
            loading={loadingSettings}
            disableClearable
            isOptionEqualToValue={(o, v) => o?.label === v?.label}
            getOptionLabel={(o) => o?.label ?? ''}
            options={labels}
            value={labels.find((l) => l.duration === duration)}
            onChange={(e, v) => setDuration(v.duration)}
            sx={{ mr: 15, width: 450, }}
          />
        )}
        <LoadingButton variant='contained' sx={{ borderRadius: 1.5, textTransform: 'none', px: 15, }} loading={isSubmitting || isChecking} disabled={patientData?.action === 2 && !patientData?.push_payment} onClick={handleCheckout}>
          {getCheckoutText()}
        </LoadingButton>
      </Box>
    </>
  );
};

PatientEncounter.propTypes = {
  patientData: PropTypes.object,
  setPatientData: PropTypes.func,
};
