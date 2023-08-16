import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { addDiagnosisDescription } from "../api/practitioner";

const schema = yup.object().shape({
  text: yup.string(),
});

const DiagnosisDescriptionForm = ({
  values,
  onClose,
  onSubmit,
  reference,
}) => {
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(({ id, text }) => mutate({ id, text }))();
    }
  }));

  const { isLoading, mutate, } = useMutation({
    mutationFn: addDiagnosisDescription,
    enabled: false,
    onSuccess: (data) => {
      onSubmit?.(data?.data?.data);
    },
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
        sx={{ mb: 4, width: '50%', }}>
        <Controller
          name='text'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              fullWidth
              multiline
              placeholder='Dental examination'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={!!errors.text}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isLoading && <CircularProgress size={25} />}
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        {errors.text && <FormHelperText sx={{ color: 'error.main' }}>{errors.text.message}</FormHelperText>}
      </FormControl>

      {!reference && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', }}>
          <LoadingButton variant='contained' loading={isLoading} type='submit'>Update</LoadingButton>
        </Box>
      )}
    </form >
  );
};


export default DiagnosisDescriptionForm;
