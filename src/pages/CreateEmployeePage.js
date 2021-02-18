import React from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";

class CreateEmployeePage extends React.Component {

  handleCreateFormSubmit = (event, firstName, lastName, roleId, managerId) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/employees", {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/");
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
        <h2 className="text-center mb-3">Create Employee</h2>
        <EmployeeForm
          handleFormSubmit={this.handleCreateFormSubmit}
        />
      </div>
    );
  }
}

export default CreateEmployeePage;
