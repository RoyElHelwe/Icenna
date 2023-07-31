import CogIcon from '@heroicons/react/24/solid/CogIcon';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import RtlSvgIcon from '../components/rtl-svgicon';

export const navItems = [
  {
    title: 'Home',
    path: '/home',
    icon: (
      <RtlSvgIcon fontSize="medium">
        <HomeIcon />
      </RtlSvgIcon>
    )
  },
  {
    title: 'Healthcare',
    path: '/healthcare',
    icon: (
      <RtlSvgIcon fontSize="medium">
        <LocalHospitalIcon />
      </RtlSvgIcon>
    )
  },
  {
    title: 'Reception',
    path: '/reception',
    icon: (
      <RtlSvgIcon fontSize="medium">
        <FormatListBulletedIcon />
      </RtlSvgIcon>
    )
  },
  {
    title: 'Doctor',
    path: '/doctor',
    icon: (
      <RtlSvgIcon fontSize="medium">
        <MasksIcon />
      </RtlSvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <RtlSvgIcon fontSize="medium">
        <CogIcon />
      </RtlSvgIcon>
    )
  }
];
