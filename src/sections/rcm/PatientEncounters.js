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

  const { isLoading, error, data } = useQuery({
    queryKey: ['get_patient_encounters'],
    queryFn: getPatientEncounters,
  });

  const handleRowClick = (params) => {
    router.push(`/encounter/${params.row.id}`);
  };

  return (
    <Box>
      <DataGrid
        sx={{ bgcolor: "background.paper", minHeight: 500 }}
        onRowClick={handleRowClick}
        loading={isLoading}
        columns={columns}
        rows={data?.data?.data ?? []}
      />
    </Box>
  );
};

export default PatientEncounters;