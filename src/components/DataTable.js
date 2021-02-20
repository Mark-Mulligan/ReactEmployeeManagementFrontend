import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable(props) {
  const handleRowClick = () => {
    console.log("row clicked");
  };

  return ( 
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight={true}
        rowHeight={30}
        rows={props.rows}
        columns={props.columns}
        onRowClick={handleRowClick}
        disableSelectionOnClick={true}
      />
    </div>
  );
}
