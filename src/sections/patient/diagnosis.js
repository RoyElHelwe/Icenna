import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapseTable from '../../components/CollapsibleTable';

const Diagnosis = (props) => {
  const { t } = useTranslation();

  const typeOptions = [{ label: 'Principal', value: 'Principal' }, { label: 'Secondary', value: 'Secondary' }];

  const columns = [
    {
      field: 'name',
      headerName: t('Name'),
      width: '100%',
    },
    {
      field: 'code',
      headerName: t('Code'),
      width: 300,
      size: 50,
    },
    {
      field: 'type',
      headerName: t('Type'),
      width: 300,
      editable: true,
      type: 'select',
      valueOptions: typeOptions,
    },
  ];

  return (
    <CollapseTable
      columns={columns}
      renderRowDetails={(row) => (
        <Box sx={{ mx: 5, my: 3, }}>
          <Typography variant="body2">{t('Description')}</Typography>
          <Typography sx={{ pt: 2, }} variant="section">{row.description}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default Diagnosis;
