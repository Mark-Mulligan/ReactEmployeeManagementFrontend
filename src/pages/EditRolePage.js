import React from "react";
import api from "../apis/api";
import RoleForm from "../components/RoleForm";
import ErrorModal from "../components/ErrorModal";

class EditRolePage extends React.Component {
  state = { roleId: this.props.match.params.id, errorMessage: "" };

  handleFormSubmit = (event, title, salary, departmentId) => {
    event.preventDefault();
    api
      .put(`/role/${this.state.roleId}`, {
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
        <h2 className="text-center mb-4">Edit Role</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <RoleForm
            handleFormSubmit={this.handleFormSubmit}
            roleId={this.state.roleId}
          />
        )}
      </div>
    );
  }
}

export default EditRolePage;
