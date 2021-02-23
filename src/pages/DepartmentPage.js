import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import VerticalTable from '../components/VerticalTable';
import DeleteModal from '../components/DeleteModal';

const headerAndKeys = [
  {header: 'Name:', key:'name'},
  {header: 'Department Id:', key: 'id'},
  {header: 'Employees:', key: 'employees'},
  {header: 'Roles:', key: 'roles'},
  {header: 'Total Utilization:', key: 'departmentUtilization'},
]

class DepartmentPage extends React.Component {
  state = { department: null, departmentId: this.props.match.params.id };

  getDepartment = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/department/${this.state.departmentId}`
    );
    this.setState({ department: data[0] });
  };

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/department/${this.state.departmentId}`).then(
      (response) => {
        if (response.status === 200) {
          this.props.history.push("/departments");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    this.getDepartment();
  }

  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <h2 className="text-center">Department Profile</h2>
        <VerticalTable headersAndKeys={headerAndKeys} tableData={this.state.department} />
        <div className="text-center">
          <Button
            as={Link}
            to={`${this.state.departmentId}/edit`}
            className="mr-4"
            variant="secondary"
          >
            Edit
          </Button>
          <DeleteModal
            modalMessage="Are you sure you want to delete this Department?"
            handleDeleteClick={this.handleDeleteClick}
          />
        </div>
      </div>
    );
  }
}

export default DepartmentPage;