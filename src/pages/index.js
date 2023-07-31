import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout as DashboardLayout } from '../layouts/dashboard-layout';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, []);

  return (
    <Head>
      <title>iCenna</title>
    </Head>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
