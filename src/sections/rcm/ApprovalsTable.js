import { Chip } from "@mui/material";
import DataTable from "../../components/DataTable";
import { ApprovalStatusColors } from "../../constants";

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
    <DataTable
      columns={columns}
      {...props}
    />
  );
};

export default ApprovalsTable;
