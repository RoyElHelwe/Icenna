import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { addChiefComplaint } from "../api/practitioner";

const schema = yup.object().shape({
  text: yup.string().required('Details can\'t be empty!'),
});

const defaultValues = {
  text: '',
};

const ChiefComplaintForm = ({
  onClose,
}) => {
  const [text, setText] = useState('');

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    refetch,
    mutate,
    isFetching,
    isPreviousData,
  } = useMutation({
    queryFn: (formData) => addChiefComplaint(formData),
    enabled: false,
  })

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

  const onSubmit = ({ text }) => {
    mutate({ id, text });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              label='Details'
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
        <LoadingButton variant='contained' loading={isFetching} type='submit'>Submit</LoadingButton>
        {onClose && (<Button variant='outlined' sx={{ ml: 3, }} color='secondary' onClick={onClose}>Discard</Button>)}
      </Box>
    </form >
  );
};


export default ChiefComplaintForm;
