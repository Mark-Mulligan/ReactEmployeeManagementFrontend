import React from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import CustomFormInput from "../components/CustomFormInput";
import CustomFormSelect from "../components/CustomFormSelect";

class CreateRolePage extends React.Component {
  state = {
    title: "",
    departmentId: "",
    salary: "",
    departmentValues: [],
  };

  checkFormInputs() {
    const { title, departmentId, salary } = this.state;
    return title && departmentId && salary ? false : true;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log("form submitted");
    axios.post("http://localhost:3001/roles", {
        title: this.state.title,
        salary: this.state.salary,
        departmentId: this.state.departmentId,
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

  getDepartmentValues = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/departments/name-id"
    );
    this.setState({ departmentValues: data });
  };

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

  componentDidMount() {
    this.getDepartmentValues();
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Create Role</h2>
        <Form onSubmit={this.handleFormSubmit}>
          <Row>
            <Col md={4} sm={12}>
              <CustomFormInput
                controlId="roleTitleInput"
                label="Title"
                type="text"
                placeholder="Role title"
                onInputChange={(e) => this.setState({ title: e.target.value })}
                value={this.state.title}
              />
            </Col>
            <Col md={4} sm={12}>
              <CustomFormInput
                controlId="roleSalaryInput"
                label="Salary"
                type="number"
                placeholder="50000 (nums only)"
                onInputChange={(e) => this.setState({ salary: e.target.value })}
                value={this.state.salary}
              />
            </Col>
            <Col md={4} sm={12}>
              <CustomFormSelect
                controlId="departmentId"
                label="Department"
                type="select"
                value={this.state.departmentId}
                onSelectChange={(e) =>
                  this.setState({ departmentId: e.target.value })
                }
                placeholder="Select Department"
                options={this.renderOptions(
                  this.state.departmentValues,
                  "id",
                  "name"
                )}
              />
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

export default CreateRolePage;
