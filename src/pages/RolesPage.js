import React from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import './RolesPage.css';

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 160 },
  { field: "salary", headerName: "Salary", width: 130, type: "number" },
  {
    field: "department",
    headerName: "Department",
    width: 160,
  },
];

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
      <div className="mt-5">
        <h2 className="text-center">Roles</h2>
        <div className="roles-table-container">
          <DataGrid
            style={{ color: 'rgba(189,189,189,255'}}
            autoHeight={true}
            rowHeight={30}
            rows={this.state.roles}
            columns={columns}
            disableSelectionOnClick={true}
            onRowClick={(data) => {
              this.props.history.push(`/role/${data.row.id}`);
            }}
          />
        </div>
      </div>
    );
  }
}

export default RolesPage;