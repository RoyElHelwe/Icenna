import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Section = ({ title, withDivider, children }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 5, }}>
      {typeof title === 'string' ? (
        <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
          {t(title)}
        </Typography>
      ) : (<>{title}</>)}
      {withDivider && <Divider sx={{ mt: 3, mb: 3 }} />}
      {children}
    </Box>
  );
};
export default Section;

Section.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  withDivider: PropTypes.bool,
};
