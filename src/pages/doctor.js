import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Skeleton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getPatients } from '../api/practitioner';
import Translations from '../components/Translations';
import CenteredAlert from '../components/centered-alert';
import Scrollbar from '../components/scrollbar';
import SearchBar from '../components/searchbar';
import { SideNavItem } from '../components/side-nav-item';
import { PatientStatuses } from '../constants';
import { TOP_NAV_HEIGHT } from '../layouts/components/top-nav';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import { Patient } from '../sections/doctor/patient';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
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
    width: drawerWidth,
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

const Doctor = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getPatients'],
    queryFn: getPatients,
  });

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  useEffect(() => {
    setPatients(data?.data?.data ?? []);
  }, [data]);

  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  useEffect(() => {
    setOpenNav(lgUp);
  }, [lgUp]);

  const [search, setSearch] = useState('');
  const filteredPatients = patients.filter((p) => p.full_name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    setSelectedPatient(patients.find((p) => p.appointment === router.query.appid));
  }, [patients, router.query.appid]);

  let body;
  if (isLoading || isFetching) {
    body = Array(20).fill().map((_, i) => <Skeleton key={i} height={50} />);
  } else if (error) {
    body = <CenteredAlert severity="error" message="Can't get patients." sx={{ minHeight: '100px' }} />;
  } else {
    body = filteredPatients.sort((a, b) => Object.values(PatientStatuses).indexOf(a.status) - Object.values(PatientStatuses).indexOf(b.status)).map((p, i) => {
      const disabled = (p.status === PatientStatuses.Opened || !p.selectable);
      return (
        <SideNavItem
          active={p.id === selectedPatient?.id}
          disabled={disabled}
          icon={(p.status === PatientStatuses.CheckedOUT && (
            <SvgIcon
              fontSize="small"
              color="success">
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
    });
  }

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            paddingTop: `${TOP_NAV_HEIGHT + 5}px`,
          },
        }}
        variant="permanent"
        anchor="left"
        open={openNav}
        {...({ onClose: () => setOpenNav(false) })}
      >
        <Scrollbar sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          },
        }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
            }}>
              <IconButton
                aria-label="open drawer"
                onClick={() => setOpenNav((prev) => !prev)}
              >
                <MenuIcon />
              </IconButton>
              {openNav && (
                <SearchBar
                  sx={{ mr: 2, }}
                  onChange={(e) => setSearch(e.target.value)} />
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
              sx={{
                listStyle: 'none',
                p: 1,
                m: 0,
              }}
            >
              {body}
            </Stack>
          }
        </Scrollbar>
      </Drawer>
      {selectedPatient?.id && <Patient appointment={selectedPatient.appointment} />}
    </Box>
  )
};

Doctor.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Doctor;
