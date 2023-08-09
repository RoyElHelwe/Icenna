import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, ThemeProvider, createTheme, useTheme } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';

const ExpandTable = ({ onDelete, ...props }) => {
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
        positionActionsColumn='last'
        displayColumnDefOptions={{
          'mrt-row-actions': {
            maxSize: 20,
          },
          'mrt-row-expand': {
            maxSize: 20,
          },
        }}
        {...(
          onDelete && {
            enableRowActions: true,
            renderRowActions: ({ row, table }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton color="error" onClick={() => onDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          }
        )}
        {...props}
      />
    </ThemeProvider>
  );
};

export default ExpandTable;
