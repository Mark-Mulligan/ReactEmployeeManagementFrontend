import React from "react";
import api from "../apis/api";
import VerticalTable from "../components/VerticalTable";
import ErrorModal from "../components/ErrorModal";
import EditDeleteGroup from "../components/EditDeleteGroup";

const headerAndKeys = [
  { header: "First Name:", key: "first_name" },
  { header: "Last Name:", key: "last_name" },
  { header: "Employee Id:", key: "id" },
  { header: "Title:", key: "title" },
  { header: "Department:", key: "department" },
  { header: "Salary:", key: "salary" },
];

class EmployeePage extends React.Component {
  state = {
    employee: null,
    employeeId: this.props.match.params.id,
    errorMessage: "",
  };

  getEmployee = () => {
    api
      .get(`/employee/${this.state.employeeId}`)
      .then(({ data }) => {
        this.setState({ employee: data[0] });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage:
              "There was an error connecting to the server. Please reload the page.",
          });
        } else {
          console.log("Error", error.message);
          this.setState({
            errorMessage: "There was an error loading the page.",
          });
        }
        console.log(error.config);
      });
  };

  handleDeleteClick = () => {
    api.delete(`/employee/${this.state.employeeId}`).then(
      (response) => {
        if (response.status === 200) {
          this.props.history.push("/roles");
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "There was an error deleteing the role.",
        });
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
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <div>
            <VerticalTable
              headersAndKeys={headerAndKeys}
              tableData={this.state.employee}
            />
            <EditDeleteGroup
              modalMessage="Are you sure you want to delete this employee?"
              handleDeleteClick={this.handleDeleteClick}
              linkTo={`${this.state.employeeId}/edit`}
            />
          </div>
        )}
      </div>
    );
  }
}

export default EmployeePage;
