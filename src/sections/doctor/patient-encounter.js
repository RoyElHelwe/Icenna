import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { checkApproval, encounterCheckout, encounterItem } from '../../api/practitioner';
import { getGeneralSettings } from '../../api/settings';
import AsyncAutocomplete from '../../components/AsyncAutocomplete';
import CustomDialog, { DefaultOptions } from '../../components/custom-dialog';
import Section from '../../components/section';
import ChiefComplaintForm from '../../forms/chief-complaint';
import DiagnosisDescriptionForm from '../../forms/diagnosis-description';
import { useSettings } from '../../hooks/useSettings';
import { pusherClient } from '../../lib/pusher';
import AddToEncounter from './add-to-encounter';
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

  const { settings: ctxSettings } = useSettings();
  const ref = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const popOpen = Boolean(anchorEl);

  const [dialogOptions, setDialogOptions] = useState(DefaultOptions);
  const setOpen = (open) => setDialogOptions({ ...dialogOptions, open, });
  const onClose = () => setDialogOptions({ ...DefaultOptions, });

  const onSuccess = (data, vars, ctx) => setPatientData(data?.data?.data);
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: encounterItem,
    enabled: false,
    onSuccess,
    onMutate: () => setOpen(false),
  });

  const { isLoading: isSubmitting, mutateAsync: submit } = useMutation({
    mutationFn: encounterCheckout,
    enabled: false,
    onSuccess,
  });
  const { isLoading: isChecking, mutateAsync: check } = useMutation({
    mutationFn: checkApproval,
    enabled: false,
    onSuccess,
  });

  const { isLoading: loadingSettings, data: settings, } = useQuery({
    queryKey: ['getSettings'],
    queryFn: () => getGeneralSettings(ctxSettings?.language ?? 'en'),
  });

  const { duration_labels } = settings?.data?.data ?? {};
  const labels = [
    {
      label: 'No Session',
      duration: 0,
    },
    ...duration_labels ?? [],
  ];

  const [duration, setDuration] = useState(0);

  const handleCheckout = (e) => {
    let promise;
    if (patientData?.action === 1) {
      promise = check({ id: patientData?.id });
    } else if (patientData?.action === 3) {
      promise = submit({
        id: patientData?.id,
        ...(duration ? {
          extension: 1,
          duration,
        } : {}),
      });
    } else {
      promise = submit({
        id: patientData?.id,
      });
    }
    toast.promise(promise, {
      loading: 'Loading ...',
      success: 'Success!',
      error: 'Error!',
    });
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
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
          <Button
            variant="outlined"
            sx={{ mr: 3, }}
            onClick={() => setDialogOptions({
              ...DefaultOptions,
              onClose,
              open: true,
              title: 'Write Diagnosis',
              children: (
                <DiagnosisDescriptionForm
                  values={{ id: patientData?.id, text: patientData?.diagnosis_description ?? '', }}
                  onSubmit={(data) => setPatientData(data)}
                  onClose={onClose}
                />
              ),
            })}>
            Write Diagnosis
          </Button>
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
        </Box>

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
            onItemClick={(params) => {
              toast.promise(
                mutateAsync({
                  id: patientData?.id,
                  t_type: 'add',
                  ...params,
                }), {
                loading: 'Adding ...',
                success: 'Added successfully!',
                error: 'Error adding!',
              });
            }}
          />
        </Popover>
      </Box>

      {!!patientData?.chief_complaint?.length && (
        <Section title="Chief Complaint" withDivider>
          <Typography>{patientData?.chief_complaint}</Typography>
        </Section>
      )}

      {!!patientData?.medical_code?.length && (
        <Section title="Diagnosis" withDivider>
          <Box sx={{ mb: 5, }}>
            <Typography sx={{ mt: 3, mx: 3, }}>{patientData?.diagnosis_description}</Typography>
          </Box>

          <Diagnosis
            data={patientData?.medical_code ?? []}
            state={{ isLoading, }}
            actions={[
              {
                name: 'Delete',
                onClick: (row) => toast.promise(mutateAsync({
                  id: patientData?.id, t_type: 'delete', i_type: 1, code: row?.original?.id,
                }), {
                  loading: 'Deleting ...', success: 'Deleted successfully!', error: 'Error deleting!',
                })
              },
            ]}
          />
        </Section>
      )}

      {!!patientData?.procedure?.length && (
        <Section title="Procedures" withDivider>
          {patientData?.procedure?.map((p) => (
            <Procedures
              key={p.approval_id}
              data={p.items ?? []}
              state={{ isLoading, }}
              actions={[
                {
                  name: 'Delete',
                  onClick: (row) => toast.promise(mutateAsync({
                    id: patientData?.id, t_type: 'delete', i_type: 2, code: row?.original?.code,
                  }), {
                    loading: 'Deleting ...', success: 'Deleted successfully!', error: 'Error deleting!',
                  })
                },
              ]}
            />
          ))}
        </Section>
      )}

      {!!patientData?.drugs?.length && (
        <Section title="Medications" withDivider>
          <Medications
            data={patientData?.drugs ?? []}
            state={{ isLoading, }}
            actions={[
              {
                name: 'Delete',
                onClick: (row) => toast.promise(mutateAsync({
                  id: patientData?.id, t_type: 'delete', i_type: 3, code: row?.original?.id,
                }), {
                  loading: 'Deleting ...', success: 'Deleted successfully!', error: 'Error deleting!',
                })
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
