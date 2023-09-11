import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { PatientDetails } from "../../sections/patient/patient-details";
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';

const Encounter = () => {
  const router = useRouter();

  return (
    <Box>
      <PatientDetails appointment={router.query.id} viewTabs={['Patient Encounter']} />
    </Box>
  );
};

Encounter.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Encounter;