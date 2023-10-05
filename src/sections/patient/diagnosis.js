import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapseTable from '../../components/CollapsibleTable';
import DotAvatar from '../../components/DotAvatar';

const Diagnosis = ({ editable, visibleColumns, ...props }) => {
  const { t } = useTranslation();

  const typeOptions = [{ label: 'Principal', value: 'Principal' }, { label: 'Secondary', value: 'Secondary' }];

  const columns = [
    {
      field: 'name',
      headerName: t('Name'),
      width: '100%',
    },
    {
      field: 'error',
      headerName: t('Errors'),
      width: 200,
      editable: false,
      visible: !!visibleColumns?.includes('error') && !!props.rows?.find((r) => !!r.error),
      renderCell: (row) => {
        if (row?.error) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, }}>
              <DotAvatar sx={{ bgcolor: 'error.main' }}>{''}</DotAvatar>
              <Typography>{row?.error}</Typography>
            </Box>
          );
        }

        return (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, }}>
            <DotAvatar sx={{ bgcolor: 'success.main' }}>{''}</DotAvatar>
            <Typography>No Error</Typography>
          </Box>
        );
      }
    },
    {
      field: 'code',
      headerName: t('Code'),
      width: 200,
      size: 50,
    },
    {
      field: 'type',
      headerName: t('Type'),
      width: 300,
      editable: editable,
      type: 'select',
      valueOptions: (row, rows) => {
        if (rows?.filter((r) => r.type === 'Principal')?.length > 0) {
          return [{ value: 'Secondary', label: 'Secondary' }];
        }

        return typeOptions;
      },
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
