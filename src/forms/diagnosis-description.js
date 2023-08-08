import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { addDiagnosisDescription } from "../api/practitioner";

const schema = yup.object().shape({
  text: yup.string().required('Diagnosis can\'t be empty!'),
});

const DiagnosisDescriptionForm = ({
  values,
  onClose,
  onSubmit,
}) => {
  const {
    isLoading,
    mutate,
  } = useMutation({
    mutationFn: addDiagnosisDescription,
    enabled: false,
    onSuccess: (data) => {
      toast.success('Updated Successfully!');
      onSubmit?.(data?.data?.data);
    },
    onError: () => toast.error('Error updating!'),
    onSettled: () => onClose?.(),
  });

  const defaultValues = {
    id: '',
    text: '',
    ...values,
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(({ id, text }) => mutate({ id, text }))}>
      <FormControl
        fullWidth
        sx={{ mb: 4 }}>
        <Controller
          name='text'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              fullWidth
              label='Diagnosis'
              multiline
              placeholder='Dental examination'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={!!errors.text}
            />
          )}
        />
        {errors.text && <FormHelperText sx={{ color: 'error.main' }}>{errors.text.message}</FormHelperText>}
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
        <LoadingButton variant='contained' loading={isLoading} type='submit'>Submit</LoadingButton>
      </Box>
    </form >
  );
};


export default DiagnosisDescriptionForm;
