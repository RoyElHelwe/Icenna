export const Permissions = {
  CanViewHome: 'CanViewHome',
  CanViewDashboard: 'CanViewDashboard',
  CanViewHealthcare: 'CanViewHealthcare',
  CanViewPatient: 'CanViewPatient',
  CanViewCalendar: 'CanViewCalendar',
  CanViewRCM: 'CanViewRCM',
  CanViewSettings: 'CanViewSettings',
  CanViewApproval: 'CanViewApproval',
  CanViewClaim: 'CanViewClaim',
  CanViewEncounter: 'CanViewEncounter',
  CanViewPractitionerWithPatient: 'CanViewPractitionerWithPatient',
};

export const UserRoles = {
  Administrator: 'Administrator',
  HealthcareAdministrator: 'Healthcare Administrator',
  HealthcareManager: 'Healthcare Manager',
  SalesUser: 'Sales User',
  Practitioner: 'Practitioner',
  Receptionist: 'Receptionist',
  Patient: 'Patient',
};

export const UserPermissions = [
  { name: 'Administrator', permissions: Object.keys(Permissions) },
  { name: 'Healthcare Administrator', permissions: Object.keys(Permissions) },
  { name: 'Healthcare Manager', permissions: [Permissions.CanViewHome, Permissions.CanViewCalendar, Permissions.CanViewPatient, Permissions.CanViewSettings] },
  { name: 'Sales User', permissions: [Permissions.CanViewHome, Permissions.CanViewSettings] },
  { name: 'Practitioner', permissions: [Permissions.CanViewHome, Permissions.CanViewCalendar, Permissions.CanViewPatient, Permissions.CanViewSettings] },
  { name: 'Receptionist', permissions: [Permissions.CanViewHome, Permissions.CanViewCalendar, Permissions.CanViewSettings] },
  { name: 'Patient', permissions: [Permissions.CanViewHome, Permissions.CanViewSettings] },
];
