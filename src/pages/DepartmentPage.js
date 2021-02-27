import React from "react";
import api from "../apis/api";
import VerticalTable from "../components/VerticalTable";
import EditDeleteGroup from "../components/EditDeleteGroup";
import ErrorModal from "../components/ErrorModal";

const headerAndKeys = [
  { header: "Name:", key: "name" },
  { header: "Department Id:", key: "id" },
  { header: "Employees:", key: "employees", type: "number" },
  { header: "Roles:", key: "roles", type: "number" },
  { header: "Total Utilization:", key: "departmentUtilization", type: "money" },
];

class DepartmentPage extends React.Component {
  state = {
    department: null,
    departmentId: this.props.match.params.id,
    errorMessage: "",
  };

  getDepartment = () => {
    api
      .get(`/department/${this.state.departmentId}`)
      .then(({ data }) => {
        this.setState({ department: data[0] });
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
    api.delete(`/department/${this.state.departmentId}`).then(
      (response) => {
        if (response.status === 200) {
          this.props.history.push("/departments");
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "There was an error deleteing the department.",
        });
      }
    );
  };

  componentDidMount() {
    this.getDepartment();
  }

  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <h2 className="text-center">Department Profile</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <div>
            <VerticalTable
              headersAndKeys={headerAndKeys}
              tableData={this.state.department}
            />
            <EditDeleteGroup
              modalMessage="Warning! Deleting this Department will also delete all the roles and employees in this department.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
              linkTo={`${this.state.departmentId}/edit`}
            />
          </div>
        )}
      </div>
    );
  }
}

export default DepartmentPage;
