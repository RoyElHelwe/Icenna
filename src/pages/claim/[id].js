import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Permissions } from '../../constants/Permissions';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import ApprovalDetails from '../../sections/approval/ApprovalDetails';

const Claim = () => {
  const router = useRouter();

  return (
    <Box>
      <ApprovalDetails id={router.query.id} />
    </Box>
  );
};

Claim.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

Claim.access = Permissions.CanViewClaim;

export default Claim;
