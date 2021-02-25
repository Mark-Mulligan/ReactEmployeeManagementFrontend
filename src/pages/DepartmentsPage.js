import React from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import './DepartmentsPage.css';

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "name", headerName: "Name", width: 160 },
  { field: "employees", headerName: "Total Employees", width: 160, type: "number" },
  {
    field: "roles",
    headerName: "Total Roles",
    width: 130,
    type: "number",
  },
  {
    field: "departmentUtilization",
    headerName: "Total Utilization",
    width: 160,
    type: "number",
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`
  },
];

class DepartmentsPage extends React.Component {
  state = { departments: [] };

  getDepartments = async () => {
    const { data } = await axios.get("http://localhost:3001/departments");
    console.log(data);
    this.setState({ departments: data });
  };

  componentDidMount() {
    this.getDepartments();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Departments</h2>
        <div className="departments-table-container">
          <DataGrid
            autoHeight={true}
            scrollbarSize={20}
            rowHeight={30}
            rows={this.state.departments}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              this.props.history.push(`/department/${data.row.id}`);
            }}
          />
        </div>
      </div>
    );
  }
}

export default DepartmentsPage;
