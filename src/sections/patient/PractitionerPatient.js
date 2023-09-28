import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEncounterInfo } from '../../api/practitioner';
import Centered from '../../components/Centered';
import CenteredCircularProgress from '../../components/centered-circular-progress';
import { pusherClient } from '../../lib/pusher';
import { PatientDetails } from './patient-details';

export const PractitionerPatient = ({
  appointment,
  ...props
}) => {
  const { t } = useTranslation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['get_encounter_info', appointment],
    queryFn: getEncounterInfo,
  });

  useEffect(() => {
    const channel = pusherClient.subscribe('iCenna');

    channel.bind('patient_encounter_updates', (data) => {
      refetch();
    });

    return () => {
      pusherClient.unsubscribe('iCenna');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [patientData, setPatientData] = useState({});
  useEffect(() => {
    setPatientData(data?.data?.data ?? {});
  }, [data]);

  if (isLoading) {
    return <CenteredCircularProgress />;
  } else if (error) {
    return (
      <Centered>
        <Typography variant="h5">{t("Couldn't get Patient encounter!")}</Typography>
      </Centered>
    );
  }

  return (
    <PatientDetails
      patientData={patientData}
      setPatientData={setPatientData}
      nonEditableColumns={{
        procedures: ['price'],
      }}
      {...props}
    />
  );
};

PractitionerPatient.propTypes = {
  appointment: PropTypes.string,
};
