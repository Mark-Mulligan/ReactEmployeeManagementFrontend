import React from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

class RoleForm extends React.Component {
  state = {
    title: "",
    salary: "",
    departmentId: "",
    departmentValues: [],
  };

  componentDidMount() {
    this.getDepartmentValues();
    if (this.props.roleId) {
      this.getRoleInfo(this.props.roleId);
    }
  }

  getDepartmentValues = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/departments/name-id"
    );
    this.setState({ departmentValues: data });
  };

  getRoleInfo = (id) => {
    axios.get(`http://localhost:3001/role/${id}`).then(
      (response) => {
        if (response.status === 200) {
          const roleData = response.data[0];
          this.setState({
            title: roleData.title,
            salary: roleData.salary,
            departmentId: roleData.department_id,
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/role/${this.props.roleId}`).then(
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
      <form
        onSubmit={(event) =>
          this.props.handleFormSubmit(
            event,
            this.state.title,
            this.state.salary,
            this.state.departmentId
          )
        }
      >
        <Row>
          <Col md={4} sm={12}>
            <FormControl fullWidth={true}>
              <TextField
                id="roleNameInput"
                label="Title"
                variant="outlined"
                value={this.state.title}
                required={true}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormControl>
          </Col>
          <Col md={4} sm={12}>
            <FormControl fullWidth={true}>
              <TextField
                id="roleSalaryInput"
                label="Salary"
                type="number"
                variant="outlined"
                value={this.state.salary}
                required={true}
                onChange={(e) => this.setState({ salary: e.target.value })}
              />
            </FormControl>
          </Col>
          <Col md={4} sm={12}>
            <FormControl required variant="outlined" fullWidth={true}>
              <InputLabel id="departmentSelectLabel">
                Department
              </InputLabel>
              <Select
                labelId="departmentSelectLabel"
                id="departmentSelect"
                value={this.state.departmentId}
                onChange={(e) =>
                  this.setState({ departmentId: e.target.value })
                }
                label="Department"
              >
                {this.renderMenuItems(
                  this.state.departmentValues,
                  "id",
                  "name"
                )}
              </Select>
            </FormControl>
          </Col>
        </Row>

        <div className="mt-2">
          <Button className="mr-2" variant="secondary" type="submit">
            {this.props.roleId ? "Submit Changes" : "Create Role"}
          </Button>
          {this.props.roleId ? (
            <DeleteModal
              modalMessage="Warning! Deleting this role will also delete all the employees that have this role.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
            />
          ) : null}
          <Button as={Link} to={"/roles"} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

export default RoleForm;
