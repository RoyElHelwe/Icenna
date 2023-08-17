import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const CenteredCircularProgress = ({ ...rest }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', }}
    {...rest}
  >
    <Grid item 
    xs={3}>
      <CircularProgress />
    </Grid>
  </Grid>
);

export default CenteredCircularProgress;
