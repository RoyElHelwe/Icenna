import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Container, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getEncounterInfo } from '../../api/practitioner';
import CenteredCircularProgress from '../../components/centered-circular-progress';
import CenteredAlert from '../../components/centered-alert';
import { PatientEncounters } from './patient-encounter';
import { PatientHistory } from './patient-history';

export const Patient = (props) => {
  const { appointment } = props;

  const { isLoading, error, data } = useQuery({
    queryKey: ['get_encounter_info', appointment],
    queryFn: getEncounterInfo,
  });

  const [patientData, setPatientData] = useState();
  useEffect(() => {
    setPatientData(data?.data?.data ?? {});
  }, [data]);

  const [tab, setTab] = useState('1');

  if (isLoading) {
    return <CenteredCircularProgress />;
  } else if (error) {
    return <CenteredAlert severity="error" message="Internal server error" />;
  }

  return (
    <TabContext value={tab}>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', }}>
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
              <Tab label="History" value="1" />
              <Tab label="Patient Encounter" value="2" />
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
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">{patientData?.patient?.gender}</Typography>
              </Box>
            </Box>
          </Box>
        </Box >
        <Container sx={{ pt: 3 }} maxWidth={false}>
          <TabPanel value="1">
            <PatientHistory patientData={patientData} />
          </TabPanel>
          <TabPanel value="2">
            <PatientEncounters patientData={patientData} />
          </TabPanel>
        </Container>
      </Box >
    </TabContext >
  );
};

Patient.propTypes = {
  appointment: PropTypes.string,
};
