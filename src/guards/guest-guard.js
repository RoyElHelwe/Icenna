import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

export const getUserBack = (router) => {
  const returnUrl = router.query.returnUrl;
  const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/home";
  router.replace(redirectURL);
};

const GuestGuard = ({
  children, fallback
}) => {
  const router = useRouter();
  const auth = useAuth();

  const isUserAuthed = () => !auth.loading && auth.user?.action === 0;
  const isUserAuthIncomplete = () => !!auth.user && auth.user?.action !== 0;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.pathname === '/login') {
      if (isUserAuthed()) {
        getUserBack(router);
      } else if (isUserAuthIncomplete()) {
        auth.redirectUser(auth.user);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, auth.user]);

  if (auth.loading || isUserAuthed()) {
    return fallback;
  }

  return <>{children}</>;
}

export default GuestGuard;
