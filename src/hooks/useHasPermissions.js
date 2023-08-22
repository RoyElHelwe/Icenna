import { UserPermissions } from "../constants/Permissions";
import { useAuth } from "./use-auth";

export const useHasPermissions = (permissions) => {
  const { user, } = useAuth();
  if (!user?.user_type) {
    return false;
  }
  const { user_type } = user;

  const userPermissions = UserPermissions.find((up) => up.name === user_type)?.permissions;

  if (!userPermissions?.length) {
    return false;
  }

  if (typeof permissions === 'string') {
    return userPermissions.includes?.(permissions);
  }

  if (Array.isArray(permissions)) {
    return userPermissions.some((p) => Boolean(permissions.includes?.(p)));
  }

  return false;
};
