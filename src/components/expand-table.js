import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';

const ExpandTable = (props) => {
  const globalTheme = useTheme();

  const tableTheme = useMemo(() =>
    createTheme({
      ...globalTheme,
      palette: {
        ...globalTheme.palette,
        background: {
          ...globalTheme.palette.background,
          default: globalTheme.palette.background.paper,
        },
      },
    }),
    [globalTheme],
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        enableColumnActions={false}
        enableSorting={false}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        muiTableHeadCellProps={{
          sx: { borderRight: `1px solid ${globalTheme.palette.divider}`, },
        }}
        muiTableBodyCellProps={{
          sx: { borderRight: `1px solid ${globalTheme.palette.divider}`, },
        }}
        muiTableContainerProps={{
          sx: { my: 5, },
        }}
        {...props}
      />
    </ThemeProvider>
  );
};

export default ExpandTable;
