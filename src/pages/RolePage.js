import React from "react";
import axios from "axios";
import VerticalTable from "../components/VerticalTable";
import ButtonGroup from "../components/ButtonGroup";

const headerAndKeys = [
  { header: "Title:", key: "title" },
  { header: "Department:", key: "name" },
  { header: "Role Id:", key: "id" },
  { header: "Employees:", key: "employees" },
  { header: "Salary:", key: "salary" },
  { header: "Total Utilization:", key: "roleUtilization" },
];

class RolePage extends React.Component {
  state = { role: null, roleId: this.props.match.params.id };

  getRole = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/role/${this.state.roleId}`
    );
    this.setState({ role: data[0] });
  };

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/role/${this.state.roleId}`).then(
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
        <VerticalTable
          headersAndKeys={headerAndKeys}
          tableData={this.state.role}
        />
        <ButtonGroup
          modalMessage="Warning! Deleting this role will also delete all the employees that have this role.  Are you sure you want to delete it?"
          handleDeleteClick={this.handleDeleteClick}
          linkTo={`${this.state.roleId}/edit`}
         /> 
      </div>
    );
  }
}

export default RolePage;
