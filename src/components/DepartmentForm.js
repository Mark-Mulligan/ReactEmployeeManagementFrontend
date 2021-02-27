import React from "react";
import axios from "axios";
import { TextField, FormControl } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

class DepartmentForm extends React.Component {
  state = { departmentName: "" };

  componentDidMount() {
    if (this.props.departmentId) {
      this.getDepartmentInfo(this.props.departmentId);
    }
  }

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

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/department/${this.props.departmentId}`)
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
      <form
          onSubmit={(e) => this.props.handleFormSubmit(e, this.state.departmentName)}
        >
          <FormControl fullWidth={true} className="mb-4">
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
          <div>
            <Button className="mr-3 mb-3" variant="light" type="submit">
            {this.props.departmentId ? "Submit Changes" : "Create Department"}
            </Button>
            {this.props.departmentId ? (
            <DeleteModal
              modalMessage="Warning! Deleting this department will also delete all the roles and employees in the department.  Are you sure you want to delete it?"
              handleDeleteClick={this.handleDeleteClick}
            />
          ) : null}
          <Button className="mb-3" as={Link} to={"/departments"} variant="outline-light">
            Cancel
          </Button>
          </div>
        </form>
    )
  }
}

export default DepartmentForm;