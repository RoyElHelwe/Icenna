import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Translations from '../../components/Translations';
import CustomDialog from '../../components/custom-dialog';
import SearchBar from '../../components/searchbar';
import Section from '../../components/section';
import ChiefComplaintForm from '../../forms/chief-complaint';
import MedicalCodes from './medical-codes';
import Medications from './medications';
import Procedures from './procedures';

export const LinkTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

export const PatientEncounters = (props) => {
  const { patientData } = props;

  const [open, setOpen] = useState(false);

  const handleCheckout = (e) => {
    console.log('Checkout');
  };

  return (
    <>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="Write Chief Complaint"
      >
        <ChiefComplaintForm />
      </CustomDialog>

      <SearchBar sx={{ mb: 5, }} onChange={(e) => console.log(e.target.value)} />

      <Section
        title={
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 3, }}>
              <Translations text="Medical codes" />
            </Typography>
            <LinkTypography sx={{ p: 1, }} onClick={() => setOpen(true)}>
              Write Diagnosis
            </LinkTypography>
            <LinkTypography sx={{ p: 1, }} onClick={() => setOpen(true)}>
              Chief Complaint
            </LinkTypography>
          </Box>
        }
        withDivider
      >
        <MedicalCodes data={patientData?.medical_code ?? []} />
      </Section>
      <Section title="Procedures" withDivider>
        {patientData?.procedure?.map((p) => (
          <Procedures data={p.items ?? []} />
        ))}
      </Section>
      <Section title="Medications" withDivider>
        <Medications data={patientData?.drugs ?? []} />
      </Section>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 10 }}>
        <Button variant='contained' sx={{ borderRadius: 1.5, textTransform: 'none' }} onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </>
  );
};

PatientEncounters.propTypes = {
  patientData: PropTypes.object,
};
