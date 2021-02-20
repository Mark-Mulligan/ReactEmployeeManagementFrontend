import React from "react";
import axios from "axios";
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
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 150,
  },
];

class AllEmployeesPage extends React.Component {
  state = { employees: [] };

  getEmployees = async () => {
    const { data } = await axios.get("http://localhost:3001/employees");
    this.setState({ employees: data });
  };

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Employees</h2>
        <div className="table-container">
          <DataGrid
            rowHeight={30}
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
