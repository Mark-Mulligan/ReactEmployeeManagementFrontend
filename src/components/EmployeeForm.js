import React from "react";
import axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

class EmployeeForm extends React.Component {
  state = {
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
    return !managerId ? "0" : managerId;
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
    const excludeEmployee = this.props.employeeId
      ? `?excludeid=${this.props.employeeId}`
      : "";
    const { data } = await axios.get(
      `http://localhost:3001/employees/name-id${excludeEmployee}`
    );
    this.setState({ managerValues: data });
  };

  handleDepartmentSelect = (event) => {
    const departmentId = event.target.value;
    this.getRolesValues(departmentId);
    this.setState({ departmentId: departmentId });
    this.setState({ roleId: "" });
  };

  handleDeleteClick = () => {
    axios
      .delete(`http://localhost:3001/employee/${this.props.employeeId}`)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/employees");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  componentDidMount() {
    if (this.props.employeeId) {
      this.getEmployeeInfo(this.props.employeeId);
      this.getDepartmentValues();
    } else {
      this.getDepartmentValues();
      this.getManagerValues();
    }
  }

  renderRolePlacholder() {
    return this.state.departmentId ? "Choose" : "Must select department";
  }

  renderMenuItems(dataArr, key1, key2) {
    if (dataArr.length > 0) {
      return dataArr.map((data) => {
        return (
          <MenuItem key={data[key1]} value={data[key1]}>
            {data[key2]}
          </MenuItem>
        );
      });
    }
  }

  render() {
    return (
      <Form
        onSubmit={(event) =>
          this.props.handleFormSubmit(
            event,
            this.state.firstName,
            this.state.lastName,
            this.state.roleId,
            this.state.managerId
          )
        }
      >
        <Row>
          <Col className="mb-4" xs={12} sm={6}>
            <FormControl fullWidth={true}>
              <TextField
                id="firstNameInput"
                label="First Name"
                variant="outlined"
                value={this.state.firstName}
                required={true}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </FormControl>
          </Col>
          <Col className="mb-4" xs={12} sm={6}>
            <FormControl fullWidth={true}>
              <TextField
                id="lastNameInput"
                label="Last Name"
                variant="outlined"
                value={this.state.lastName}
                required={true}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col className="mb-4" sm={12} md={4}>
            {this.state.departmentValues.length > 0 && (
              <FormControl required variant="outlined" fullWidth={true}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Department
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="departmentSelectLabel"
                  id="departmentSelect"
                  value={this.state.departmentId}
                  onChange={this.handleDepartmentSelect}
                  label="Department"
                >
                  {this.renderMenuItems(
                    this.state.departmentValues,
                    "id",
                    "name"
                  )}
                </Select>
              </FormControl>
            )}
          </Col>
          <Col sm={12} md={4} className="mb-4">
            {this.state.roleValues.length > 0 && (
              <FormControl required variant="outlined" fullWidth={true}>
                <InputLabel id="roleSelectLabel">Role</InputLabel>
                <Select
                  defaultValue=""
                  labelId="roleSelectLabel"
                  id="roleSelect"
                  value={this.state.roleId}
                  onChange={(e) => this.setState({ roleId: e.target.value })}
                  label="Role"
                >
                  {this.renderMenuItems(this.state.roleValues, "id", "title")}
                </Select>
              </FormControl>
            )}
          </Col>

          <Col sm={12} md={4} className="mb-4">
            {this.state.managerValues.length > 0 && this.state.departmentId && (
              <FormControl required variant="outlined" fullWidth={true}>
                <InputLabel id="managerSelectLabel">Manager</InputLabel>
                <Select
                  defaultValue=""
                  labelId="managerSelectLabel"
                  id="managerSelect"
                  value={this.state.managerId}
                  onChange={(e) => this.setState({ managerId: e.target.value })}
                  label="Manager"
                >
                  <MenuItem value={0}>No Manager</MenuItem>
                  {this.renderMenuItems(
                    this.state.managerValues,
                    "id",
                    "manager"
                  )}
                </Select>
              </FormControl>
            )}
          </Col>
        </Row>

        <div className="">
          <Button className="mr-3 mb-3" variant="light" type="submit">
            {this.props.employeeId ? "Submit Changes" : "Create Employee"}
          </Button>
          {this.props.employeeId ? (
            <DeleteModal
              modalMessage="Are you sure you want to delete this employee?"
              handleDeleteClick={this.handleDeleteClick}
            />
          ) : null}
          <Button className="mb-3" as={Link} to={"/employees"} variant="outline-light">
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

export default EmployeeForm;
