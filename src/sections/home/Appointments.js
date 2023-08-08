import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";

export const Appointments = ({ title, data, icon: Icon }) => {
  return (
    <Card sx={{ m: 2.4, height: '100%', width: '100%', }} elevation={3}>
      <CardHeader sx={{ textAlign: "center" }} />
      <CardContent sx={{ px: 8, }}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
          {Icon && <Icon fontSize="large" sx={{ color: 'white' }} />}
        </Avatar>
        <Typography variant='h6' sx={{ mt: 2, }}>{title}</Typography>
        <Typography variant='h4' sx={{ mt: 2, }}>{data}</Typography>
      </CardContent>
    </Card>
  );
};

export default Appointments;
