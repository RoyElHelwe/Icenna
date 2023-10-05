import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findPatient, getPatients } from '../api/practitioner';
import Centered from '../components/Centered';
import Drawer from '../components/Drawer';
import Translations from '../components/Translations';
import Scrollbar from '../components/scrollbar';
import SearchBar from '../components/searchbar';
import { SideNavItem } from '../components/side-nav-item';
import { PatientStatuses } from '../constants';
import { Permissions } from '../constants/Permissions';
import { useHasPermissions } from '../hooks/useHasPermissions';
import { TOP_NAV_HEIGHT } from '../layouts/components/top-nav';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import { pusherClient } from '../lib/pusher';
import { PractitionerPatient } from '../sections/patient/PractitionerPatient';

const Patient = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { isLoading, error, data, refetch, isFetching, } = useQuery({
    queryKey: ['getPatients'],
    queryFn: getPatients,
    refetchOnMount: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const appid = router.query.appid;
    const patient = patients.find((p) => p.appointment === appid) ?? { appointment: appid };
    setSelectedPatient(patient);
  }, [patients, router.query.appid]);

  const canViewPractitioner = useHasPermissions(Permissions.CanViewPractitionerWithPatient);

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
                    title={canViewPractitioner ? `${p.full_name} with ${p.practitioner_data?.practitioner_name}` : p.full_name}
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
      {selectedPatient?.appointment ? (
        <PractitionerPatient
          appointment={selectedPatient.appointment}
          viewTabs={search.length >= 3 ? ['History'] : undefined}
        />
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
