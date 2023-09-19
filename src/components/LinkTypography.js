import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LinkTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    color: theme.palette.primary.main,
}));
