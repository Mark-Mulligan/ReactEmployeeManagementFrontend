import React from "react";
import axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import CustomFormInput from "../components/CustomFormInput";
import CustomFormSelect from "../components/CustomFormSelect";

class EditEmployeePage extends React.Component {
  state = {
    employeeId: this.props.match.params.id,
    firstName: "",
    lastName: "",
    departmentId: "",
    roleId: "",
    managerId: "",
    departmentValues: [],
    roleValues: [],
    managerValues: [],
  };

  getEmployeeInfo = (id) => {
    axios.get(`http://localhost:3001/employee/${id}`).then(
      (response) => {
        if (response.status === 200) {
          const employeeData = response.data[0];
          this.setState({
            firstName: employeeData.first_name,
            lastName: employeeData.last_name,
            departmentId: employeeData.department_id,
            roleId: employeeData.role_id,
            managerId: this.convertManagerId(employeeData.manager_id),
          });
          this.getManagerValues();
          this.getRolesValues(employeeData.department_id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  convertManagerId(managerId) {
    return (!managerId) ? 0 : managerId;
  }

  checkFormInputs() {
    const { firstName, lastName, departmentId, roleId, managerId } = this.state;
    return firstName !== "" &&
      lastName !== "" &&
      departmentId &&
      roleId &&
      managerId
      ? false
      : true;
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
      `http://localhost:3001/employees/name-id?excludeid=${this.state.employeeId}`
    );
    this.setState({ managerValues: data });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/employee/${this.state.employeeId}`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        roleId: this.state.roleId,
        managerId: this.state.managerId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(this.state);
    console.log("form submitted");
  };

  handleDepartmentSelect = (event) => {
    const departmentId = event.target.value;
    this.getRolesValues(departmentId);
    this.setState({ departmentId: departmentId });
    this.setState({ roleId: "" });
  };

  handleRoleSelect = (e) => {
    this.setState({ roleId: e.target.value });
  };
  handleManagerSelect = (e) => {
    this.setState({ managerId: e.target.value });
  };

  componentDidMount() {
    this.getEmployeeInfo(this.state.employeeId);
    this.getDepartmentValues();
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
        <h2 className="text-center mb-3">Edit Employee</h2>

        <Form onSubmit={this.handleFormSubmit}>
          <Row>
            <Col xs={12} sm={6}>
              <CustomFormInput
                controlId="firstNameInput"
                label="First Name"
                type="text"
                placeholder={null}
                onInputChange={(e) =>
                  this.setState({ firstName: e.target.value })
                }
                value={this.state.firstName}
              />
            </Col>
            <Col xs={12} sm={6}>
              <CustomFormInput
                controlId="lastNameInput"
                label="Last Name"
                type="text"
                placeholder={null}
                onInputChange={(e) => {
                  this.setState({ lastName: e.target.value });
                }}
                value={this.state.lastName}
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
                value={this.state.departmentId}
                placeholder={null}
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
                value={this.state.roleId}
                placeholder={null}
                options={this.renderOptions(
                  this.state.roleValues,
                  "id",
                  "title"
                )}
              />
            </Col>

            <Col sm={12} md={4}>
              <Form.Group controlId="managerSelect">
                <Form.Label>Manager</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleManagerSelect}
                  value={this.state.managerId}
                >
                  <option value={0}>No Manager</option>
                  {this.renderOptions(this.state.managerValues, "id", "manager")}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

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

export default EditEmployeePage;
