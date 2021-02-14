import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from 'axios';


class CreateEmployeePage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    departmentId: null,
    roleId: null,
    managerId: null,
    departmentValues: [],
    roleValues: [],
    managerValues: []
  }

  getDepartmentValues = async () => {
    const { data } = await axios.get("http://localhost:3001/departments/name-id");
    this.setState({ departmentValues: data });
  };

  getRolesValues = async () => {
    const { data } = await axios.get("http://localhost:3001/roles/name-id");
    this.setState({ roleValues: data });
  }

  getManagerValues = async () => {
    const { data } = await axios.get("http://localhost:3001/employees/name-id/exclude-id/1");
    this.setState({ managerValues: data });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log('form submitted');
  }

  componentDidMount() {
    this.getDepartmentValues();
    this.getRolesValues();
    this.getManagerValues();
  }

  renderDepartmentOptions() {
    if (this.state.departmentValues.length > 0) {
      return this.state.departmentValues.map(department => {
        return <option key={department.id} value={department.id}>{department.name}</option>
      })
    }
  }

  renderOptions(dataArr, key1, key2) {
    if (dataArr.length > 0) {
      return dataArr.map(data => {
        return <option key={data[key1]} value={data[key1]}>{data[key2]}</option>
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="First" 
                onChange={(event) => this.setState({firstName: event.target.value})}
                value={this.firstName}
                />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Last" 
                onChange={(event) => this.setState({lastName: event.target.value})}
                value={this.lastName}
                />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                as="select" 
                onChange={(event) => this.setState({departmentId: event.target.value})}
                value={this.departmentId}
                >
                <option value={null}>Choose</option>
                {this.renderOptions(this.state.departmentValues, 'id', 'name')}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Role</Form.Label>
              <Form.Control 
                as="select"
                onChange={(event) => this.setState({roleId: event.target.value})}
                value={this.roleId}
                >
                <option value={null}>Choose...</option>
                {this.renderOptions(this.state.roleValues, 'id', 'title')}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Manager</Form.Label>
              <Form.Control 
                as="select" 
                onChange={(event) => this.setState({managerId: event.target.value})}
                value={this.managerId}
                >
                <option>Choose...</option>
                {this.renderOptions(this.state.managerValues, 'id', 'manager')}
              </Form.Control>
            </Form.Group>
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
