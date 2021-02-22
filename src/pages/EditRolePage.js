import React from "react";
import axios from "axios";
import { TextField, FormControl } from "@material-ui/core";
import { Button, Row, Col } from "react-bootstrap";
import DeleteModal from "../components/DeleteModal";

class EditRolePage extends React.Component {
  state = {
    title: "",
    salary: "",
    departmentId: "",
    roleId: this.props.match.params.id,
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Edit Role</h2>
        <form>
          <Row>
            <Col>
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
            <Col>
              <FormControl fullWidth={true}>
                <TextField
                  id="roleSalaryInput"
                  label="Salary"
                  variant="outlined"
                  value={this.state.salary}
                  required={true}
                  onChange={(e) => this.setState({ salary: e.target.value })}
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl fullWidth={true}>
                <TextField
                  id="departmentIdInput"
                  label="Department"
                  variant="outlined"
                  value={this.state.departmentId}
                  required={true}
                  onChange={(e) => this.setState({ departmentId: e.target.value })}
                />
              </FormControl>
            </Col>
          </Row>

          <div className="mt-2">
            <Button className="mr-2" variant="secondary" type="submit">
              Submit
            </Button>
            <DeleteModal
              modalMessage="Warning! Deleting this department will also delete all the roles and employees in the department.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditRolePage;
