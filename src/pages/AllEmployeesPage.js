import React from "react";
import axios from "axios";
import Table from '../components/Table';

class AllEmployeesPage extends React.Component {
  state = { employees: [] };

  getEmployees = async () => {
    const { data } = await axios.get("http://localhost:3001/employees");
    this.setState({ employees: data });
  };

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Employee Table</h2>
        <Table 
          tableHeaders={["Id", "First", "Last", "Title", "Department", "Salary", "Manager"]} 
          tableBodyData={this.state.employees}
          tableBodyKeys={["id", "first_name", "last_name", "title", "department", "salary", "manager"]}
          history={this.props.history}
          baseURL="/employee"
          />
      </div>
    );
  }
}

export default AllEmployeesPage;
