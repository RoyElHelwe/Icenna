import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TreeItem as MuiTreeItem } from '@mui/lab';
import { Box, SvgIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import Translations from './Translations';

const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  '& .MuiTreeItem-content, &.MuiTreeItem-label, &.MuiTreeItem-group': {
    '&.Mui-expanded, &.Mui-selected, &.Mui-focused, &.Mui-disabled, &.Mui-selected.Mui-focused': {
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const SectionTreeItem = ({ id, title, children, ...props }) => {
  const { settings: { direction } } = useSettings();
  const [selected, setSelected] = useState(false);

  return (
    <TreeItem
      nodeId={id}
      label={
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          pt: 2, pb: 2,
          radius: 5,
        }}>
          <SvgIcon
            sx={{ mx: 2, width: 30, height: 30, direction }}
            color="primary"
          >
            {selected ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </SvgIcon>
          <Box sx={{ flexGrow: 1, }}>
            {typeof title === 'string' ? (
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <Translations text={title} />
              </Typography>
            ) : (<>{title}</>)}

          </Box>
        </Box>
      }
      sx={{
        borderBottom: 1,
        borderColor: 'lightgray',
        bgcolor: 'background.paper'
      }}
      onClick={(e) => setSelected(!selected)}
      {...props}
    >
      <Box sx={{ pb: 6, px: 6, }}>
        {children}
      </Box>
    </TreeItem>
  );
};

export default SectionTreeItem;
