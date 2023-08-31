import { Box, Typography } from '@mui/material';
import React from 'react';
import { AsyncAutocomplete } from '../../components/AsyncAutocomplete';
import ExpandTable from '../../components/expand-table';

const Procedures = (props) => {
  const approvedOptions = ["Approved", "Cash",];
  const nonApprovedOptions = ["Ask For Approval", "Cash",];

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableEditing: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableEditing: (row) => (row.original.status !== 'Paid'),
      editVariant: 'select',
      Edit: ({ cell, column, row, table }) => {

        return (
          <AsyncAutocomplete
            fullWidth
            disableClearable
            isOptionEqualToValue={(o, v) => o === v}
            getOptionLabel={(o) => o ?? ''}
            options={row.original?.status === 'Approved' ? approvedOptions : nonApprovedOptions}
            value={row.original?.status}
            onChange={(e, v) => props.onUpdate(row, { status: v })}
          />
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      enableEditing: false,
    },
  ];

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
