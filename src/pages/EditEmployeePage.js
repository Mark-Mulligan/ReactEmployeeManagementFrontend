import React from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";

class EditEmployeePage extends React.Component {
  state = { employeeId: this.props.match.params.id };

  handleEditFormSubmit = (event, firstName, lastName, roleId, managerId) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/employee/${this.state.employeeId}`, {
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
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Edit Employee</h2>
        <EmployeeForm
          employeeId={this.state.employeeId}
          handleFormSubmit={this.handleEditFormSubmit}
        />
      </div>
    );
  }
}

export default EditEmployeePage;
