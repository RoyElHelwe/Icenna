import { Box, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';

const MedicalCodes = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
  ], [],);

  return (
    <MaterialReactTable
      enableTopToolbar={false}
      enableBottomToolbar={false}
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Box sx={{ pb: 1, pl: 5 }}>
          <Typography variant="body2">Description</Typography>
          <Typography sx={{ pt: 2, }} variant="section">{row.original.description}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default MedicalCodes;
