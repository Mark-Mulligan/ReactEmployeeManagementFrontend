import React from "react";
import api from "../apis/api";
import DepartmentForm from "../components/DepartmentForm";
import ErrorModal from "../components/ErrorModal";

class EditDepartmentPage extends React.Component {
  state = { departmentId: this.props.match.params.id, errorMessage: "" };

  handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    api
      .put(`/department/${this.state.departmentId}`, {
        departmentName: departmentName,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/departments");
          }
        },
        (error) => {
          console.log(error);
          this.setState({
            errorMessage: "There was an error updating the department.",
          });
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Edit Department</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <DepartmentForm
            handleFormSubmit={this.handleFormSubmit}
            departmentId={this.state.departmentId}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default EditDepartmentPage;
