import React from "react";
import axios from "axios";
import DepartmentForm from '../components/DepartmentForm';

class CreateDepartmentPage extends React.Component {
  state = { departmentName: "" };

  handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    axios.post('http://localhost:3001/departments', {
      departmentName: departmentName,
    }).then((response) => {
      if (response.status === 200) {
        this.props.history.push('/departments')
      }
    }, (error) => {
      console.log(error);
    });
  };
   
  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Create Department</h2>
        <DepartmentForm 
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }
}

export default CreateDepartmentPage;
