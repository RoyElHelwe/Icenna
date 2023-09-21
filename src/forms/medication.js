import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from 'yup';
import { getGeneralSettings } from "../api/settings";
import { AsyncAutocomplete } from "../components/AsyncAutocomplete";
import { useSettings } from "../hooks/useSettings";


const MedicationForm = ({
  values,
  onSubmit,
  submitLabel,
}) => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { isLoading, error, data, } = useQuery({
    queryKey: ['getSettings'],
    queryFn: () => getGeneralSettings(settings.language ?? 'en'),
  });

  const { dosage, dosage_period } = data?.data?.data ?? {};

  const defaultValues = {
    dose: 1,
    dosage: dosage?.[0] ?? null,
    period: dosage_period?.[0] ?? null,
    ...values,
  };

  const schema = yup.object().shape({
    dose: yup.number().typeError(t('Dose must be a number')).required(t('This field is required!')),
    dosage: yup.object().typeError(t('Error')).required(t('This field is required!')),
    period: yup.object().typeError(t('Error')).required(t('This field is required!')),
  });

  const { control, handleSubmit, formState: { errors, }, reset, } = useForm({
    defaultValues, mode: 'onSubmit', resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(defaultValues);
  }, [reset, data]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit?.(data))}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, }}>
        <FormControl fullWidth>
          <Controller
            name='dose'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                fullWidth
                label={t('Dose')}
                type='number'
                InputProps={{ inputProps: { min: 0, } }}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={!!errors.dose}
              />
            )}
          />
          {errors.dose && <FormHelperText sx={{ color: 'error.main' }}>{errors.dose.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='dosage'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <AsyncAutocomplete
                fullWidth
                label={t('Repeat')}
                name='dosage'
                loading={isLoading}
                isOptionEqualToValue={(o, v) => o?.id === v?.id}
                getOptionLabel={(o) => o?.name ?? ''}
                options={dosage ?? []}
                value={value}
                onBlur={onBlur}
                onChange={(e, v) => onChange(v)}
                inputProps={{
                  error: !!errors.dosage,
                }}
              />
            )}
          />
          {errors.dosage && <FormHelperText sx={{ color: 'error.main' }}>{errors.dosage.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='period'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <AsyncAutocomplete
                fullWidth
                label={t('Period')}
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

        <LoadingButton variant='contained' loading={isLoading} type='submit'>{t(submitLabel ?? 'Add')}</LoadingButton>
      </Box>
    </form >
  );
};


export default MedicationForm;
