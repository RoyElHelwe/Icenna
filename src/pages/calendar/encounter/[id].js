import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, CssBaseline, Divider, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEncounterInfo } from '../../../api/practitioner';
import Drawer from '../../../components/Drawer';
import Scrollbar from "../../../components/scrollbar";
import { SideNavItem } from '../../../components/side-nav-item';
import { ApprovalStatusColors } from '../../../constants';
import { ApprovalStatusIcons } from '../../../constants/ApprovalStatusIcons';
import { Permissions } from '../../../constants/Permissions';
import { TOP_NAV_HEIGHT } from '../../../layouts/components/top-nav';
import { Layout as DashboardLayout } from '../../../layouts/dashboard-layout';
import ApprovalDetails from '../../../sections/approval/ApprovalDetails';
import { PatientDetails } from '../../../sections/patient/patient-details';

const Encounter = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const approvalErrStatus = [
    "Rejected", "Partially Approved", "Error",
  ];

  const { data } = useQuery({
    queryKey: ['get_encounter_info', router.query.id],
    queryFn: getEncounterInfo,
  });
  const [patientData, setPatientData] = useState({});
  useEffect(() => {
    setPatientData(data?.data?.data ?? {});
  }, [data]);

  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  useEffect(() => {
    setOpenNav(lgUp);
  }, [lgUp]);

  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
    const appId = router.query.approval;
    const approval = patientData?.approvals?.find((a) => a.id === appId);
    setSelectedItem(approval);
  }, [patientData, router.query.approval]);

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
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                <Typography variant="h6" sx={{ mx: 3, }}>{t("Approvals")}</Typography>
                <Avatar sx={{ bgcolor: ApprovalStatusColors.Error, width: 28, height: 28, color: 'background.paper' }}>
                  {patientData?.approvals?.reduce((acc, app) => (approvalErrStatus.includes(app.status) ? acc + 1 : acc), 0) ?? 0}
                </Avatar>
              </Box>
            )}
          </Box>
          {openNav && (
            <>
              <Stack component="ul" sx={{ listStyle: 'none', p: 1, m: 0, }}>
                {patientData?.approvals?.map((app, i) => (
                  <SideNavItem
                    key={app.id}
                    active={app.id === selectedItem?.id}
                    icon={(
                      <SvgIcon sx={{ color: ApprovalStatusColors[app.status] }}>
                        {ApprovalStatusIcons[app.status]}
                      </SvgIcon>
                    )}
                    title={`Approval ${i + 1}`}
                    onClick={() => {
                      setSelectedItem(patientData?.approvals?.find((a) => a.id === app.id));
                      router.push({
                        pathname: router.pathname,
                        query: { id: router.query.id, approval: app.id },
                      });
                    }}
                  />
                ))}
              </Stack>

              <Divider sx={{ m: 3 }} />

              <Typography variant="h6" sx={{ mx: 3, }}>{t("Claims")}</Typography>
              <Stack component="ul" sx={{ listStyle: 'none', p: 1, m: 0, }}>
                {patientData?.claims?.map((clm, i) => (
                  <SideNavItem
                    key={clm.id}
                    active={app.id === selectedItem?.id}
                    icon={(
                      <SvgIcon sx={{ color: ApprovalStatusColors[clm.status] }}>
                        {ApprovalStatusIcons[clm.status]}
                      </SvgIcon>
                    )}
                    title={`Claim ${i + 1}`}
                    onClick={() => {
                      setSelectedItem(patientData?.claims?.find((c) => c.id === clm.id));
                      router.push({
                        pathname: router.pathname,
                        query: { id: router.query.id, approval: clm.id },
                      });
                    }}
                  />
                ))}
              </Stack>
            </>
          )}
        </Scrollbar>
      </Drawer>

      {selectedItem
        ? (
          <ApprovalDetails id={selectedItem.id} />
        )
        : (
          <PatientDetails
            patientData={patientData}
            setPatientData={setPatientData}
            viewTabs={['Patient Encounter']}
            nonEditableColumns={{
              procedures: ['price'],
            }}
          />
        )
      }
    </Box>
  );
};

Encounter.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);

Encounter.access = Permissions.CanViewEncounter;

export default Encounter;
