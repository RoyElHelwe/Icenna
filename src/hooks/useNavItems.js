import { Permissions } from "../constants/Permissions";
import { useHasPermissions } from "./useHasPermissions";

export const useNavItems = () => {
  return [
    ...(useHasPermissions(Permissions.CanViewHome) ? [{
      title: 'Home',
      path: '/home',
    }] : []),
    ...(useHasPermissions(Permissions.CanViewHealthcare) ? [{
      title: 'Healthcare',
      path: '/healthcare',
    }] : []),
    ...(useHasPermissions(Permissions.CanViewPatient) ? [{
      title: 'Patient',
      path: '/patient',
    }] : []),
    ...(useHasPermissions(Permissions.CanViewCalendar) ? [{
      title: 'Calendar',
      path: '/calendar',
    }] : []),
    ...(useHasPermissions(Permissions.CanViewCalendar) ? [{
      title: 'RCM',
      path: '/rcm',
    }] : []),
    ...(useHasPermissions(Permissions.CanViewSettings) ? [{
      title: 'Settings',
      path: '/settings',
    }] : []),
  ]
};
