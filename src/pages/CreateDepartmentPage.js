import React from "react";
import api from "../apis/api";
import ErrorModal from "../components/ErrorModal";
import DepartmentForm from "../components/DepartmentForm";

class CreateDepartmentPage extends React.Component {
  state = { errorMessage: "" };

  handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    api
      .post("/departments", {
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
            errorMessage: "There was an error updating the role.",
          });
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Create Department</h2>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <DepartmentForm handleFormSubmit={this.handleFormSubmit} />
        )}
      </div>
    );
  }
}

export default CreateDepartmentPage;
