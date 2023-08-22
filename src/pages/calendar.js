import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpIcon from '@mui/icons-material/Help';
import { Card, Container, Fab, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { getAppointments, updateStatus } from '../api/calendar';
import { AsyncAutocomplete } from '../components/AsyncAutocomplete';
import { WeekDays } from '../constants';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import { getWeekDates } from '../utils/date';
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
  const calendarRef = useRef(null);
  const requireRefresh = useRef(false);
  useEffect(() => {
    if (calendarRef.current && requireRefresh.current) {
      calendarRef.current?.getApi().gotoDate(format(date, 'yyyy-MM-dd'));
    }

    requireRefresh.current = false;
  }, [date]);

  const weekDates = getWeekDates(date);

  const ALL_DOC_OPTION = {
    id: null,
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

  const handlePreviousWeek = () => {
    requireRefresh.current = true;
    setDate((prev) => {
      const previousWeekStartDate = new Date(prev);
      previousWeekStartDate.setDate(prev.getDate() - 7);

      return previousWeekStartDate;
    });
  };

  const handleNextWeek = () => {
    requireRefresh.current = true;
    setDate((prev) => {
      const nextWeekStartDate = new Date(prev);
      nextWeekStartDate.setDate(prev.getDate() + 7);

      return nextWeekStartDate;
    });
  };

  const handleEventClick = ({ id, status, has_insurance_issue }) => {
    if (has_insurance_issue !== 0)
      return;

    if (status === 'Open') {
      update({ id, status: 1 });
    } else if (status === 'Confirmed') {
      update({ id, status: 2 });
    }
  };

  return (
    <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', mt: 2, maxHeight: '100%', }}>
      <CalendarView
        calRef={calendarRef}
        events={calender?.filter((obj) => obj.appointments.length !== 0)
          .map(({ time, appointments }) => ({
            id: time,
            allDay: false,
            start: `${format(date, 'yyyy-MM-dd')}T${time}`,
            appointments,
          }))
        }
        datesSet={({ start }) => setDate(start)}
        eventContent={({ timeText, event, }) => {
          const { appointments } = event.extendedProps;

          return (
            <Stack direction="row" spacing={2} sx={{ height: '100%', }}>
              {appointments?.map((app, i) => (
                <Card
                  key={i}
                  elevation={5}
                  sx={{
                    cursor: 'pointer',
                    p: 1,
                    color: statusColor[app.status],
                    ...(app.has_insurance_issue !== 0 && { opacity: 0.6, cursor: 'default', }),
                    ...(app.status === 'Checked OUT' && { fontWeight: 'bold', }),
                  }}
                  onClick={() => handleEventClick(app)}>
                  <Stack direction="row" spacing={5} sx={{ px: 1, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                      <Typography variant='inherit'>{app.patient_name}</Typography>
                      <Typography variant='inherit'>{app.national_id}</Typography>
                      <Typography variant='inherit'>{app.mobile_no}</Typography>
                      <Typography variant='inherit'>{app.practitioner_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                      {app.has_insurance_issue !== 0 && (<HelpIcon sx={{ color: 'red' }} />)}
                      <Typography variant='caption' sx={{ display: 'flex', color: statusColor[app.status], flexGrow: 1, alignItems: 'end' }}>{timeText}</Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>

          );
        }}
      >
        <Stack direction={'row'} sx={{ pt: 3, px: 3, }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexGrow: 1, }}>
            <IconButton size='large' onClick={handlePreviousWeek} sx={{ color: 'text.primary' }}>
              <ArrowBackIosIcon fontSize="inherit" />
            </IconButton>
            {WeekDays.map((d, i) => {
              const isSelected = date.toDateString() === weekDates[i].toDateString();

              return (
                <Fab
                  key={d}
                  size='medium'
                  color={isSelected ? 'primary' : ''}
                  sx={{ display: 'flex', flexDirection: 'column', boxShadow: 0, pt: 1, ...(!isSelected && { color: 'text.primary', bgcolor: 'transparent', }) }}
                  onClick={() => {
                    requireRefresh.current = true;
                    setDate(weekDates[i]);
                  }}
                >
                  <Typography variant='inherit' sx={{ fontWeight: 'bold' }}>{d}</Typography>
                  <Typography variant='inherit' >{weekDates[i].getDate()}</Typography>
                </Fab>
              );
            })}
            <IconButton size='large' onClick={handleNextWeek} sx={{ color: 'text.primary' }}>
              <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <AsyncAutocomplete
            label="Practitioner"
            disableClearable
            value={practitioner}
            loading={isLoading || isFetching}
            onOpen={() => refetch()}
            sx={{ width: 250, }}
            isOptionEqualToValue={(o, v) => o?.id === v?.id}
            getOptionLabel={(o) => o?.practitioner_name ?? ''}
            onChange={(e, value) => setPractitioner(value)}
            options={options}
          />
        </Stack>
      </CalendarView>
    </Container>
  );
};

Calendar.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Calendar;
