import { Box, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';

const data = [
  {
    id: '1',
    firstName: 'Dylan',
    middleName: 'Sprouse',
    lastName: 'Murray',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    country: 'United States',
  },
  {
    id: '2',
    firstName: 'Raquel',
    middleName: 'Hakeem',
    lastName: 'Kohler',
    address: '769 Dominic Grove',
    city: 'Vancouver',
    state: 'British Columbia',
    country: 'Canada',
  },
  {
    id: '3',
    firstName: 'Ervin',
    middleName: 'Kris',
    lastName: 'Reinger',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    country: 'United States',
  },
  {
    id: '4',
    firstName: 'Brittany',
    middleName: 'Kathryn',
    lastName: 'McCullough',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    country: 'United States',
  },
  {
    id: '5',
    firstName: 'Branson',
    middleName: 'John',
    lastName: 'Frami',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    country: 'United States',
  },
];

const ExpandTable = (props) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          <Typography>Address: {row.original.address}</Typography>
          <Typography>City: {row.original.city}</Typography>
          <Typography>State: {row.original.state}</Typography>
          <Typography>Country: {row.original.country}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default ExpandTable;
