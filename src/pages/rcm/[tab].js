import { Permissions } from '../../constants/Permissions';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import RCM from '../../sections/rcm/rcm';

const RCMTab = ({ tab, }) => {
  return <RCM tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'claims' } },
      { params: { tab: 'payment' } },
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
