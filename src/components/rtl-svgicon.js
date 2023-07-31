import { SvgIcon } from '@mui/material';
import { useSettings } from '../hooks/useSettings';


const RtlSvgIcon = (props) => {
  const { settings } = useSettings();

  return (
    <SvgIcon
      sx={{
        transform: settings.direction === 'rtl' ? "scaleX(-1)" : undefined
      }}
      {...props}
    />
  );
}


export default RtlSvgIcon;
