import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main,
}));