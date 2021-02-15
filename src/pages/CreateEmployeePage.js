import React from "react";
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import CustomFormInput from '../components/CustomFormInput';

class CreateEmployeePage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    departmentId: null,
    roleId: null,
    managerId: null,
    departmentValues: [],
    roleValues: [],
    managerValues: [],
  };

  getDepartmentValues = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/departments/name-id"
    );
    this.setState({ departmentValues: data });
  };

  getRolesValues = async (departmentId) => {
    const { data } = await axios.get(
      `http://localhost:3001/departments/${departmentId}/roles`
    );
    this.setState({ roleValues: data });
  };

  getManagerValues = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/employees/name-id/exclude-id/1"
    );
    this.setState({ managerValues: data });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log("form submitted");
  };

  handleDepartmentSelect = (event) => {
    const departmentId = event.target.value;
    this.getRolesValues(departmentId);
    this.setState({ departmentId: departmentId });
  };

  componentDidMount() {
    this.getDepartmentValues();
    this.getManagerValues();
  }

  renderOptions(dataArr, key1, key2) {
    if (dataArr.length > 0) {
      return dataArr.map((data) => {
        return (
          <option key={data[key1]} value={data[key1]}>
            {data[key2]}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Row>
            <Col xs={12} sm={6}>
                <CustomFormInput
                  controlId="firstNameInput" 
                  label="First Name" 
                  type="text"
                  placeholder="First"
                  onInputChange={(event) => this.setState({ firstName: event.target.value })}
                  value={this.firstName}  
                  />
            </Col>
            <Col xs={12} sm={6}>
              <CustomFormInput 
                controlId="lastNameInput"
                label="Last Name"
                type="text"
                placeholder="Last"
                onInputChange={event => this.setState({ lastName: event.target.value })}
                value={this.lastName}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col sm={12} md={4}>
              <Form.Group controlId="departmentSelect">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleDepartmentSelect}
                  value={this.departmentId}
                >
                  <option hidden>Choose</option>
                  {this.renderOptions(
                    this.state.departmentValues,
                    "id",
                    "name"
                  )}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col sm={12} md={4}>
              <Form.Group controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ roleId: event.target.value })
                  }
                  value={this.roleId}
                >
                  {this.state.departmentId ? (
                    <option hidden>Choose</option>
                  ) : (
                    <option hidden>Must select department</option>
                  )}
                  {this.renderOptions(this.state.roleValues, "id", "title")}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col sm={12} md={4}>
              <Form.Group controlId="formGridZip">
                <Form.Label>Manager</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ managerId: event.target.value })
                  }
                  value={this.managerId}
                >
                  <option hidden>Choose</option>
                  {this.renderOptions(
                    this.state.managerValues,
                    "id",
                    "manager"
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateEmployeePage;
