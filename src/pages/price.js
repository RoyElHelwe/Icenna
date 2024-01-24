// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PricePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/pricing');
  }, []);

  return null;
};

PricePage.authGuard = false;

export default PricePage;
