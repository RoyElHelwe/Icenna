import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getEncounterInfo } from '../../api/practitioner';
import CenteredAlert from '../../components/centered-alert';
import CenteredCircularProgress from '../../components/centered-circular-progress';
import Section from '../../components/section';
import Diagnosis from './diagnosis';
import Medications from './medications';
import Procedures from './procedures';

export const PatientEncounterView = (props) => {
  const { appointmentId } = props;

  const { isLoading, error, data } = useQuery({
    queryKey: ['get_encounter_info', appointmentId],
    queryFn: getEncounterInfo,
  });

  const [patientData, setPatientData] = useState();
  useEffect(() => {
    setPatientData(data?.data?.data ?? {});
  }, [data]);

  if (isLoading) {
    return <CenteredCircularProgress />;
  } else if (error) {
    return <CenteredAlert severity="error" message="Internal server error" />;
  }

  return (
    <>
      {!!patientData?.chief_complaint?.length && (
        <Section title="Chief Complaint" withDivider>
          <Typography>{patientData?.chief_complaint}</Typography>
        </Section>
      )}

      {!!patientData?.medical_code?.length && (
        <Section title="Diagnosis" withDivider>
          <Box sx={{ mb: 5, }}>
            <Typography sx={{ fontWeight: 'bold', }}>Description</Typography>
            <Typography sx={{ mt: 3, mx: 3, }}>{patientData?.diagnosis_description}</Typography>
          </Box>

          <Diagnosis data={patientData?.medical_code ?? []} />
        </Section>
      )}

      {!!patientData?.procedure?.length && (
        <Section title="Procedures" withDivider>
          {patientData?.procedure?.map((p) => (
            <Procedures key={p.approval_id} data={p.items ?? []} />
          ))}
        </Section>
      )}

      {!!patientData?.drugs?.length && (
        <Section title="Medications" withDivider>
          <Medications data={patientData?.drugs ?? []} />
        </Section>
      )}
    </>
  );
};

PatientEncounterView.propTypes = {
  appointmentId: PropTypes.string,
};
