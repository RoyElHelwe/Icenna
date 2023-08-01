import { Autocomplete, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { getAppointments } from '../api/calendar';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import CalendarView from '../views/calendar-view';

const Calendar = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const ALL_DOC_OPTION = {
    id: undefined,
    practitioner_name: 'All Doctors',
  };
  const [practitioner, setPractitioner] = useState(ALL_DOC_OPTION);


  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getAppointments', date, practitioner],
    queryFn: (ctx) => getAppointments(ctx, format(date, 'yyyy-MM-dd'), practitioner.id),
  });

  const {
    practitioners,
    calender,
  } = data?.data?.data ?? {};

  const options = [
    ALL_DOC_OPTION,
    ...(practitioners ?? []),
  ];

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', my: 10, justifyContent: 'start', px: 20, maxHeight: '100%' }} spacing={5}>
      <Card>
        <CardContent>
          <Autocomplete
            sx={{ width: 300 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={practitioner}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => option.practitioner_name}
            onChange={(e, value) => setPractitioner(value)}
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
        <CalendarView
          events={
            calender?.filter((obj) => obj.appointments.length !== 0)
              .map((obj) => (
                obj.appointments.map(({ id, patient_name, appointment_time }) => ({
                  id,
                  title: patient_name,
                  start: `${format(date, 'yyyy-MM-dd')}T${obj.time}`,
                  allDay: false,
                })))
              ).flat()
          }
          loading={isLoading}
          datesSet={({ start }) => setDate(start)}
        />
      </Box>
    </Stack>
  );
};

Calendar.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Calendar;
