import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';

class RolePage extends React.Component {
  state = { role: null, roleId: this.props.match.params.id };

  getRole = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/role/${this.state.roleId}`
    );
    this.setState({ role: data[0] });
  };

  componentDidMount() {
    this.getRole();
    /* 
    Role Profile
    id, title, salary, department, num employees (or list of employees with that role), total utilization
    
    */
  }

  renderRoleProfileData(colTitlesArr, colDataArr) {
    return colTitlesArr.map((title, index) => {
      return (
        <tr key={index}>
          <th className="text-right">{title}</th>
          <td>{colDataArr[index]}</td>
        </tr>
      );
    });
  }

  renderRoleProfileTable(role) {
    return (
      <table className="table table-responsive single-table">
        <tbody className="table-bordered">
          {this.renderRoleProfileData(
            ["Title:", "Department:", "Role Id:", "Salary:", "Number of Employees:", "Utilization:"],
            [
              role.title,
              role.name,
              role.id,
              role.salary,
              role.employees,
              role.roleUtilization
            ]
          )}
        </tbody>
      </table>
    );
  }

  renderRole() {
    if (this.state.role === null) {
      return null;
    }
    return (
      <div className="container mt-5 text-center">
        <h2>Role Profile</h2>
        {this.renderRoleProfileTable(this.state.role)}
        <div>
          <Button
            as={Link}
            to={`${this.state.roleId}/edit`}
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
    );
  }

  render() {
    console.log(this.state)
    return this.renderRole();
  }
}

export default RolePage;