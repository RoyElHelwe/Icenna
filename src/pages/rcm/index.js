import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CenteredCircularProgress from '../../components/centered-circular-progress';
import { Permissions } from '../../constants/Permissions';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/rcm/patient-encounters');
  }, []);

  return (
    <CenteredCircularProgress />
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

Page.access = Permissions.CanViewRCM;

export default Page;
