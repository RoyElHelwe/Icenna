import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import Section from '../../components/section';
import SectionList from '../../components/section-list';
import SectionTreeItem from '../../components/section-tree-item';
import { timeAgo, timeToDate } from '../../utils/date';
import { DentalCharting } from './dental-charting';
import { PatientEncounterView } from './patient-encounter-view';

const DicomViewer = dynamic(() => import('./DicomViewer'), { ssr: false });

const getDepartmentCharting = (dept) => {
  if (dept === 'Dental') {
    return (
      <Section title="Dental Charting">
        <DentalCharting filledTeeth={[46]} />
      </Section>
    );
  } else {
    return null;
  }
};

export const PatientHistory = (props) => {
  const { patientData } = props;

  const imageDate = '6 Months old';

  return (
    <>
      {getDepartmentCharting(patientData?.department)}
      <Section title={`Panorama Image ${imageDate ? `(${imageDate})` : ''}`} withDivider>
        <Carousel
          autoPlay={false}
          animation='slide'
          navButtonsAlwaysVisible
          swipe={false}
          sx={{ maxWidth: "100%", minHeight: '500px', bgcolor: 'background.paper', borderRadius: 3, }}>
          {/* {patientData?.images?.map((image, i) => ( */}
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <DicomViewer token={patientData?.access_token} image={patientData?.images?.[1]} />
          </Box>
          {/* ))} */}
        </Carousel>
      </Section>
      <Section title="Patient Encounters">
        <SectionList>
          {patientData?.time_line?.map(({ id, status, encounter_date: date, encounter_time: time, appointment }, i) => (
            <SectionTreeItem
              key={id}
              id={id}
              title={`${timeAgo(timeToDate(date?.split(' ')?.[0], time))} (${date?.split(' ')?.[0]})`}
              {...(i === patientData?.time_line?.length - 1 && { sx: { borderRadius: 0, } })}>
              <PatientEncounterView appointmentId={appointment} />
            </SectionTreeItem>
          ))}
        </SectionList>
      </Section>
    </>
  );
};

PatientHistory.propTypes = {
  patientData: PropTypes.object,
};
