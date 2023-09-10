import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { default as React, useState, } from 'react';
import { useTranslation } from 'react-i18next';
import { AsyncAutocomplete } from '../../components/AsyncAutocomplete';
import ExpandTable from '../../components/expand-table';
import ProcedureForm from '../../forms/procedure';

const Procedures = ({ department, onUpdate, ...props }) => {
  const approvedOptions = ["Approved", "Cash",];
  const nonApprovedOptions = ["Ask For Approval", "Cash",];
  const { t } = useTranslation();

  const columns = [
    {
      accessorKey: 'name',
      header: t('Name'),
      enableEditing: false,
    },
    {
      accessorKey: 'status',
      header: t('Status'),
      enableEditing: (row) => (!!onUpdate && row.original.status !== 'Paid'),
      Edit: ({ cell, column, row, table }) => {

        return (
          <AsyncAutocomplete
            fullWidth
            disableClearable
            isOptionEqualToValue={(o, v) => o === v}
            getOptionLabel={(o) => o ?? ''}
            options={row.original?.status === 'Approved' ? approvedOptions : nonApprovedOptions}
            value={row.original?.status}
            onChange={(e, v) => onUpdate(row, { status: v })}
          />
        );
      },
    },
    {
      accessorKey: 'price',
      header: t('Price'),
      enableEditing: false,
    },
    ...((department === 'Dental') ? [
      {
        accessorKey: 'body_site.code',
        header: t('Tooth code'),
        enableEditing: false,
      },
    ] : [])
  ];

  const [editingRow, setEditingRow] = useState();

  const toggleButton = (row) => setEditingRow((prev) => prev ? undefined : row);

  return (
    <ExpandTable
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Grid container spacing={5}>
          <Grid item xs={11}>
            <Box sx={{ pb: 1, pl: 5 }}>
              <Typography variant="body2">{t("Clinical Procedures")}</Typography>
              <Typography sx={{ pt: 2, }} variant="section">{row.original.description}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            {onUpdate && (
              <IconButton onClick={() => toggleButton(row)}>
                {editingRow === row ? <CloseIcon /> : <EditIcon />}
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            {editingRow === row && (
              <ProcedureForm
                values={{
                  body_site: row.original.body_site,
                }}
                onSubmit={(data) => {
                  toggleButton(row);
                  onUpdate?.(row, {
                    body_site: data.body_site?.code,
                  });
                }}
                submitLabel="Update"
              />
            )}
          </Grid>
        </Grid>
      )}
      onUpdate
      {...props}
    />
  );
};

export default Procedures;
