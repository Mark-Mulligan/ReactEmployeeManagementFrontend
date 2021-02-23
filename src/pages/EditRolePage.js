import React from 'react';
import axios from 'axios';
import RoleForm from '../components/RoleForm';

class EditEmployeePage extends React.Component {
  state = { roleId: this.props.match.params.id };

  handleFormSubmit = (event, title, salary, departmentId) => {
    console.log(event);
    event.preventDefault();
    axios.put(`http://localhost:3001/role/${this.state.roleId}`, {
        title: title,
        salary: salary,
        departmentId: departmentId
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/roles");
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
        <h2 className="text-center mb-4">Edit Role</h2>
        <RoleForm 
          handleFormSubmit={this.handleFormSubmit}
          roleId={this.state.roleId}
        />
      </div>
    )
  }
}

export default EditEmployeePage;