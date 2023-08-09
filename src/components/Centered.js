import { Grid } from '@mui/material';
import { TOP_NAV_HEIGHT } from '../layouts/components/top-nav';

const Centered = ({ children, ...rest }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: `calc(100vh - ${TOP_NAV_HEIGHT}px)` }}
    {...rest}
  >
    <Grid item xs={3}>
      {children}
    </Grid>
  </Grid>
);

export default Centered;
