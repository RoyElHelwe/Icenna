import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { default as React } from 'react';
import { useTranslation } from 'react-i18next';
import { getDentalCharting } from '../../api/practitioner';
import CollapseTable from '../../components/CollapsibleTable';

const Procedures = ({ department, onUpdate, nonEditableColumns, editable, ...props }) => {
  const cashOption = { value: "Cash", label: "Cash", };
  const statusOptions = [{ value: "Ask For Approval", label: "Ask For Approval" }, cashOption];
  const { t } = useTranslation();

  const { data, } = useQuery({
    queryKey: ['getDentalCharting'],
    queryFn: getDentalCharting,
  });
  const toothCodeOptions = [
    { value: undefined, label: '', },
    ...data?.data?.data?.map((d) => ({ value: d.code, label: `${d.code} - ${d.description}`, })) ?? []
  ];

  let columns = [
    {
      field: 'name',
      headerName: t('Name'),
      width: '100%',
      editable: false,
    },
    {
      field: 'status',
      headerName: t('Status'),
      width: 200,
      editable: (row) => (editable && row?.status !== 'Paid'),
      type: 'select',
      valueOptions: (row) => {
        if (row?.status === 'Waiting Response') {
          return [{ value: 'Waiting Response', label: 'Waiting Response' }, cashOption];
        }

        return statusOptions;
      },
    },
    {
      field: 'price',
      headerName: t('Price'),
      width: 150,
      editable: editable,
      type: 'number',
    },
    ...(
      (department === 'Dental') ? [
        {
          field: 'body_site.code',
          headerName: t('Tooth code'),
          width: 350,
          editable: editable,
          type: 'select',
          valueOptions: toothCodeOptions,
          cellRequired: (row) => !!row?.body_site_required,
        },
      ] : []
    )
  ];

  if (nonEditableColumns?.length) {
    columns = columns.map((c) => ({
      ...c,
      editable: nonEditableColumns.includes(c.field) ? false : c.editable,
    }))
  }

  return (
    <CollapseTable
      columns={columns}
      renderRowDetails={(row) => (
        <Box sx={{ mx: 5, my: 3, }}>
          <Typography variant="body2">{t("Clinical Procedures")}</Typography>
          <Typography sx={{ pt: 2, }} variant="section">{row.description}</Typography>
        </Box>
      )}
      {...props}
    />
  );
};

export default Procedures;
