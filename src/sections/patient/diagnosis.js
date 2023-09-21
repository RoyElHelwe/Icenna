import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandTable from '../../components/expand-table';

const Diagnosis = (props) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: t('Name'),
      enableEditing: false,
    },
    {
      accessorKey: 'code',
      header: t('Code'),
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: 'type',
      header: t('Type'),
      editVariant: 'select',
      editSelectOptions: ['Principal', 'Secondary'],
    },
  ], [],);

  return (
    <ExpandTable
      columns={columns}
      renderDetailPanel={({ row }) => (
        <Box sx={{ pb: 1, pl: 5 }}>
          <Typography variant="body2">{t('Description')}</Typography>
          <Typography sx={{ pt: 2, }} variant="section">{row.original.description}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default Diagnosis;
