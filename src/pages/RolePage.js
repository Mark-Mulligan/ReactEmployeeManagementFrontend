import React from "react";
import api from "../apis/api";
import VerticalTable from "../components/VerticalTable";
import EditDeleteGroup from "../components/EditDeleteGroup";
import ErrorModal from "../components/ErrorModal";

const headerAndKeys = [
  { header: "Title:", key: "title" },
  { header: "Department:", key: "name" },
  { header: "Role Id:", key: "id" },
  { header: "Employees:", key: "employees" },
  { header: "Salary:", key: "salary" },
  { header: "Total Utilization:", key: "roleUtilization" },
];

class RolePage extends React.Component {
  state = { role: null, roleId: this.props.match.params.id, errorMessage: "" };

  getRole = () => {
    api
      .get(`/role/${this.state.roleId}`)
      .then((response) => {
        this.setState({ role: response.data[0] });
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

  handleDeleteClick = () => {
    api.delete(`/role/${this.state.roleId}`).then(
      (response) => {
        if (response.status === 200) {
          this.props.history.push("/roles");
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "There was an error deleteing the role.",
        });
      }
    );
  };

  componentDidMount() {
    this.getRole();
  }

  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <h2 className="text-center">Role Profile</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <div>
            <VerticalTable
              headersAndKeys={headerAndKeys}
              tableData={this.state.role}
            />
            <EditDeleteGroup
              modalMessage="Warning! Deleting this role will also delete all the employees that have this role.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
              linkTo={`${this.state.roleId}/edit`}
            />
          </div>
        )}
      </div>
    );
  }
}

export default RolePage;
