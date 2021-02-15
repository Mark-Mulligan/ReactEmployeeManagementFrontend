import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import CustomFormInput from "../components/CustomFormInput";

class CreateDepartmentPage extends React.Component {
  state = { departmentName: "" };

  checkFormInputs() {
    const { departmentName } = this.state;
    return (departmentName) ? false : true;
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log("form submitted");
    axios.post('http://localhost:3001/departments', {
      departmentName: this.state.departmentName,
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
        <Form onSubmit={this.handleFormSubmit}>
          <CustomFormInput
            controlId="departmentNameInput"
            label="Name"
            type="text"
            placeholder="Department name"
            onInputChange={(e) => this.setState({ departmentName: e.target.value })}
            value={this.departmentName}
          />

          <Button
            disabled={this.checkFormInputs()}
            variant="secondary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateDepartmentPage;
