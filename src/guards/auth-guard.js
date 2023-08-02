import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authConfig from '../configs/auth';
import { useAuth } from '../hooks/use-auth';

const redirect = (router, to, restPath = false) => {
  if (router.asPath !== '/' && !restPath) {
    router.replace({
      pathname: to,
      query: { returnUrl: router.asPath, },
    });
  } else {
    router.replace(to);
  }
};

const AuthGuard = (props) => {
  const { children, fallback } = props;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!loading && !user) {
      redirect(router, '/login', router.pathname.includes('/login'));
    } else if (user && user?.action !== 0 && !router.pathname.includes('login/confirm')) {
      redirect(router, '/login/confirm');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, loading]);


  if (loading || user === null || (user?.action !== 0 && !router.pathname.includes('login/confirm'))) {
    return fallback;
  }

  return <>{children}</>;
}

export default AuthGuard;
