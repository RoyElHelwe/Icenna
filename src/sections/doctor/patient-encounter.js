import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { encounterItem } from '../../api/practitioner';
import CustomDialog, { DefaultOptions } from '../../components/custom-dialog';
import Section from '../../components/section';
import ChiefComplaintForm from '../../forms/chief-complaint';
import DiagnosisDescriptionForm from '../../forms/diagnosis-description';
import AddToEncounter from './add-to-encounter';
import Diagnosis from './diagnosis';
import Medications from './medications';
import Procedures from './procedures';

export const PatientEncounters = ({ patientData, setPatientData }) => {
  const [dialogOptions, setDialogOptions] = useState(DefaultOptions);
  const [anchorEl, setAnchorEl] = useState(null);
  const popOpen = Boolean(anchorEl);
  const id = popOpen ? 'simple-popover' : undefined;

  const setOpen = (open) => setDialogOptions({ ...dialogOptions, open, });
  const onClose = () => setDialogOptions({ ...DefaultOptions, });

  const { isLoading, error, data, mutateAsync } = useMutation({
    mutationFn: encounterItem,
    enabled: false,
    onSuccess: (data) => setPatientData(data?.data?.data),
    onMutate: () => setOpen(false),
  });

  const handleCheckout = (e) => {
    console.log('Checkout');
  };

  return (
    <>
      <CustomDialog {...dialogOptions} setOpen={setOpen} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3, }}>
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
          startIcon={popOpen ? <RemoveIcon /> : <AddIcon />}
          aria-describedby={id}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {popOpen ? 'Finish' : 'Add'}
        </LoadingButton>
        <Popover
          id={id}
          open={popOpen}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{ sx: { width: '70%', mt: 3, }, }}
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
            <Typography sx={{ fontWeight: 'bold', }}>Description</Typography>
            <Typography sx={{ mt: 3, mx: 3, }}>{patientData?.diagnosis_description}</Typography>
          </Box>

          <Diagnosis
            data={patientData?.medical_code ?? []}
            state={{ isLoading, }}
            onDelete={(row) => {
              toast.promise(mutateAsync({
                id: patientData?.id,
                t_type: 'delete',
                i_type: 1,
                code: row?.original?.id,
              }), {
                loading: 'Deleting ...',
                success: 'Deleted successfully!',
                error: 'Error deleting!',
              });
            }}
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
              onDelete={(row) => {
                toast.promise(mutateAsync({
                  id: patientData?.id,
                  t_type: 'delete',
                  i_type: 2,
                  code: row?.original?.code,
                }), {
                  loading: 'Deleting ...',
                  success: 'Deleted successfully!',
                  error: 'Error deleting!',
                });
              }}
            />
          ))}
        </Section>
      )}

      {!!patientData?.drugs?.length && (
        <Section title="Medications" withDivider>
          <Medications
            data={patientData?.drugs ?? []}
            state={{ isLoading, }}
            onDelete={(row) => {
              toast.promise(mutateAsync({
                id: patientData?.id,
                t_type: 'delete',
                i_type: 3,
                code: row?.original?.id,
              }), {
                loading: 'Deleting ...',
                success: 'Deleted successfully!',
                error: 'Error deleting!',
              });
            }}
          />
        </Section>
      )}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
        <Button variant='contained' sx={{ borderRadius: 1.5, textTransform: 'none' }} onClick={() => toast.error('Error !!')}>
          Checkout
        </Button>
      </Box>
    </>
  );
};

PatientEncounters.propTypes = {
  patientData: PropTypes.object,
  setPatientData: PropTypes.func,
};
