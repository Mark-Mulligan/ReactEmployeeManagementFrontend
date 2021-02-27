import React from "react";
import api from "../apis/api";
import ErrorModal from "../components/ErrorModal";
import RoleForm from "../components/RoleForm";

class CreateRolePage extends React.Component {
  state = { errorMessage: "" };

  handleFormSubmit = (e, title, salary, departmentId) => {
    e.preventDefault();
    api
      .post("/roles", {
        title: title,
        salary: salary,
        departmentId: departmentId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/roles");
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
        <h2 className="text-center mb-4">Create Role</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <RoleForm handleFormSubmit={this.handleFormSubmit} />
        )}
      </div>
    );
  }
}

export default CreateRolePage;
