import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function ContactForm({ handleClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //
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
                <Typography variant="h4" align="center" mb={2}>
                    Contact Us
                </Typography>
                <ExitToAppIcon onClick={handleClose} sx={{ cursor: 'pointer', fontSize: 30, position: 'absolute', right: 30, top: 10 }} />

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        type="email"
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            mt: 2,
                            backgroundColor: "#000",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#111",
                            },
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}