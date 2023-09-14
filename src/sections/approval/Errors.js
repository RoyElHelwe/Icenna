import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandTable from '../../components/expand-table';

const Errors = (props) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      accessorKey: 'code',
      header: t('Code'),
    },
    {
      accessorKey: 'message',
      header: t('Message'),
    },
    {
      accessorKey: 'path',
      header: t('Path'),
    },
  ], [],);

  return (
    <ExpandTable
      columns={columns}
      {...props}
    />
  );
};

export default Errors;
