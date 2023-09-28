import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpIcon from "@mui/icons-material/Help";
import { Card, Container, Fab, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "@tanstack/react-query";
import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAppointments, updateStatus } from "../../api/calendar";
import { AsyncAutocomplete } from "../../components/AsyncAutocomplete";
import RtlSvgIcon from "../../components/rtl-svgicon";
import { WeekDays } from "../../constants";
import { Permissions, UserRoles } from "../../constants/Permissions";
import { useAuth } from "../../hooks/use-auth";
import { Layout as DashboardLayout } from "../../layouts/dashboard-layout";
import { pusherClient } from "../../lib/pusher";
import { compareDatesByDatePart, getWeekDates } from "../../utils/date";
import CalendarView from "../../views/calendar-view";

const Calendar = () => {
  const globalTheme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const statusColor = {
    Open: globalTheme.palette.text.disabled,
    Confirmed: globalTheme.palette.text.primary,
    ["Checked IN"]: globalTheme.palette.primary.main,
    ["Checked OUT"]: globalTheme.palette.text.primary,
    ["No Show"]: "red",
  };

  const { user } = useAuth();

  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);
  const skipRefresh = useRef(false);
  useEffect(() => {
    if (calendarRef.current && skipRefresh.current) {
      calendarRef.current?.getApi().gotoDate(format(date, "yyyy-MM-dd"));
    }

    skipRefresh.current = false;
  }, [date]);

  const weekDates = getWeekDates(date);

  const ALL_DOC_OPTION = {
    id: null,
    practitioner_name: t("All Doctors"),
  };
  const [practitioner, setPractitioner] = useState(ALL_DOC_OPTION);

  const {
    isLoading,
    data: apps,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["getAppointments", date, practitioner],
    queryFn: (ctx) => getAppointments(ctx, format(date, "yyyy-MM-dd"), practitioner?.id),
  });

  useEffect(() => {
    const channel = pusherClient.subscribe("iCenna");

    channel.bind("new_appointment", (data) => {
      refetch();
    });

    return () => {
      pusherClient.unsubscribe("iCenna");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { practitioners, calender } = apps?.data?.data ?? {};
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    if (calender) {
      setCalendar(calender);
    }
  }, [calender]);

  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateStatus,
    enabled: false,
    onSuccess: (data, vars, ctx) => {
      const searchId = data?.data?.data?.id;
      const appsIndex = calendar.findIndex((a) => !!a.appointments.find((app) => app.id === searchId));
      const eventIndex = calendar[appsIndex].appointments.findIndex((app) => app.id === searchId);
      // Update the appointment that was changed if it was found, or refetch
      if (appsIndex !== -1 && eventIndex !== -1) {
        const newCalendar = [
          ...calendar.slice(0, appsIndex),
          {
            ...calendar[appsIndex],
            appointments: [
              ...calendar[appsIndex].appointments.slice(0, eventIndex),
              { ...calendar[appsIndex].appointments[eventIndex], ...data?.data?.data, },
              ...calendar[appsIndex].appointments.slice(eventIndex + 1),
            ],
          },
          ...calendar.slice(appsIndex + 1),
        ];
        setCalendar(newCalendar);
      } else {
        refetch();
      }
    },
  });

  const handlePreviousWeek = () => {
    skipRefresh.current = true;
    setDate((prev) => {
      const previousWeekStartDate = new Date(prev);
      previousWeekStartDate.setDate(prev.getDate() - 7);

      return previousWeekStartDate;
    });
  };

  const handleNextWeek = () => {
    skipRefresh.current = true;
    setDate((prev) => {
      const nextWeekStartDate = new Date(prev);
      nextWeekStartDate.setDate(prev.getDate() + 7);

      return nextWeekStartDate;
    });
  };

  const handleEventClick = ({ id, status, has_insurance_issue }) => {
    if (has_insurance_issue !== 0) return;

    if (status === "Open") {
      update({ id, status: 1 });
    } else if (status === "Confirmed") {
      update({ id, status: 2 });
    } else if (status === "Checked IN") {
      const userRoles = user?.user_type;
      if (userRoles === UserRoles.HealthcareAdministrator) {
        router.push(`/calendar/encounter/${id}`);
      } else if (userRoles === UserRoles.Practitioner) {
        router.push(`/patient?appid=${id}`);
      }
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        mt: 2,
        maxHeight: "100%",
      }}
    >
      <CalendarView
        calRef={calendarRef}
        events={calendar
          ?.filter((obj) => obj.appointments.length !== 0)
          .map(({ time, appointments }) => ({
            id: time,
            allDay: false,
            start: `${format(date, "yyyy-MM-dd")}T${time}`,
            appointments,
          }))}
        datesSet={({ start }) => {
          if (skipRefresh.current || compareDatesByDatePart(start, date) === 0) {
            return;
          }
          skipRefresh.current = true;
          setDate(start);
        }}
        eventContent={({ timeText, event }) => {
          const { appointments } = event.extendedProps;

          return (
            <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
              {appointments?.map((app, i) => (
                <Card
                  key={i}
                  elevation={5}
                  sx={{
                    cursor: "pointer",
                    p: 1,
                    color: statusColor[app.status],
                    ...(app.has_insurance_issue !== 0 && { opacity: 0.6, cursor: "default" }),
                    ...(app.status === "Checked OUT" && { fontWeight: "bold" }),
                  }}
                  onClick={() => handleEventClick(app)}
                >
                  <Stack direction="row" spacing={5} sx={{ px: 1 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="inherit">{app.patient_name}</Typography>
                      <Typography variant="inherit">{app.national_id}</Typography>
                      <Typography variant="inherit">{app.mobile_no}</Typography>
                      <Typography variant="inherit">{app.practitioner_name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {app.has_insurance_issue !== 0 && <HelpIcon sx={{ color: "red" }} />}
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          color: statusColor[app.status],
                          flexGrow: 1,
                          alignItems: "end",
                        }}
                      >
                        {timeText}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          );
        }}
      >
        <Stack direction={"row"} sx={{ pt: 3, px: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexGrow: 1,
            }}
          >
            <IconButton size="large" onClick={handlePreviousWeek} sx={{ color: "text.primary" }}>
              <RtlSvgIcon>
                <ArrowBackIosIcon fontSize="inherit" />
              </RtlSvgIcon>
            </IconButton>
            {WeekDays.map((d, i) => {
              const isSelected = date.toDateString() === weekDates[i].toDateString();

              return (
                <Fab
                  key={d}
                  size="medium"
                  color={isSelected ? "primary" : ""}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 0,
                    pt: 1,
                    ...(!isSelected && { color: "text.primary", bgcolor: "transparent" }),
                  }}
                  onClick={() => {
                    skipRefresh.current = true;
                    setDate(weekDates[i]);
                  }}
                >
                  <Typography variant="inherit" sx={{ fontWeight: "bold" }}>
                    {t(d)}
                  </Typography>
                  <Typography variant="inherit">{weekDates[i].getDate()}</Typography>
                </Fab>
              );
            })}
            <IconButton size="large" onClick={handleNextWeek} sx={{ color: "text.primary" }}>
              <RtlSvgIcon>
                <ArrowForwardIosIcon fontSize="inherit" />
              </RtlSvgIcon>
            </IconButton>
          </Box>

          <AsyncAutocomplete
            label={t("Practitioner")}
            disableClearable
            value={practitioner}
            loading={isLoading || isFetching}
            onOpen={() => refetch()}
            sx={{ width: 250, visibility: practitioners?.length < 2 && "hidden" }}
            isOptionEqualToValue={(o, v) => o?.id === v?.id}
            getOptionLabel={(o) => o?.practitioner_name ?? ""}
            onChange={(e, value) => setPractitioner(value)}
            options={[ALL_DOC_OPTION, ...(practitioners ?? [])]}
          />
        </Stack>
      </CalendarView>
    </Container>
  );
};

Calendar.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Calendar.access = Permissions.CanViewCalendar;

export default Calendar;
