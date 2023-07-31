import { Alert, Grid } from '@mui/material';

const CenteredAlert = ({ severity, message, onClose, ...rest }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
    {...rest}
  >
    <Grid item xs={3}>
      <Alert
        elevation={3}
        variant='filled'
        onClose={onClose}
        sx={{ width: '100%' }}
        severity={severity ?? 'info'}
      >
        {message ?? ''}
      </Alert>
    </Grid>
  </Grid>
);

export default CenteredAlert;
