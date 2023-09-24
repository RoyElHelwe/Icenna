import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

const GuestGuard = (props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (auth.loading) {
    return fallback;
  }

  return <>{children}</>;
}

export default GuestGuard;
