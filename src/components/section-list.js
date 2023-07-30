import { TreeView } from '@mui/lab';
import * as React from 'react';

const SectionList = ({ children, ...props }) => (
  <TreeView sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'white', p: 0, mt: 5, borderRadius: 2, }} {...props}>
    {children}
  </TreeView>
);

export default SectionList;
