import React from "react";
import axios from "axios";
import DepartmentForm from '../components/DepartmentForm';

class EditDepartmentPage extends React.Component {
  state = { departmentId: this.props.match.params.id };

  handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/department/${this.state.departmentId}`, {
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
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Edit Department</h2>
        <DepartmentForm 
          handleFormSubmit={this.handleFormSubmit}
          departmentId={this.state.departmentId}
          history={this.props.history}
        />
      </div>
    )
  }
}

export default EditDepartmentPage;