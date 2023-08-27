import { Box } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import Section from '../../components/section';
import SectionList from '../../components/section-list';
import SectionTreeItem from '../../components/section-tree-item';
import { timeAgo, timeToDate } from '../../utils/date';
import { DentalCharting } from './dental-charting';
import { PatientEncounterView } from './patient-encounter-view';

export const PatientHistory = (props) => {
  const { patientData } = props;

  const imageDate = '6 Months old';

  return (
    <>
      {patientData?.department === 'Dental' && (<Section title="Dental Charting">
        <DentalCharting filledTeeth={[46]} />
      </Section>
      )}
      <Section title={`Panorama Image ${imageDate ? `(${imageDate})` : ''}`} withDivider>
        <Carousel
          autoPlay={false}
          animation='slide'
          navButtonsAlwaysVisible
          sx={{ maxWidth: "100%", bgcolor: 'background.paper', borderRadius: 3, }}>
          {patientData?.images?.map((image, i) => (
            <Box key={i} sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Link href={image.gcb_path} target='_blank'>
                <img key={i} src={image.image} width="100%" height={500} />
              </Link>
            </Box>
          ))}
        </Carousel>
      </Section>
      <Section title="Patient Encounters">
        <SectionList>
          {patientData?.time_line?.map(({ id, status, encounter_date: date, encounter_time: time, appointment }, i) => (
            <SectionTreeItem
              key={id}
              id={id}
              title={`${timeAgo(timeToDate(date, time))} (${date})`}
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
