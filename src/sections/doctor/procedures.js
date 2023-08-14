import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import ExpandTable from '../../components/expand-table';

const Procedures = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
  ], [],);

  return (
    <ExpandTable
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Box sx={{ pb: 1, pl: 5 }}>
          <Typography variant="body2">Clinical Procedures</Typography>
          <Typography sx={{ pt: 2, }} variant="section">{row.original.description}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default Procedures;
