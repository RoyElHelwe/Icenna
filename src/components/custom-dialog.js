import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
});

export const DefaultOptions = {
  open: false,
  title: '',
  description: '',
  minHeight: undefined,
  children: undefined,
};

const CustomDialog = ({
  open,
  setOpen,
  title,
  minHeight,
  description,
  onSubmit,
  onClose: onCloseOption,
  children,
  ...rest
}) => {

  const onClose = () => {
    onCloseOption?.();
    setOpen?.(false);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      onClose={onClose}
      TransitionComponent={Transition}
      {...rest}
    >
      <DialogContent
        sx={{
          minHeight,
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton
          size='small'
          onClick={onClose}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            {title}
          </Typography>
          <Typography variant='body2'>{description}</Typography>
        </Box>
        {children}
      </DialogContent>
      {onSubmit && (
        <DialogActions
          sx={{
            justifyContent: 'flex-end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={onSubmit}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            Discard
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
