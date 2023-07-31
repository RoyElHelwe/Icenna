import { Autocomplete, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { getAppointments } from '../api/receptionist';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import Calendar from '../views/calendar';

const Reception = () => {
  const [open, setOpen] = useState(false);
  const date = format(new Date(), 'yyyy-MM-dd');

  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getAppointments', date],
    queryFn: getAppointments,
  });

  const {
    practitioners,
    calender,
  } = data?.data?.data ?? {};

  const options = [
    {
      id: null,
      practitioner_name: 'All Doctors',
    },
    ...(practitioners ?? []),
  ];

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', my: 10, justifyContent: 'start', px: 20, }} spacing={5}>
      <Card>
        <CardContent>
          <Autocomplete
            sx={{ width: 300 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.practitioner_name}
            options={options}
            loading={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Practitioner"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', maxHeight: '100%', }}>
        <Calendar events={
          calender?.filter((obj) => obj.appointments.length !== 0)
            .map((obj) => (
              obj.appointments.map(({ id, patient_name, appointment_time }) => ({
                id,
                title: patient_name,
                start: `${date}T${obj.time}`,
                allDay: false,
              })))
            ).flat()
        } />
      </Box>
    </Stack>
  );
};

Reception.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Reception;
