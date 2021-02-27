import React from "react";
import api from "../apis/api";
import EmployeeForm from "../components/EmployeeForm";
import ErrorModal from "../components/ErrorModal";

class EditEmployeePage extends React.Component {
  state = { employeeId: this.props.match.params.id, errorMessage: "" };

  handleEditFormSubmit = (event, firstName, lastName, roleId, managerId) => {
    event.preventDefault();
    api
      .put(`/employee/${this.state.employeeId}`, {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/employees");
          }
        },
        (error) => {
          console.log(error);
          this.setState({
            errorMessage: "There was an error updating the employee.",
          });
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Edit Employee</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <EmployeeForm
            employeeId={this.state.employeeId}
            handleFormSubmit={this.handleEditFormSubmit}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default EditEmployeePage;
