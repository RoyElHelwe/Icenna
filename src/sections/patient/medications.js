import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseTable from '../../components/CollapsibleTable';
import MedicationForm from '../../forms/medication';

const Medications = ({ onUpdate, ...props }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      field: 'name',
      headerName: t('Name'),
      width: '100%',
    },
    {
      field: 'dose',
      width: 200,
      headerName: t('Dose'),
    },
  ], [],);


  const [editingRow, setEditingRow] = useState();

  const toggleButton = (row) => setEditingRow((prev) => prev ? undefined : row);

  return (
    <CollapseTable
      columns={columns}
      renderRowDetails={(row) => (
        <Box sx={{ mx: 5, my: 3, }}>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <Typography variant="body2">{t("Route")}</Typography>
              <Typography sx={{ pt: 2, }} variant="section">{row.route}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{t("Period")}</Typography>
              <Typography sx={{ pt: 2, }} variant="section">{row.period.name}</Typography>

            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{t("Repeat")}</Typography>
              <Typography sx={{ pt: 2, }} variant="section">{row.dosage.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{t("Dose")}</Typography>
              <Typography sx={{ pt: 2, }} variant="section">{row.dose}</Typography>
            </Grid>
            <Grid item xs={1}>
              {!!onUpdate && (
                <IconButton onClick={() => toggleButton(row)}>
                  {editingRow === row ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              {editingRow === row && (
                <MedicationForm
                  values={{
                    dose: row.dose,
                    dosage: row.dosage,
                    period: row.period,
                  }}
                  onSubmit={(data) => {
                    toggleButton(row);
                    onUpdate?.(row, {
                      dose: data.dose,
                      dosage: data.dosage?.id,
                      period: data.period?.id,
                      route: 'Oral',
                    });
                  }}
                  submitLabel="Update"
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      {...props}
    />
  );
};

export default Medications;
