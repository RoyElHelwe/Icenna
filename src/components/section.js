import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Translations from './Translations';

const Section = ({ title, withDivider, children }) => (
  <Box sx={{ mb: 5, }}>
    {typeof title === 'string' ? (
      <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
        <Translations text={title} />
      </Typography>
    ) : (<>{title}</>)}
    {withDivider && <Divider sx={{ mt: 3, mb: 3 }} />}
    {children}
  </Box>
);

export default Section;

Section.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  withDivider: PropTypes.bool,
};
