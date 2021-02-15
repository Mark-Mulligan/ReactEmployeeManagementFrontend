import React from "react";
import axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import CustomFormInput from "../components/CustomFormInput";
import CustomFormSelect from "../components/CustomFormSelect";

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

  checkFormInputs() {
    const { firstName, lastName, departmentId, roleId, managerId} = this.state;
    return (firstName !== '' && lastName !== '' && departmentId && roleId && managerId) ? false : true;
  }

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
    this.setState({ roleId: null });
  };

  handleRoleSelect = (e) => {
    this.setState({ roleId: e.target.value })
  };
  handleManagerSelect = (e) => {
    this.setState({ managerId: e.target.value })
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
      <div className="container mt-5">
        <h2 className="text-center mb-3">Create Employee</h2>

        <Form onSubmit={this.handleFormSubmit}>
          <Row>
            <Col xs={12} sm={6}>
              <CustomFormInput
                controlId="firstNameInput"
                label="First Name"
                type="text"
                placeholder="First"
                onInputChange={(e) => {
                  this.setState({ firstName: e.target.value })
                }}
                value={this.firstName}
              />
            </Col>
            <Col xs={12} sm={6}>
              <CustomFormInput
                controlId="lastNameInput"
                label="Last Name"
                type="text"
                placeholder="Last"
                onInputChange={(e) => {
                  this.setState({ lastName: e.target.value })
                }}
                value={this.lastName}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={4}>
              <CustomFormSelect
                controlId="departmentSelect"
                label="Department"
                type="select"
                onSelectChange={this.handleDepartmentSelect}
                value={this.departmentId}
                placeholder="Choose"
                options={this.renderOptions(
                  this.state.departmentValues,
                  "id",
                  "name"
                )}
              />
            </Col>

            <Col sm={12} md={4}>
              <CustomFormSelect
                controlId="roleSelect"
                label="Role"
                type="select"
                onSelectChange={this.handleRoleSelect}
                value={this.roleId}
                placeholder={
                  this.state.departmentId ? "Choose" : "Must select department"
                }
                options={this.renderOptions(
                  this.state.roleValues,
                  "id",
                  "title"
                )}
              />
            </Col>

            <Col sm={12} md={4}>
              <CustomFormSelect
                controlId="managerSelect"
                label="Manager"
                type="select"
                onSelectChange={this.handleManagerSelect}
                value={this.managerId}
                placeholder={"Choose"}
                options={this.renderOptions(
                  this.state.managerValues,
                  "id",
                  "manager"
                )}
              />
            </Col>
          </Row>

          <Button disabled={this.checkFormInputs()} variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateEmployeePage;
