import React from 'react';
import axios from 'axios';
import RoleForm from '../components/RoleForm';

class CreateRolePage extends React.Component {
  handleFormSubmit = (e, title, salary, departmentId) => {
    e.preventDefault();
    axios.post("http://localhost:3001/roles", {
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
        }
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Create Role</h2>
        <RoleForm 
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    )
  }
}

export default CreateRolePage;