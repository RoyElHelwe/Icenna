import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '../../../components/spinner';
import { useAuth } from '../../../hooks/use-auth';
import ConfirmLoginLayout from '../../../layouts/confirm-login-layout';

export const confirmStatusRoute = {
  1: 'verifyEmail',
  4: 'addMobile',
  2: 'verifyMobile',
  3: 'acceptTerms',
};

const ConfirmLogin = () => {
  const { user, } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (user.action === 0) {
      const returnUrl = router.query.returnUrl;
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL);
    } else if (user?.action && router.pathname === '/login/confirm') {
      const { provider, auth_token, ...rest } = router.query;

      const to = `/login/confirm/${confirmStatusRoute[user.action]}`;
      router.replace({
        pathname: to,
        query: rest,
      });
    }
  }, []);

  return <Spinner />;
};

ConfirmLogin.getLayout = (page) => <ConfirmLoginLayout>{page}</ConfirmLoginLayout>;

export default ConfirmLogin;
