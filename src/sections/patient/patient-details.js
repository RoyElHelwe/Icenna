import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Container, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientStatuses } from '../../constants';
import { PatientEncounter } from './patient-encounter';
import { PatientEncounterView } from './patient-encounter-view';
import { PatientHistory } from './patient-history';

const DefaultTabs = [
  'History',
  'Patient Encounter',
];

export const PatientDetails = ({
  patientData,
  setPatientData,
  viewTabs,
  ...props
}) => {
  const { t } = useTranslation();

  const tabs = viewTabs ?? DefaultTabs;
  const [tab, setTab] = useState(tabs[0]);

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
              {tabs.map((tab) => (
                <Tab key={tab} label={t(tab)} value={tab} />
              ))}
            </TabList>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Typography variant="h5">{patientData?.patient?.full_name}</Typography>
              <Box sx={{
                ml: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">{patientData?.patient?.age}</Typography>
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">{t(patientData?.patient?.gender)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box >
        <Container sx={{ pt: 3 }} maxWidth={false}>
          <TabPanel value="History">
            <PatientHistory
              patientData={patientData}
              {...props}
            />
          </TabPanel>
          <TabPanel value="Patient Encounter">
            {patientData?.status === PatientStatuses.CheckedOUT ? (
              <PatientEncounterView
                appointmentId={patientData?.appointment}
              />
            ) : (
              <PatientEncounter
                patientData={patientData}
                setPatientData={setPatientData}
                {...props}
              />
            )}
          </TabPanel>
        </Container>
      </TabContext>
    </Box>
  );
};
