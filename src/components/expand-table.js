import { MenuItem, ThemeProvider, createTheme, useTheme } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ExpandTable = ({ actions, onUpdate, muiTableHeadCellProps, ...props }) => {
  const globalTheme = useTheme();
  const { t } = useTranslation();

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
          ...muiTableHeadCellProps,
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
            header: t('Actions'),
            maxSize: 20,
          },
          'mrt-row-expand': {
            maxSize: 20,
          },
        }}
        {...(!!actions?.length && {
          enableRowActions: true,
          renderRowActionMenuItems: ({ closeMenu, row, table }) => actions.map((a) => (
            <MenuItem key={a.name} onClick={() => {
              closeMenu();
              a.onClick(row);
            }}>
              {a.name}
            </MenuItem>
          ))
        })}
        {...(!!onUpdate && {
          enableEditing: true,
          editingMode: "table",
          muiTableBodyCellEditTextFieldProps: (data) => ({
            onChange: (event) => {
              console.log(data, event.target.value);
            },
          })
        })}
        {...props}
      />
    </ThemeProvider>
  );
};

ExpandTable.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
  onUpdate: PropTypes.func,
};

export default ExpandTable;
