import { useState } from "react";
import { TextField, Typography, Box, FormControl, FormHelperText } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { sendEmail } from "src/api/contactusmail";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { LoadingButton } from "@mui/lab";


const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    phone_no: yup.string().required("Phone Number is required"),
});

const defaultValues = {
    email: '',
    name: '',
    phone_no: '',
};

export default function ContactForm({ handleClose }) {


    const [message, setMessage] = useState({
        message: "",
        type: "",
    });

    const { isLoading, mutate } = useMutation({
        mutationFn: sendEmail,
        enabled: false,
        onSuccess: async (data, vars, ctx) => {
            setMessage({
                message: "We have received you contact and we will get back to you.",
                type: "success",
            });
        },
        onError: (err, vars, ctx) => {
            setMessage({
                message: "Email not sent!",
                type: "error",
            });
        }
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });

    const onSubmit = (data) => {
        matchIsValidTel(data.phone_no) ?
            mutate({ ...data }) :
            setMessage({
                message: "Phone Number is not valid!",
                type: "error",
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 600,
                    mx: "auto",
                    p: 10,
                    border: "2px solid  #000000",
                    borderRadius: "12px",
                    boxShadow: 1,
                    backgroundColor: "#fff",
                    position: "relative",
                }}
            >
                {message && (
                    <Typography variant="body1" sx={{ color: message.type == 'success' ? 'green' : 'red' }}>
                        {message.message}
                    </Typography>
                )
                }
                <Typography variant="h4" align="center" mb={2}>
                    Contact Us
                </Typography>
                <ExitToAppIcon onClick={handleClose} sx={{ cursor: 'pointer', fontSize: 30, position: 'absolute', right: 30, top: 10 }} />

                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    disabled={isLoading}
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    required
                                    {...field}
                                />
                            )}
                        />
                        {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    disabled={isLoading}
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    required
                                    type="email"
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                        <Controller
                            name="phone_no"
                            control={control}
                            render={({ field }) => (
                                <MuiTelInput
                                    disabled={isLoading}
                                    defaultCountry="SA"
                                    fullWidth
                                    label="Phone Number"
                                    margin="normal"
                                    required
                                    {...field}
                                />
                            )}
                        />
                        {errors.phone_no && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone_no.message}</FormHelperText>}
                        {
                            message.type == 'success' ?
                            <LoadingButton
                            disabled={isLoading}
                            fullWidth
                            size='medium'
                            variant='contained'
                            onClick={() => handleClose()}
                            sx={{ my: 1, backgroundColor: 'green', '&:hover': { backgroundColor: 'green' } }}
                        >
                            Done
                        </LoadingButton>
                                :
                                <LoadingButton
                                    disabled={isLoading}
                                    fullWidth
                                    type="submit"
                                    size='medium'
                                    variant='contained'
                                    sx={{ my: 1, backgroundColor: '#0F4B64', '&:hover': { backgroundColor: '#0F4B64' } }}
                                >
                                    Submit
                                </LoadingButton>
                        }
                    </FormControl>
                </form>
            </Box>
        </Box>
    );
}
