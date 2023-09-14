import { Chip } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { ApprovalStatusColors } from "../../constants";

export const PageSizes = [25, 50, 100];

const ApprovalsTable = ({ ...props }) => {
  const columns = [
    { field: 'patient_name', headerName: 'Patient Name', width: 250, },
    { field: 'practitioner_name', headerName: 'Practitioner Name', width: 250, },
    { field: 'creation', headerName: 'Created At', width: 250, type: 'date' },
    {
      field: 'status', headerName: 'Status', width: 175,
      renderCell: ({ value }) => (
        <Chip
          sx={{
            backgroundColor: ApprovalStatusColors[value],
            width: '100%'
          }}
          label={value}
          size="small"
        />
      ),
    },
  ];

  return (
    <DataGrid
      sx={{
        bgcolor: "background.paper",
        height: '80vh',
        // disable cell selection style
        '.MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        // pointer cursor on ALL rows
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
      }}
      pageSizes={PageSizes}
      columns={columns}
      paginationMode="server"
      {...props}
    />
  );
};

export default ApprovalsTable;