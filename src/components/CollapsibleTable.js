import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu, MenuItem, TableCell as MuiTableCell, TextField, styled } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const getEditCell = (col, row, val, onRowChange) => {
  const newRow = { ...row };
  const updatedParams = {};

  if (col.type === 'number') {
    return (
      <TextField
        fullWidth
        name={col.field}
        type="number"
        value={val}
        onChange={(e) => {
          lodash.set(newRow, col.field, e.target.value);
          lodash.set(updatedParams, col.field, e.target.value);
          onRowChange?.(newRow, updatedParams);
        }}
      />
    );
  } else if (col.type === 'select') {
    // Add the value to option if not exist
    let options = col.valueOptions;
    if (typeof col.valueOptions === 'function') {
      options = col.valueOptions?.(row);
    }

    const valueInOptions = Boolean(options?.find((o) => o.value === val || o.label == val));
    if (!valueInOptions) {
      options?.push({ label: val, value: val, });
    }

    return (
      <TextField
        fullWidth
        select
        name={col.field}
        value={val}
        onChange={(e) => {
          lodash.set(newRow, col.field, e.target.value);
          lodash.set(updatedParams, col.field, e.target.value);
          onRowChange?.(newRow, updatedParams);
        }}
      >
        {options?.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>
    );
  } else {
    return (
      <TextField
        fullWidth
        name={col.field}
        value={val}
        onChange={(e) => {
          lodash.set(newRow, col.field, e.target.value);
          lodash.set(updatedParams, col.field, e.target.value);
          onRowChange?.(newRow, updatedParams);
        }}
      />
    );
  }
};

const CollapseTable = ({
  columns,
  rows,
  renderRowDetails,
  headProps,
  actions,
  onRowChange,
  renderFooter,
}) => {
  const [openRows, setOpenRows] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', my: 3, }}>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead {...headProps}>
          <TableRow>
            {renderRowDetails && (
              <TableCell
                sx={{ width: 45, p: 1, }}
              >
                <IconButton
                  size="small"
                  onClick={() => setOpenRows((p) => {
                    if (p.length === 0) {
                      return rows.map((r) => r.id);
                    }

                    return [];
                  })}
                >
                  {openRows.length === rows.length ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
                </IconButton>
              </TableCell>
            )}
            {columns.map((c) => (
              <TableCell
                key={c.field}
                align="left"
                sx={{ fontWeight: 'bold', width: c.width || 100, }}
              >
                {c.headerName}
              </TableCell>
            ))}
            {actions && (
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', width: 90, }}
              >
                Actions
              </TableCell>
            )}
            {/* Create a column taking the rest of the space if there isn't any table taking it */}
            {!columns.find((c) => typeof c.width === 'string' && c.width?.includes('%')) && (
              <TableCell sx={{ width: '100%' }} />
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((r) => {
            return (
              <React.Fragment key={r.id}>
                <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                  {renderRowDetails && (
                    <TableCell sx={{ width: 45, p: 1, }}>
                      <IconButton
                        size="small"
                        onClick={() => setOpenRows((prev) => {
                          const rowIndex = prev.indexOf(r.id);

                          if (rowIndex !== -1) {
                            prev.slice(rowIndex, 1);

                            return [
                              ...prev.slice(0, rowIndex),
                              ...prev.slice(rowIndex + 1),
                            ];
                          }

                          return [
                            ...prev,
                            r.id,
                          ];
                        })}
                      >
                        {openRows.includes(r.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                  )}
                  {columns.map((c) => {
                    const cellValue = lodash.get(r, c.field);

                    let isEditable = c.editable;
                    if (typeof c.editable === 'function') {
                      isEditable = c.editable?.(r);
                    }

                    let content = cellValue;
                    let editableCellSx = {};
                    if (c.cellRequired?.(r) === false) {
                      content = 'Not Required';
                    } else if (isEditable) {
                      content = getEditCell(c, r, cellValue, onRowChange);
                      editableCellSx = { padding: 1, };
                    }

                    return (
                      <TableCell key={`${c.field}-${r.id}`} sx={{ width: c.width || 100, ...editableCellSx, }}>
                        {content}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell align="center" sx={{ width: 90, }}>
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        {actions.map((a) => (
                          <MenuItem key={a.name} onClick={() => a.onClick(r)}>
                            {a.name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  )}
                  {/* Create a column taking the rest of the space if there isn't any table taking it */}
                  {!columns.find((c) => typeof c.width === 'string' && c.width?.includes('%')) && (
                    <TableCell sx={{ width: '100%' }} />
                  )}
                </TableRow>

                {renderRowDetails && (
                  <TableRow>
                    <TableCell sx={{ py: 0, }} colSpan={6}>
                      <Collapse in={openRows.includes(r.id)} timeout="auto" unmountOnExit>
                        {renderRowDetails(r)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
      {renderFooter}
    </TableContainer>
  );
}

CollapseTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    editable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    type: PropTypes.oneOf(['string', 'number', 'select']),
    valueOptions: PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
      PropTypes.func,
    ]),
  }).isRequired).isRequired,
  rows: PropTypes.array,
  renderFooter: PropTypes.object,
};

export default CollapseTable;
