import React from 'react';
import axios from 'axios';
import Table from '../components/Table';

class DepartmentsPage extends React.Component {
  state = { departments: [] };

  getDepartments = async () => {
    const { data } = await axios.get("http://localhost:3001/departments");
    this.setState({ departments: data });
  };

  componentDidMount() {
    this.getDepartments();
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Departments</h2>
        <Table 
          tableHeaders={["Id", "Name", "Employees", "Positions", "Total Utilization"]} 
          tableBodyData={this.state.departments}
          tableBodyKeys={["id", "name", "employees", "roles", "departmentUtilization"]}
          history={this.props.history}
          baseURL="/department"
          />
      </div>
    );
  }
}

export default DepartmentsPage;