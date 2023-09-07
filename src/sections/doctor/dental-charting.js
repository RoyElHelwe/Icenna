import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../hooks/useSettings';

export const DentalCharting = ({ filledTeeth, ...rest }) => {
  const { settings: { direction } } = useSettings();
  const { t } = useTranslation();

  const upperToothIds = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,];
  const lowerToothIds = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,];

  return (

    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', direction }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1, mt: 2 }}>{t('Right')}</Typography>

      <Grid container sx={{ flexGrow: 1 }} columns={{ xs: 16 }}>
        {upperToothIds.map((t) => {
          const isFilled = filledTeeth?.indexOf(t) !== -1;

          return (
            <Grid key={t} item xs={1} sx={{ mb: 10, }}>
              <Grid container direction="column" justifyContent="end" alignItems="center" sx={{ minHeight: '100%' }}>
                <Grid item xs={1}>
                  <Box sx={{ cursor: 'pointer', }}>
                    <img src={`/assets/teeth/${t}.svg`} />
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 3, }}>{t}</Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
        {lowerToothIds.map((t) => (
          <Grid key={t} item xs={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>{t}</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ cursor: 'pointer', }}>
              <img src={`/assets/teeth/${t}.svg`} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1, mt: 2 }}>{t('Left')}</Typography>
    </Box>
  );
};

DentalCharting.propTypes = {
  filledTeeth: PropTypes.arrayOf(PropTypes.number),
};
