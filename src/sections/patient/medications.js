import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandTable from '../../components/expand-table';
import MedicationForm from '../../forms/medication';

const Medications = ({ onUpdate, ...props }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: t('Name'),
    },
    {
      accessorKey: 'dose',
      header: t('Dose'),
    },
  ], [],);


  const [editingRow, setEditingRow] = useState();

  const toggleButton = (row) => setEditingRow((prev) => prev ? undefined : row);

  return (
    <ExpandTable
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Typography variant="body2">{t("Route")}</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.route}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">{t("Period")}</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.period.name}</Typography>

          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">{t("Repeat")}</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.dosage.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">{t("Dose")}</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.dose}</Typography>
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
                  dose: row.original.dose,
                  dosage: row.original.dosage,
                  period: row.original.period,
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
      )}
      {...props}
    />
  );
};

export default Medications;
