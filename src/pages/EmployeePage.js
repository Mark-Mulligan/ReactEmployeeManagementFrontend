import React from "react";
import axios from "axios";

class EmployeePage extends React.Component {
  state = { employee: null };

  getEmployee = async () => {
    const employeeId = this.props.match.params.id;
    const { data } = await axios.get(
      `http://localhost:3001/employees/${employeeId}`
    );
    this.setState({ employee: data[0] });
    console.log(this.state);
  };

  componentDidMount() {
    this.getEmployee();
    console.log(this.props);
  }

  renderEmployee() {
    if (this.state.employee === null) {
      return null;
    }
    const employee = this.state.employee;
    return (
      <div>
        <p>
          Name: {employee.first_name} {employee.last_name}
        </p>
        <p>Employee Id: {employee.id}</p>
        <p>Title: {employee.title}</p>
        <p>Department: {employee.department}</p>
        <p>Salary: {employee.salary}</p>
      </div>
    );
  }

  render() {
    return <div className="container">{this.renderEmployee()}</div>;
  }
}

export default EmployeePage;
