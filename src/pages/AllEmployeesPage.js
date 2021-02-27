import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import api from "../apis/api";
import ErrorModal from "../components/ErrorModal";

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
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 150,
    valueFormatter: ({ value }) => (!value ? "N/A" : value),
  },
];

class AllEmployeesPage extends React.Component {
  state = { employees: [], errorMessage: "" };

  getEmployees = () => {
    api
      .get("/employees")
      .then((response) => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage: "There was an error connecting to the server.",
          });
        } else {
          console.log("Error", error.message);
          this.setState({
            errorMessage: "There was an error loading the page.",
          });
        }
        console.log(error.config);
      });
  };

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Employees</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
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
        )}
      </div>
    );
  }
}

export default AllEmployeesPage;
