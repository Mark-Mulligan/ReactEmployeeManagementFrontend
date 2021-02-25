import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable(props) {

  return ( 
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight={true}
        rowHeight={30}
        rows={props.rows}
        columns={props.columns}
        disableSelectionOnClick={true}
      />
    </div>
  );
}
