import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import { useSettings } from '../hooks/useSettings';
import CalendarWrapper from '../styles/fullcalendar';

const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info',
};

const CalendarView = (props) => {
  const { settings } = useSettings();

  const { direction } = settings;

  const calendarOptions = {
    allDaySlot: false,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'timeGridDay',
    headerToolbar: {
      start: 'today, prev, next, title,',
      end: false,
    },
    nowIndicator: true,
    scrollTime: format(new Date().setHours(new Date().getHours() - 1), 'HH:mm:sss'),
    editable: false,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    direction,
    ...props,
  };

  return (
    <CalendarWrapper
      sx={{
        boxShadow: 6,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        width: '100%',
      }}
    >
      <Box
        sx={{
          p: 5,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
        }}
      >
        <FullCalendar
          {...calendarOptions}
        />
      </Box>
    </CalendarWrapper>
  );
};

export default CalendarView;
