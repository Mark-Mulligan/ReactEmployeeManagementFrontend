import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./EmployeePage.css";

class EmployeePage extends React.Component {
  state = { employee: null, employeeId: this.props.match.params.id };

  getEmployee = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/employee/${this.state.employeeId}`
    );
    this.setState({ employee: data[0] });
  };

  handleDeleteClick = () => {
    axios
      .delete(`http://localhost:3001/employee/${this.state.employeeId}`)
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
  };

  componentDidMount() {
    this.getEmployee();
  }

  renderEmployeeProfileData(colTitlesArr, colDataArr) {
    return colTitlesArr.map((title, index) => {
      return (
        <tr key={index}>
          <th className="text-right">{title}</th>
          <td>{colDataArr[index]}</td>
        </tr>
      );
    });
  }

  renderEmployeeProfileTable(employee) {
    return (
      <table className="table table-responsive single-table">
        <tbody className="table-bordered">
          {this.renderEmployeeProfileData(
            ["Name:", "Employee Id:", "Title", "Department:", "Salary:"],
            [
              `${employee.first_name} ${employee.last_name}`,
              employee.id,
              employee.title,
              employee.department,
              employee.salary,
            ]
          )}
        </tbody>
      </table>
    );
  }

  renderEmployee() {
    if (this.state.employee === null) {
      return null;
    }
    return (
      <div className="container mt-5 text-center">
        <h2>Employee Profile</h2>
        {this.renderEmployeeProfileTable(this.state.employee)}
        <div>
          <Button
            as={Link}
            to={`${this.state.employeeId}/edit`}
            className="mr-4"
            variant="secondary"
          >
            Edit
          </Button>
          <Button onClick={this.handleDeleteClick} variant="secondary">Delete</Button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderEmployee();
  }
}

export default EmployeePage;
