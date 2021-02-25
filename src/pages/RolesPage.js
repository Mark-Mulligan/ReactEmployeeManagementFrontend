import React from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import ErrorModal from "../components/ErrorModal";
import "./RolesPage.css";

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 160 },
  { field: "salary", headerName: "Salary", width: 130, type: "number" },
  {
    field: "department",
    headerName: "Department",
    width: 160,
  },
];

class RolesPage extends React.Component {
  state = { roles: [], errorMessage: "" };

  getRoles = () => {
    axios
      .get("http://localhost:3001/roles")
      .then((response) => {
        console.log(response);
        this.setState({ roles: response.data});
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage:
              "There was an error connecting to the server. Please reload the page.",
          });
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  componentDidMount() {
    this.getRoles();
  }

  render() {
    return (
      <div className="mt-5">
        <h2 className="text-center">Roles</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <div className="roles-table-container">
            <DataGrid
              style={{ color: "rgba(189,189,189,255" }}
              autoHeight={true}
              rowHeight={30}
              rows={this.state.roles}
              columns={columns}
              disableSelectionOnClick={true}
              onRowClick={(data) => {
                this.props.history.push(`/role/${data.row.id}`);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default RolesPage;
