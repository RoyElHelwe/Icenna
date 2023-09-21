import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import RtlSvgIcon from '../../components/rtl-svgicon';
import Section from '../../components/section';
import SectionList from '../../components/section-list';
import SectionTreeItem from '../../components/section-tree-item';
import { useSettings } from '../../hooks/useSettings';
import { timeAgo, timeToDate } from '../../utils/date';
import { DentalCharting } from './dental-charting';
import { PatientEncounterView } from './patient-encounter-view';

const getDepartmentCharting = (dept, t) => {

  if (dept === 'Dental') {
    return (
      <Section title={t("Dental Charting")}>
        <DentalCharting filledTeeth={[46]} />
      </Section>
    );
  } else {
    return null;
  }
};

export const PatientHistory = ({ patientData }) => {
  const { direction } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      {getDepartmentCharting(patientData?.department, t)}
      {!!patientData?.images?.length && (
        <Section title={`${t('Panorama Image')}`} withDivider>
          <Carousel
            autoPlay={false}
            animation='slide'
            navButtonsAlwaysVisible
            swipe={false}
            NextIcon={(<RtlSvgIcon><ArrowForwardIosIcon /></RtlSvgIcon>)}
            PrevIcon={(<RtlSvgIcon><ArrowBackIosNewIcon /></RtlSvgIcon>)}
            sx={{ maxWidth: "100%", minHeight: '500px', bgcolor: 'background.paper', borderRadius: 3, }}>
            {patientData?.images?.map((img, i) => (
              <Box key={i} sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Link href="#">
                  <img src={img.image} width="100%" height={500} />
                </Link>
              </Box>
            ))}
          </Carousel>
        </Section>
      )}
      <Section title="Patient Encounters">
        <SectionList>
          {patientData?.time_line?.map(({ id, status, encounter_date: date, encounter_time: time, appointment }, i) => (
            <SectionTreeItem
              key={id}
              id={id}
              title={`${timeAgo(timeToDate(date?.split(' ')?.[0], time))} (${date?.split(' ')?.[0]})`}
            >
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
