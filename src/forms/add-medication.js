import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { getGeneralSettings } from "../api/settings";
import AsyncAutocomplete from "../components/AsyncAutocomplete";
import { useSettings } from "../hooks/useSettings";

const schema = yup.object().shape({
  dose: yup.number().typeError('Dose must be a number').required('Does is required!'),
  repeat: yup.object().typeError('Error').required('Repeat is required!'),
  period: yup.object().typeError('Error').required('Period is required!'),
});

const AddMedicationForm = ({
  values,
  onClose,
  onSubmit,
}) => {
  const { settings } = useSettings();
  const { isLoading, error, data, } = useQuery({
    queryKey: ['getSettings'],
    queryFn: () => getGeneralSettings(settings.language ?? 'en'),
  });

  const { dosage, dosage_period } = data?.data?.data ?? {};

  const defaultValues = {
    dose: 1,
    repeat: dosage?.[0] ?? null,
    period: dosage_period?.[0] ?? null,
    ...values,
  };

  const { control, handleSubmit, formState: { errors, }, reset, } = useForm({
    defaultValues, mode: 'onSubmit', resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(defaultValues);
  }, [reset, data]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit?.(data))}>
      <FormControl fullWidth sx={{ mb: 6, }}>
        <Controller
          name='dose'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              fullWidth
              label='Dose'
              type='number'
              InputProps={{ inputProps: { min: 0, } }}
              placeholder='3'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={!!errors.dose}
            />
          )}
        />
        {errors.dose && <FormHelperText sx={{ color: 'error.main' }}>{errors.dose.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 6, }}>
        <Controller
          name='repeat'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <AsyncAutocomplete
              fullWidth
              label='Repeat'
              loading={isLoading}
              isOptionEqualToValue={(o, v) => o?.id === v?.id}
              getOptionLabel={(o) => o?.name ?? ''}
              options={dosage ?? []}
              value={value}
              onBlur={onBlur}
              onChange={(e, v) => onChange(v)}
              inputProps={{
                error: !!errors.repeat,
              }}
            />
          )}
        />
        {errors.repeat && <FormHelperText sx={{ color: 'error.main' }}>{errors.repeat.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 20, }}>
        <Controller
          name='period'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <AsyncAutocomplete
              fullWidth
              label='Period'
              loading={isLoading}
              isOptionEqualToValue={(o, v) => o?.id === v?.id}
              getOptionLabel={(o) => o?.name ?? ''}
              options={dosage_period ?? []}
              value={value}
              onBlur={onBlur}
              onChange={(e, v) => onChange(v)}
              inputProps={{
                error: !!errors.period,
              }}
            />
          )}
        />
        {errors.period && <FormHelperText sx={{ color: 'error.main' }}>{errors.period.message}</FormHelperText>}
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
        <LoadingButton variant='contained' loading={isLoading} type='submit'>Submit</LoadingButton>
        {onClose && (<Button variant='outlined' sx={{ ml: 3, }} color='secondary' onClick={onClose}>Discard</Button>)}
      </Box>
    </form >
  );
};


export default AddMedicationForm;
