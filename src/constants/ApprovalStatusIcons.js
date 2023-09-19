import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import PauseCircleIcon from '@heroicons/react/24/solid/PauseCircleIcon';

export const ApprovalStatusIcons = {
  "Approved": <CheckCircleIcon />,
  "Rejected": <XCircleIcon />,
  "Partially Approved": <InformationCircleIcon />,
  "Not Required": <CheckCircleIcon />,
  "Pended": <PauseCircleIcon />,
  "Submitted Amount": <CheckCircleIcon />,
  "Error": <XCircleIcon />,
  "Queued": <PauseCircleIcon />,
};
