import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@tanstack/react-query";
import { getPatientEncounters } from "../../api/rcm";
import { useRouter } from "next/router";

const PatientEncounters = () => {
  const router = useRouter();

  const columns = [
    { field: 'patient_name', headerName: 'Patient Name', width: 250, },
    { field: 'practitioner_name', headerName: 'Practitioner Name', width: 250, },
    { field: 'encounter_date', headerName: 'Encounter Date', width: 250, },
  ];

  const { isLoading, data } = useQuery({
    queryKey: ['get_patient_encounters'],
    queryFn: getPatientEncounters,
  });

  const handleRowClick = (params) => {
    router.push(`/encounter/${params.row.id}`);
  };

  return (
    <Box>
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
        onRowClick={handleRowClick}
        loading={isLoading}
        columns={columns}
        rows={data?.data?.data ?? []}
      />
    </Box>
  );
};

export default PatientEncounters;