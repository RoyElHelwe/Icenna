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
    },
    {
      accessorKey: 'code',
      header: t('Code'),
    },
    {
      accessorKey: 'description',
      header: t('Description'),
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
