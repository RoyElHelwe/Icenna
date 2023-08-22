import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FallbackSpinner from '../components/spinner';
import { useHasPermissions } from '../hooks/useHasPermissions';

const AclGuard = ({ access, children, guestGuard = false, }) => {
  const router = useRouter();
  const hasPermission = useHasPermissions(access) || !access;

  useEffect(() => {
    if (!guestGuard && !hasPermission) {
      router.replace('/401');
    }
  }, [router]);

  if (guestGuard || hasPermission) {
    return <>{children}</>
  }

  return (
    <FallbackSpinner />
  );
};

export default AclGuard;
