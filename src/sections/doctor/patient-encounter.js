import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Translations from '../../components/Translations';
import CustomDialog from '../../components/custom-dialog';
import SearchBar from '../../components/searchbar';
import Section from '../../components/section';
import SectionList from '../../components/section-list';
import SectionTreeItem from '../../components/section-tree-item';
import ChiefComplaintForm from '../../forms/chief-complaint';

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
        <SectionList>
          {patientData?.medical_code?.map((c, i) => (
            <SectionTreeItem
              key={c.id}
              id={c.id}
              title={(
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mr: 3, }}>
                  <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>{c.name}</Typography>
                  <Typography>{c.code}</Typography>
                </Box>
              )}
              {...(i === patientData?.medical_code?.length - 1 && { sx: { borderRadius: 0, } })}
            >
              <Typography variant="body2">Description</Typography>
              <Typography sx={{ pt: 2 }} variant="section">{c.description}</Typography>
            </SectionTreeItem>
          ))}
        </SectionList>
      </Section>
      <Section title="Procedures" withDivider>
        {patientData?.procedure?.map((p) => (
          <SectionList key={p.approval_id}>
            {p.items?.map((pro, i) => (
              <SectionTreeItem
                key={pro.id}
                id={pro.id}
                title={(
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mr: 3, }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>{pro.name}</Typography>
                    <Typography>{pro.price} SAR</Typography>
                  </Box>
                )}
                {...(i === p?.items?.length - 1 && { sx: { borderRadius: 0, } })}
              >
                <Typography variant="body2">Clinical Procedures</Typography>
                <Typography sx={{ pt: 2 }} variant="section">{pro.description}</Typography>
              </SectionTreeItem>
            ))}
          </SectionList>
        ))}
      </Section>
      <Section title="Medications" withDivider>
        {patientData?.drugs?.map((d) => (
          <SectionTreeItem key={d.id} id={d.id} title={(
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mr: 3, }}>
              <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>{d.name}</Typography>
              <Typography>{d.code}</Typography>
            </Box>
          )}>
            <Typography variant="body2">Description</Typography>
            <Typography sx={{ pt: 2 }} variant="section">{d.description}</Typography>
          </SectionTreeItem>
        ))}
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
