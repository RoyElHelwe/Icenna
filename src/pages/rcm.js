import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab as MuiTab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Permissions } from '../constants/Permissions';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';
import PatientEncounters from '../sections/rcm/PatientEncounters';

const Tab = styled(MuiTab)(({ theme }) => ({
  textTransform: "none",
}));

const RCM = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState('1');

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', }}>
      <TabContext value={tab}>
        <Box
          variant="elevation"
          position="sticky"
          elevation={2}
          sx={{ bgcolor: 'background.paper', width: `100%`, pt: 1, }}>
          <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: 4,
            pr: 4,
          }}>
            <TabList onChange={(e, newValue) => setTab(newValue)}>
              <Tab label={t("Patient Encounters")} value="1" />
              <Tab label={t("Approvals")} value="2" />
              <Tab label={t("Claims")} value="3" />
            </TabList>
          </Box>
        </Box >
        <Container sx={{ pt: 3 }} maxWidth={false}>
          <TabPanel value="1">
            <PatientEncounters />
          </TabPanel>
          <TabPanel value="2">
            <PatientEncounters />
          </TabPanel>
          <TabPanel value="3">
            <PatientEncounters />
          </TabPanel>
        </Container>
      </TabContext>
    </Box>
  );
};

RCM.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

RCM.access = Permissions.CanViewRCM;

export default RCM;
