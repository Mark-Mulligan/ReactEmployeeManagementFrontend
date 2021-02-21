import React from "react";
import axios from "axios";
import VerticalTable from '../components/VerticalTable';

const headerAndKeys = [
  {header: 'Title:', key:'title'},
  {header: 'Department:', key: 'name'},
  {header: 'Role Id:', key: 'id'},
  {header: 'Employees:', key: 'employees'},
  {header: 'Salary:', key: 'salary'},
  {header: 'Total Utilization:', key: 'roleUtilization'}
]

class RolePage extends React.Component {
  state = { role: null, roleId: this.props.match.params.id };

  getRole = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/role/${this.state.roleId}`
    );
    this.setState({ role: data[0] });
  };

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/employee/${this.state.roleId}`).then(
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

  componentDidMount() {
    this.getRole();
  }

  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <h2 className="text-center">Role Profile</h2>
        <VerticalTable headersAndKeys={headerAndKeys} tableData={this.state.role} />
      </div>
    );
  }
}

export default RolePage;
