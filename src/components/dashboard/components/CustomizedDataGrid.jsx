import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../internals/data/gridData";

export default function CustomizedDataGrid({ logs }) {
  const rows = logs.map((log) => ({
    id: log.logid, // Use logid as id
    logType: log.logtype, // Ensure property names match the column definitions
    timestamp: new Date(log.timestamp).toLocaleString(), // Convert timestamp to readable format
    userId: log.userid || "Unknown", // Use 'Unknown' if no userId
    description: log.description,
  }));

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
