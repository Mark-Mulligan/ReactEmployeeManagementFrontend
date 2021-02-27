import React from "react";
import api from "../apis/api";
import EmployeeForm from "../components/EmployeeForm";
import ErrorModal from "../components/ErrorModal";

class CreateEmployeePage extends React.Component {
  state = { errorMessage: "" };

  handleCreateFormSubmit = (event, firstName, lastName, roleId, managerId) => {
    event.preventDefault();
    api
      .post("/employees", {
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
            errorMessage: "There was an error updating the role.",
          });
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Create Employee</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <EmployeeForm
            handleFormSubmit={this.handleCreateFormSubmit}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default CreateEmployeePage;
