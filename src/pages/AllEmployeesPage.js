import React from "react";
import api from '../apis/api';
import { DataGrid } from "@material-ui/data-grid";
import "./AllEmployeesPage.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First" },
  { field: "last_name", headerName: "Last" },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 150,
    valueFormatter: ({ value }) => !value ? 'N/A' : value
  },
];

class AllEmployeesPage extends React.Component {
  state = { employees: [] };

  getEmployees = async () => {
    const { data } = await api.get('/employees');
    this.setState({ employees: data });
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Employees</h2>
        <div className="employee-table-container">
          <DataGrid
            autoHeight={true}
            rowHeight={30}
            scrollbarSize={20}
            rows={this.state.employees}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              this.props.history.push(`/employee/${data.row.id}`);
            }}
          />
        </div>
      </div>
    );
  }
}

export default AllEmployeesPage;
