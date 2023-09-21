import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const PageSizes = [25, 50, 100];

const DataTable = ({ ...props }) => {

  return (
    <Box>
      <DataGrid
        sx={{
          bgcolor: 'background.paper',
          height: '80vh',
          // disable cell selection style
          '.MuiDataGrid-cell:focus': { outline: 'none', },
          // pointer cursor on ALL rows
          '& .MuiDataGrid-row:hover': { cursor: 'pointer', },
        }}
        pageSizes={PageSizes}
        paginationMode="server"
        {...props}
      />
    </Box>
  );
};

export default DataTable;
