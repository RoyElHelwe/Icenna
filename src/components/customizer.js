import CogIcon from '@heroicons/react/24/solid/CogIcon';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import Translations from './Translations';
import RtlSvgIcon from './rtl-svgicon';
import Scrollbar from './scrollbar';

const Toggler = styled(Box)(({ theme }) => ({
  right: 0,
  top: '30%',
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal,
  transform: 'translateY(-50%)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius
}))

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}));

const CustomizerSpacing = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 6)
}));

const Customizer = () => {
  const [open, setOpen] = useState(false);

  const { settings, saveSettings } = useSettings();

  const {
    mode,
    language,
  } = settings;

  const handleChange = (field, value) => {
    saveSettings({ ...settings, [field]: value });
  };

  return (
    <div>
      <Toggler onClick={() => setOpen(true)}>
        <RtlSvgIcon fontSize="medium">
          <CogIcon />
        </RtlSvgIcon>
      </Toggler>
      <Drawer open={open}
        hideBackdrop
        anchor='right'
        variant='persistent'>
        <Scrollbar
          sx={{
            height: '100%',
            '& .simplebar-content': {
              height: '100%'
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              p: theme => theme.spacing(3.5, 5),
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant='h6'
              sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              <Translations text="Settings" />
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}><Translations text="Customize your settings" /> </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                right: 20,
                top: '50%',
                position: 'absolute',
                color: 'text.secondary',
                transform: 'translateY(-50%)'
              }}
            >
              <RtlSvgIcon fontSize="medium">
                <CloseIcon />
              </RtlSvgIcon>
            </IconButton>
          </Box>
          <CustomizerSpacing>
            <Typography sx={{ mb: 4, }}>
              <Translations text="Theming" />
            </Typography>
            <Box sx={{ mb: 4 }}>
              <RadioGroup
                row
                value={mode}
                onChange={e => handleChange('mode', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='light'
                  label={<Translations text="Light" />}
                  control={<Radio />} />
                <FormControlLabel value='dark'
                  label={<Translations text="Dark" />}
                  control={<Radio />} />
              </RadioGroup>
            </Box>

            <Typography sx={{ mb: 4, }}>
              <Translations text="Language" />
            </Typography>
            <Box sx={{ mb: 4 }}>
              <RadioGroup
                row
                value={language}
                onChange={(e) => handleChange('language', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='en'
                  label={<Translations text="English" />}
                  control={<Radio />} />
                <FormControlLabel value='ar'
                  label={<Translations text="Arabic" />}
                  control={<Radio />} />
              </RadioGroup>
            </Box>
          </CustomizerSpacing>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
