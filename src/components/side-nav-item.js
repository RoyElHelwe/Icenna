import { Box, ButtonBase } from '@mui/material';
import PropTypes from 'prop-types';


export const SideNavItem = (props) => {
  const { active = false, disabled, icon, title, path, ...rest } = props;

  const linkProps = path
    ? {
      component: NextLink,
      href: path
    }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          '&:hover': {
            bgcolor: 'background.default',
          },
          ...(!disabled && active && {
            backgroundColor: 'primary.main',
            '&:hover': {},
          }),
        }}
        disabled={disabled}
        {...linkProps}
        {...rest}
      >
        <Box
          component="span"
          sx={{
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
            ...(disabled && {
              color: 'text.disabled'
            })
          }}
        >
          {title}
        </Box>
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
