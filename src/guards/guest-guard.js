import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authConfig from '../configs/auth';
import { useAuth } from '../hooks/use-auth';

const GuestGuard = (props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (window.localStorage.getItem(authConfig.storUserKeyName)) {
      router.replace('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
}

export default GuestGuard;
