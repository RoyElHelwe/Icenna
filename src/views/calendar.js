import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSettings } from '../hooks/useSettings';
import CalendarWrapper from '../styles/fullcalendar';

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    location: '',
    description: ''
  },
};

const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info',
};

const Calendar = ({
  events,
}) => {
  const { settings } = useSettings();
  const { direction } = settings;
  const calendarOptions = {
    events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'timeGridDay',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    views: {
      week: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric', },
      },
    },
    editable: false,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [`bg-${colorName}`];
    },
    eventClick({ event: clickedEvent }) {
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)
      // isAddNewEventSidebarActive.value = true
    },
    customButtons: {
      sidebarToggle: {
        icon: 'bi bi-list',
        click() {
          // TODO: handleLeftSidebarToggle()
        }
      }
    },
    dateClick(info) {
      const ev = { ...blankEvent, };
      ev.start = info.date;
      ev.end = info.date;
      ev.allDay = true;

      // TODO: handleAddEventSidebarToggle()
    },
    eventDrop({ event: droppedEvent }) {
      // TODO: eventDrop()
    },
    eventResize({ event: resizedEvent }) {
      // TODO: eventResize()
    },
    direction,
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
        <FullCalendar {...calendarOptions} />
      </Box>
    </CalendarWrapper>
  );
};

export default Calendar;
