import { Grid, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';

const Medications = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'dose',
      header: 'Dose',
    },
  ], [],);

  return (
    <MaterialReactTable
      enableTopToolbar={false}
      enableBottomToolbar={false}
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body2">Route</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.route}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Period</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.period.name}</Typography>

          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Repeat</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.dosage.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Dose</Typography>
            <Typography sx={{ pt: 2, }} variant="section">{row.original.dose}</Typography>
          </Grid>
        </Grid>
      )}
      {...props}
    />
  );
};

export default Medications;
