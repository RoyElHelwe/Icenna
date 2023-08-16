import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormHelperText, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { sendReply } from "../../api/practitioner";

const schema = yup.object().shape({
  text: yup.string().required('Reply is required!'),
});

export const CommunicationRequest = ({ data: { id, description, }, onSubmit, }) => {
  const { isLoading, mutate, } = useMutation({
    mutationFn: sendReply,
    enabled: false,
    onSuccess: (data) => {
      onSubmit?.(data?.data?.data);
    },
  });

  const defaultValues = { id, text: '', };

  const { control, handleSubmit, formState: { errors, }, } = useForm({
    defaultValues, mode: 'onSubmit', resolver: yupResolver(schema),
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (files) => {
    if (files.length === 0) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  return (
    <Box sx={{ mx: 5, pb: 3, }}>
      <form onSubmit={handleSubmit(({ id, text }) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('text', text);
        selectedFiles.forEach((file, i) => {
          formData.append(`attachment[${i}]`, file);
        });
        mutate(formData);
      })}>
        <Stack direction="row" spacing={4} sx={{ mb: 3, }} alignItems="center">
          <Typography sx={{ color: 'red' }}>Communication Request:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>{description}</Typography>
          <MuiFileInput multiple value={selectedFiles} onChange={handleFileChange} />

          <LoadingButton variant="contained" loading={isLoading} endIcon={<SendIcon />} type="submit">
            Send
          </LoadingButton>
        </Stack>
        <FormControl
          fullWidth
          sx={{ mb: 4, }}>
          <Controller
            name='text'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                fullWidth
                label='Reply'
                multiline
                placeholder='Reply'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={!!errors.text}
              />
            )}
          />
          {errors.text && <FormHelperText sx={{ color: 'error.main' }}>{errors.text.message}</FormHelperText>}
        </FormControl>
        <List dense sx={{ width: '50%' }}>
          {selectedFiles.map((f, i) => (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => setSelectedFiles((prev) => {
                    const updatedFiles = [...prev];
                    updatedFiles.splice(i, 1);
                    return updatedFiles;
                  })}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={f.name} />
            </ListItem>
          ))}
        </List>
      </form >
    </Box >
  );
};

export default CommunicationRequest;
