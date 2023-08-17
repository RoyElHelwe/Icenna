import { Card, CardContent, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { getAppointments } from '../api/calendar';
import { AsyncAutocomplete } from '../components/AsyncAutocomplete';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import CalendarView from '../views/calendar-view';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const ALL_DOC_OPTION = {
    id: undefined,
    practitioner_name: 'All Doctors',
  };
  const [practitioner, setPractitioner] = useState(ALL_DOC_OPTION);

  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getAppointments', date, practitioner],
    queryFn: (ctx) => getAppointments(ctx, format(date, 'yyyy-MM-dd'), practitioner?.id),
  });

  const { calender, practitioners, } = data?.data?.data ?? {};
  const options = [
    ALL_DOC_OPTION,
    ...practitioners ?? [],
  ];

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', my: 10, justifyContent: 'start', px: 20, maxHeight: '100%' }} spacing={5}>
      <Card>
        <CardContent>
          <AsyncAutocomplete
            label="Practitioner"
            loading={isLoading || isFetching}
            onOpen={() => refetch()}
            sx={{ width: 300, }}
            value={practitioner}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => option.practitioner_name}
            onChange={(e, value) => setPractitioner(value)}
            options={options}
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
