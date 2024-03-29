import themeConfig from '../../configs/theme';

const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 5,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          ...(ownerState.size === 'medium' &&
            ownerState.variant === 'text' && {
            padding: `${theme.spacing(1.875, 3)}`
          })
        }),
        contained: ({ theme }) => ({
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1.875, 5.5)}`
        }),
        outlined: ({ theme }) => ({
          padding: `${theme.spacing(1.625, 5.25)}`
        }),
        sizeSmall: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'text' && {
            padding: `${theme.spacing(1, 2.25)}`
          }),
          ...(ownerState.variant === 'contained' && {
            padding: `${theme.spacing(1, 3.5)}`
          }),
          ...(ownerState.variant === 'outlined' && {
            padding: `${theme.spacing(0.75, 3.25)}`
          })
        }),
        sizeLarge: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'text' && {
            padding: `${theme.spacing(2.125, 5.5)}`
          }),
          ...(ownerState.variant === 'contained' && {
            padding: `${theme.spacing(2.125, 6.5)}`
          }),
          ...(ownerState.variant === 'outlined' && {
            padding: `${theme.spacing(1.875, 6.25)}`
          })
        })
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple,
      }
    }
  };
};

export default Button;
