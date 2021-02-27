import React from "react";
import api from "../apis/api";
import { DataGrid } from "@material-ui/data-grid";
import ErrorModal from "../components/ErrorModal";
import "./DepartmentsPage.css";

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "name", headerName: "Name", width: 160 },
  {
    field: "employees",
    headerName: "Total Employees",
    width: 160,
    type: "number",
  },
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
    valueFormatter: ({ value }) => {
      if (value) {
        return `$${value.toLocaleString()}`;
      } else {
        return `$0`;
      }
    },
  },
];

class DepartmentsPage extends React.Component {
  state = { departments: [], errorMessage: "" };

  getDepartments = () => {
    api
      .get('/departments')
      .then(({ data }) => {
        this.setState({ departments: data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage:
              "There was an error connecting to the server. Please reload the page.",
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
    this.getDepartments();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Departments</h2>
        <div className="departments-table-container">
          {this.state.errorMessage ? (
            <ErrorModal modalMessage={this.state.errorMessage} />
          ) : (
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
          )}
        </div>
      </div>
    );
  }
}

export default DepartmentsPage;
