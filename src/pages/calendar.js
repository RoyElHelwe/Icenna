import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { getAppointments, updateStatus } from '../api/calendar';
import { AsyncAutocomplete } from '../components/AsyncAutocomplete';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import CalendarView from '../views/calendar-view';

const Calendar = () => {
  const globalTheme = useTheme();
  const statusColor = {
    Open: globalTheme.palette.text.disabled,
    Confirmed: globalTheme.palette.text.primary,
    ['Checked IN']: globalTheme.palette.primary.main,
    ['Checked OUT']: globalTheme.palette.text.primary,
    ['No Show']: 'red',
  };

  const [date, setDate] = useState(new Date());
  const ALL_DOC_OPTION = {
    id: undefined,
    practitioner_name: 'All Doctors',
  };
  const [practitioner, setPractitioner] = useState(ALL_DOC_OPTION);

  const { isLoading, data: apps, refetch, isFetching, } = useQuery({
    queryKey: ['getAppointments', date, practitioner],
    queryFn: (ctx) => getAppointments(ctx, format(date, 'yyyy-MM-dd'), practitioner?.id),
  });

  const { practitioners, calender, } = apps?.data?.data ?? {};
  const options = [
    ALL_DOC_OPTION,
    ...practitioners ?? [],
  ];

  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateStatus, enabled: false,
    onSuccess: (data, vars, ctx) => {
      refetch();
    }
  });

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
                obj.appointments.map(({ id, patient_name, status, ...rest }) => ({
                  id,
                  title: patient_name,
                  start: `${format(date, 'yyyy-MM-dd')}T${obj.time}`,
                  allDay: false,
                  status,
                  color: globalTheme.palette.background.paper,
                  textColor: statusColor[status],
                  className: status === 'Checked OUT' ? ['st-checked-out'] : [],
                  ...rest,
                })))
              ).flat()
          }
          loading={isLoading || isUpdating}
          datesSet={({ start }) => setDate(start)}
          eventContent={({ timeText, event, ...rest }) => {
            const { national_id, mobile_no, practitioner_name } = event.extendedProps;

            return (
              <Stack direction="row" spacing={5} sx={{ alignItems: 'flex-end', px: 1, }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                  <Typography variant=''>{event.title}</Typography>
                  <Typography variant=''>{national_id}</Typography>
                  <Typography variant=''>{mobile_no}</Typography>
                  <Typography variant=''>{practitioner_name}</Typography>
                </Box>
                <Typography variant='caption'>{timeText}</Typography>
              </Stack>
            );
          }}
          eventClick={(info) => {
            const { id, } = info.event;
            const { status } = info.event.extendedProps;

            if (status === 'Open') {
              update({ id, status: 1 });
            } else if (status === 'Confirmed') {
              update({ id, status: 2 });
            }
          }}
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
