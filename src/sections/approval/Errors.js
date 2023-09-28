import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapseTable from '../../components/CollapsibleTable';

const Errors = (props) => {
  const { t } = useTranslation();

  const columns = [
    {
      field: 'code',
      headerName: t('Code'),
      width: 175,
    },
    {
      field: 'message',
      headerName: t('Message'),
      width: '50%',
    },
    {
      field: 'path',
      headerName: t('Path'),
      width: '50%',
    },
  ];

  return (
    <CollapseTable
      columns={columns}
      {...props}
    />
  );
};

export default Errors;
