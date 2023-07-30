import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'src/hooks/use-translation';
import { useSettings } from '../hooks/useSettings';

const TextField = styled(MuiTextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  }
}));

const SearchBar = (props) => {
  const { onChange, ...rest } = props;
  const { settings } = useSettings();

  return (
    <TextField
      placeholder={useTranslation('Search')}
      onChange={onChange}
      size='small'
      InputProps={{
        startAdornment: (
          <InputAdornment
            position='start'>
            <SearchIcon sx={{
              transform: settings.direction === 'rtl' ? "scaleX(-1)" : undefined,
            }} />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func,
};

export default SearchBar;