const DefaultPalette = (mode, skin, themeColor) => {
  const whiteColor = '#FFF';
  const lightColor = '58, 53, 65';
  const darkColor = '231, 227, 252';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#C6A7FE'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#211f20'
    } else if (mode === 'light') {
      return '#F4F5FA'
    } else return '#2a2a2a'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === 'light' ? '#F4F5FA' : '#2a2a2a',
      trackBg: mode === 'light' ? '#F0F2F8' : '#373737',
      avatarBg: mode === 'light' ? '#F0EFF0' : '#373737',
      darkBg: skin === 'bordered' ? '#211f20' : '#2a2a2a',
      lightBg: skin === 'bordered' ? whiteColor : '#F4F5FA',
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#373737',
      development: mode === 'light' ? '#FBBDBD' : '#803B3B',
      test: mode === 'light' ? '#D8EDFD' : '#395973',
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#3392FA',
      main: '#0077F9',
      dark: '#0053AE',
      contrastText: whiteColor
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: whiteColor
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: whiteColor
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: whiteColor
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#211f20',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
    sso: {
      google: {
        light: '#e2695f',
        main: '#db4437',
        dark: '#c53d32',
      },
      apple: {
        light: '#1a1a1a',
        main: '#101010',
        dark: '#000000',
      },
    }
  }
}

export default DefaultPalette
