import React from "react";
import axios from "axios";
import { TextField, FormControl } from "@material-ui/core";
import { Button } from "react-bootstrap";
import DeleteModal from "../components/DeleteModal";

class EditDepartmentPage extends React.Component {
  state = {
    departmentName: "Department Name",
    departmentId: this.props.match.params.id,
  };

  getDepartmentInfo = (id) => {
    axios.get(`http://localhost:3001/department/${id}`).then(
      (response) => {
        if (response.status === 200) {
          const departmentData = response.data[0];
          this.setState({ departmentName: departmentData.name });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    this.getDepartmentInfo(this.state.departmentId);
  }

  handleFormSubmit = (event, departmentName) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/department/${this.state.departmentId}`, {
        departmentName: departmentName,
      })
      .then(
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

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/department/${this.state.departmentId}`)
      .then(
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

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-3">Edit Department</h2>
        <form
          onSubmit={(e) => this.handleFormSubmit(e, this.state.departmentName)}
        >
          <FormControl fullWidth={true}>
            <TextField
              id="departmentNameInput"
              label="Name"
              variant="outlined"
              value={this.state.departmentName}
              required={true}
              onChange={(e) =>
                this.setState({ departmentName: e.target.value })
              }
            />
          </FormControl>
          <div className="mt-2">
            <Button className="mr-2" variant="secondary" type="submit">
              Submit
            </Button>
            <DeleteModal
              modalMessage="Warning! Deleting this department will also delete all the roles and employees in the department.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditDepartmentPage;
