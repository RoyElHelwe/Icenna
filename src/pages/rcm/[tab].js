import RCM from '../../sections/rcm/rcm';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import { Permissions } from '../../constants/Permissions';

const RCMTab = ({ tab, }) => {
  return <RCM tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'patient-encounters' } },
      { params: { tab: 'approvals' } },
      { params: { tab: 'claims' } },
    ],
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: {
      tab: params?.tab,
    },
  };
};

RCMTab.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

RCMTab.access = Permissions.CanViewRCM;

export default RCMTab;
