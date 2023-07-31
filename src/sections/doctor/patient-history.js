import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import Section from '../../components/section';
import SectionList from '../../components/section-list';
import SectionTreeItem from '../../components/section-tree-item';
import { timeAgo } from '../../utils/time-ago';
import { timeToDate } from '../../utils/time-to-date';
import { DentalCharting } from './patient/dental-charting';

export const PatientHistory = (props) => {
  const { patientData } = props;

  const imageDate = '6 Months old';

  return (
    <>
      <Section title="Dental Charting">
        <DentalCharting filledTeeth={[46]} />
      </Section>
      <Section title={`Panorama Image ${imageDate ? `(${imageDate})` : ''}`} withDivider>
        <img src={window.location.origin + '/assets/Panorama.png'} />
      </Section>
      <Section title="Patient Encounters">
        <SectionList>
          {patientData?.time_line?.map(({ id, status, encounter_date: date, encounter_time: time }, i) => (
            <SectionTreeItem
              key={id}
              id={id}
              title={`${timeAgo(timeToDate(date, time))} (${date})`}
              {...(i === patientData?.time_line?.length - 1 && { sx: { borderRadius: 0, } })}
            >
              <Typography variant="body2">Status</Typography>
              <Typography sx={{ pt: 2 }} variant="section">{status}</Typography>
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
