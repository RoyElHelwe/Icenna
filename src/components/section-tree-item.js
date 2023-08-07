import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TreeItem as MuiTreeItem } from '@mui/lab';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Translations from './Translations';
import RtlSvgIcon from './rtl-svgicon';

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

const SectionTreeItem = ({ id, title, code, children, ...props }) => {
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
          <RtlSvgIcon
            sx={{ mr: 2, width: 30, height: 30, }}
            color="primary">
            {selected ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </RtlSvgIcon>
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

SectionTreeItem.propTypes = {
  code: PropTypes.object,
};
