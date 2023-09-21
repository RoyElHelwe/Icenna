import MenuIcon from '@mui/icons-material/Menu';
import { Box, CssBaseline, Divider, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEncounterInfo } from '../../api/practitioner';
import Drawer from '../../components/Drawer';
import Scrollbar from "../../components/scrollbar";
import { SideNavItem } from '../../components/side-nav-item';
import { ApprovalStatusColors } from '../../constants';
import { ApprovalStatusIcons } from '../../constants/ApprovalStatusIcons';
import { Permissions } from '../../constants/Permissions';
import { TOP_NAV_HEIGHT } from '../../layouts/components/top-nav';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import { PatientDetails } from "../../sections/patient/patient-details";

const Encounter = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ['get_encounter_info', router.query.id],
    queryFn: getEncounterInfo,
  });

  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  useEffect(() => {
    setOpenNav(lgUp);
  }, [lgUp]);

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
            </Box>
            {openNav && (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
                <Typography variant="h6" sx={{ mx: 3, }}>{t("Approvals")}</Typography>
              </Box>
            )}
          </Box>
          {openNav && (
            <>
              <Stack component="ul" sx={{ listStyle: 'none', p: 1, m: 0, }}>
                {data?.data?.data?.approvals.map((a, i) => (
                  <SideNavItem
                    key={a.id}
                    icon={(
                      <SvgIcon sx={{ color: ApprovalStatusColors[a.status] }}>
                        {ApprovalStatusIcons[c.status]}
                      </SvgIcon>
                    )}
                    title={`Approval ${i + 1}`}
                    onClick={() => router.push(`/approval/${a.id}`)}
                  />
                ))}
              </Stack>

              <Divider sx={{ m: 3 }} />

              <Typography variant="h6" sx={{ mx: 3, }}>{t("Claims")}</Typography>
              <Stack component="ul" sx={{ listStyle: 'none', p: 1, m: 0, }}>
                {data?.data?.data?.claims.map((c, i) => (
                  <SideNavItem
                    key={c.id}
                    icon={(
                      <SvgIcon sx={{ color: ApprovalStatusColors[c.status] }}>
                        {ApprovalStatusIcons[c.status]}
                      </SvgIcon>
                    )}
                    title={`Claim ${i + 1}`}
                    onClick={() => router.push(`/claim/${c.id}`)}
                  />
                ))}
              </Stack>
            </>
          )}
        </Scrollbar>
      </Drawer>

      <PatientDetails appointment={router.query.id} viewTabs={['Patient Encounter']} />
    </Box>
  );
};

Encounter.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);

Encounter.access = Permissions.CanViewEncounter;

export default Encounter;
