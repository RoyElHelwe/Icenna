import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from 'yup';
import { addChiefComplaint } from "../api/practitioner";

const ChiefComplaintForm = ({
  values,
  onSubmit,
  onClose,
}) => {
  const { t } = useTranslation();

  const {
    isLoading,
    mutate,
  } = useMutation({
    mutationFn: addChiefComplaint,
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

  const schema = yup.object().shape({
    text: yup.string().required(t("Chief Complaint can't be empty!")),
  });

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
              label={t('Chief Complaint')}
              multiline
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
        <LoadingButton variant='contained' loading={isLoading} type='submit'>{t('Update')}</LoadingButton>
      </Box>
    </form >
  );
};


export default ChiefComplaintForm;
