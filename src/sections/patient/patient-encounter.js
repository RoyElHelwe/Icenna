
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { checkApproval, encounterCheckout, encounterItem } from '../../api/practitioner';
import { getGeneralSettings } from '../../api/settings';
import { AsyncAutocomplete } from '../../components/AsyncAutocomplete';
import { LinkTypography } from '../../components/LinkTypography';
import Translations from '../../components/Translations';
import CustomDialog, { DefaultOptions } from '../../components/custom-dialog';
import Section from '../../components/section';
import ChiefComplaintForm from '../../forms/chief-complaint';
import DiagnosisDescriptionForm from '../../forms/diagnosis-description';
import { useSettings } from '../../hooks/useSettings';
import { pusherClient } from '../../lib/pusher';
import { CommunicationRequest } from './CommunicationRequest';
import EncounterAddButton from './EncounterAddButton';
import Diagnosis from './diagnosis';
import Medications from './medications';
import Procedures from './procedures';

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

  const { t } = useTranslation();
  const { settings: ctxSettings } = useSettings();

  const ref = useRef(null);

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
    { label: t('No Session'), duration: 0, },
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
      return t('Ask for Approval');
    } else if (patientData?.action === 2) {
      const total = patientData?.total_required_to_pay ?? 0;
      const rounded = Number(total.toFixed(2));
      const formattedPrice = rounded.toLocaleString('en-US');

      return `${t('Checkout for Pay')} (${formattedPrice.includes('.') ? formattedPrice : formattedPrice + '.00'} ${t('SAR')})`;
    } else {
      return t('Submit');
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
            title: t('Write Chief Complaint'),
            children: (
              <ChiefComplaintForm
                values={{ id: patientData?.id, text: patientData?.chief_complaint ?? '', }}
                onSubmit={(data) => setPatientData(data)}
                onClose={onClose}
              />
            ),
          })}>
          {`${t('Add')} ${t("Chief Complaint")}`}
        </Button>

        <EncounterAddButton
          parentRef={ref}
          id={patientData?.id}
          onAdd={({ i_type }, { id, code, dosage, period, body_site, ...rest }) => updateEncItem({
            id: patientData?.id, t_type: 'add', i_type,
            body_site: body_site?.code,
            code: i_type === 3 ? id : code,
            dosage: dosage?.id,
            period: period?.id,
            route: i_type === 3 ? 'Oral' : undefined,
            ...rest,
          })}
        />
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
            {t(isWritingDiagnosis ? 'Done' : 'Write Diagnosis')}
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
                  name: t('Delete'),
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
              department={patientData?.department}
              // Give header only for the first table
              {...(i > 0 ? { muiTableHeadCellProps: { sx: { display: 'none' } } } : {})}
              editable
              actions={[
                {
                  name: t('Delete'),
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
                name: t('Delete'),
                onClick: (row) => updateEncItem({
                  id: patientData?.id, i_type: 3, t_type: 'delete', code: row?.original?.id,
                }),
              },
            ]}
            onUpdate={(row, params) => updateEncItem({
              id: patientData?.id, i_type: 3, code: row.original.id, t_type: 'update', ...params,
            })}
          />
        </Section>
      )}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
        {patientData?.action === 3 && (
          <AsyncAutocomplete
            label={t('Duration')}
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
        <LoadingButton
          variant='contained'
          sx={{ borderRadius: 1.5, textTransform: 'none', px: 15, }}
          loading={isSubmitting || isChecking}
          disabled={patientData?.action === 2 && !patientData?.push_payment}
          onClick={handleCheckout}
        >
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
