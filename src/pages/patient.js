import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findPatient, getPatients } from '../api/practitioner';
import Centered from '../components/Centered';
import Translations from '../components/Translations';
import Scrollbar from '../components/scrollbar';
import SearchBar from '../components/searchbar';
import { SideNavItem } from '../components/side-nav-item';
import { PatientStatuses } from '../constants';
import { Permissions } from '../constants/Permissions';
import { TOP_NAV_HEIGHT } from '../layouts/components/top-nav';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import { pusherClient } from '../lib/pusher';
import { PatientDetails } from '../sections/patient/patient-details';

export const PatientDrawerWidth = 300;

const openedMixin = (theme) => ({
  width: PatientDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(11)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: PatientDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Patient = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getPatients'],
    queryFn: getPatients,
  });

  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const channel = pusherClient.subscribe('iCenna');

    channel.bind('new_appointment', (data) => {
      refetch();
    });

    return () => {
      pusherClient.unsubscribe('iCenna');
    };
  }, []);

  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  useEffect(() => {
    setOpenNav(lgUp);
  }, [lgUp]);

  const [search, setSearch] = useState('');
  const { error: searchError, data: searchData, } = useQuery({
    queryKey: ['find_patient', (search.length >= 3 ? search : '')],
    queryFn: (ctx) => findPatient(ctx),
    enabled: search.length >= 3,
  });

  useEffect(() => {
    if (searchData) {
      setPatients(searchData?.data?.data);
    } else {
      setPatients(data?.data?.data ?? []);
    }
  }, [data, searchData]);

  const [selectedPatient, setSelectedPatient] = useState();
  useEffect(() => {
    setSelectedPatient(patients.find((p) => p.appointment === router.query.appid));
  }, [patients, router.query.appid]);

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <Drawer
        sx={{
          '& .MuiDrawer-paper': { paddingTop: `${TOP_NAV_HEIGHT + 5}px`, },
        }}
        variant="permanent"
        anchor="left"
        open={openNav}
        {...({ onClose: () => setOpenNav(false) })}
      >
        <Scrollbar sx={{ height: '100%', '& .simplebar-content': { height: '100%' }, }}>
          <Box
            sx={{
              width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, }}>
              <IconButton onClick={() => setOpenNav((prev) => !prev)}>
                <MenuIcon />
              </IconButton>
              {openNav && (
                <SearchBar sx={{ mr: 2, }} onChange={(e) => setSearch(e.target.value)} />
              )}
            </Box>
            {openNav && (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
                <Typography
                  variant="h6"
                  m={3}>
                  <Translations text="Patient List" />
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                  <IconButton color="primary" onClick={refetch}><RefreshIcon /></IconButton>
                </Box>
              </Box>
            )}
          </Box>
          {openNav &&
            <Stack
              component="ul"
              spacing={isLoading ? 0.1 : 0.5}
              sx={{ listStyle: 'none', p: 1, m: 0, }}
            >
              {patients.sort((a, b) => Object.values(PatientStatuses).indexOf(a.status) - Object.values(PatientStatuses).indexOf(b.status)).map((p, i) => {
                const disabled = (p.status === PatientStatuses.Opened || !p.selectable);

                return (
                  <SideNavItem
                    active={p.id === selectedPatient?.id}
                    disabled={disabled}
                    icon={(p.status === PatientStatuses.CheckedOUT && (
                      <SvgIcon fontSize="small" color="success">
                        <CheckBadgeIcon />
                      </SvgIcon>
                    ))}
                    key={p.id}
                    title={p.full_name}
                    onClick={() => {
                      setSelectedPatient(patients.find((patient) => patient.id === p.id));
                      router.push({
                        pathname: router.pathname,
                        query: { ...router.query, appid: p.appointment },
                      });
                    }}
                  />
                );
              })}
            </Stack>
          }
        </Scrollbar>
      </Drawer>
      {!!selectedPatient?.id ? (
        <PatientDetails appointment={selectedPatient.appointment} viewTabs={search.length >= 3 ? ['History'] : undefined} />
      ) : (
        <Centered>
          <Typography variant="h5">
            {t("Please select a Patient from the list")}
          </Typography>
        </Centered>
      )}
    </Box>
  )
};

Patient.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

Patient.access = Permissions.CanViewPatient;

export default Patient;
