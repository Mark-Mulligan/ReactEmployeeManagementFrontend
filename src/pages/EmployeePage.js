import React from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import "./EmployeePage.css";


class EmployeePage extends React.Component {
  state = { employee: null };

  getEmployee = async () => {
    const employeeId = this.props.match.params.id;
    const { data } = await axios.get(
      `http://localhost:3001/employee/${employeeId}`
    );
    this.setState({ employee: data[0] });
    console.log(this.state);
  };

  componentDidMount() {
    this.getEmployee();
    console.log(this.props);
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
    return <table className="table table-responsive single-table">
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
          <Button className="mr-4" variant="secondary">
            Edit
          </Button>
          <Button variant="secondary">
            Delete
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderEmployee();
  }
}

export default EmployeePage;
