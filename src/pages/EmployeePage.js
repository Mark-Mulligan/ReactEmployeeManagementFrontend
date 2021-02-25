import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import VerticalTable from "../components/VerticalTable";

const headerAndKeys = [
  {header: 'First Name:', key:'first_name'},
  {header: 'Last Name:', key:'last_name'},
  {header: 'Employee Id:', key: 'id'},
  {header: 'Title:', key: 'title'},
  {header: 'Department:', key: 'department'},
  {header: 'Salary:', key: 'salary'},
]

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
            this.props.history.push("/employees");
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

  render() {
    return (
      <div className="container mt-5 text-center">
        <h2>Employee Profile</h2>
        <VerticalTable headersAndKeys={headerAndKeys} tableData={this.state.employee} />
        <div>
          <Button
            as={Link}
            to={`${this.state.employeeId}/edit`}
            className="mr-4"
            variant="secondary"
          >
            Edit
          </Button>
          <DeleteModal
            modalMessage="Are you sure you want to delete this employee?"
            handleDeleteClick={this.handleDeleteClick}
          />
        </div>
      </div>
    )
  }
}

export default EmployeePage;
