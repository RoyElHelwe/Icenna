import { deepmerge } from '@mui/utils'
import breakpoints from './breakpoints'
import overrides from './overrides'
import palette from './palette'
import shadows from './shadows'
import spacing from './spacing'
import typography from './typography'

const themeOptions = (settings) => {
  const { skin, mode, direction, themeColor } = settings;

  const themeConfig = {
    breakpoints: breakpoints(),
    direction,
    components: overrides(settings),
    palette: palette(mode, skin, themeColor),
    ...spacing,
    shape: {
      borderRadius: 6
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    },
    shadows: shadows(mode),
    typography,
  };

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        ...(themeConfig.palette
          ? themeConfig.palette[themeColor]
          : palette(mode, skin, themeColor).primary),
      },
    },
  });
}

export default themeOptions
