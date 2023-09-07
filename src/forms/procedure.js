import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from 'yup';
import { getDentalCharting } from "../api/practitioner";
import { AsyncAutocomplete } from "../components/AsyncAutocomplete";

const ProcedureForm = ({
  values,
  onSubmit,
  submitLabel,
}) => {
  const { t } = useTranslation();

  const { isLoading, error, data, } = useQuery({
    queryKey: ['getDentalCharting'],
    queryFn: getDentalCharting,
  });

  const dentalCharting = data?.data?.data ?? [];

  const defaultValues = {
    body_site: dentalCharting?.[0] ?? null,
    ...values,
  };

  const schema = yup.object().shape({
    body_site: yup.object().typeError('Error').required(t('This field is required!')),
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
            name='body_site'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <AsyncAutocomplete
                fullWidth
                label={t('Tooth code')}
                loading={isLoading}
                isOptionEqualToValue={(o, v) => o?.id === v?.id}
                getOptionLabel={(o) => o?.description ? `${o?.code} - ${o?.description}` : ''}
                options={dentalCharting}
                value={value}
                onBlur={onBlur}
                onChange={(e, v) => onChange(v)}
                inputProps={{
                  error: !!errors.body_site,
                }}
              />
            )}
          />
          {errors.body_site && <FormHelperText sx={{ color: 'error.main' }}>{errors.body_site.message}</FormHelperText>}
        </FormControl>

        <LoadingButton variant='contained' loading={isLoading} type='submit'>{t(submitLabel ?? 'Add')}</LoadingButton>
      </Box>
    </form >
  );
};


export default ProcedureForm;
