import React from 'react';
import axios from 'axios';
import Table from '../components/Table';

class RolesPage extends React.Component {
  state = { roles: []}

  getRoles = async () => {
    const { data } = await axios.get("http://localhost:3001/roles");
    this.setState({ roles: data });
  };

  componentDidMount() {
    this.getRoles();
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Roles Table</h2>
        <Table 
          tableHeaders={["Id", "Title", "Salary", "Department"]} 
          tableBodyData={this.state.roles}
          tableBodyKeys={["id", "title", "salary", "department"]}
          history={this.props.history}
          baseURL="/role"
          />
      </div>
    );
  }
}

export default RolesPage;