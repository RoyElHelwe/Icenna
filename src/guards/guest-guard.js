import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

const GuestGuard = ({
  children, fallback
}) => {
  const router = useRouter();
  const auth = useAuth();

  const isUserAuthed = () => !auth.loading && auth.user?.action === 0;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.pathname === '/login' && isUserAuthed()) {
      const returnUrl = router.query.returnUrl;
      const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/home";
      router.replace(redirectURL);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, auth.user]);

  if (auth.loading || isUserAuthed()) {
    return fallback;
  }

  return <>{children}</>;
}

export default GuestGuard;
