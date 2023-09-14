import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Permissions } from '../../constants/Permissions';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import ApprovalDetails from '../../sections/approval/ApprovalDetails';

const Approval = () => {
  const router = useRouter();

  return (
    <Box>
      <ApprovalDetails id={router.query.id} />
    </Box>
  );
};

Approval.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

Approval.access = Permissions.CanViewApproval;

export default Approval;