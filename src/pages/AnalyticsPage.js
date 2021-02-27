import React from "react";
import { Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import ErrorModal from "../components/ErrorModal";
import api from "../apis/api";
import util from "../util/util";

// GLOBAL VARIABLES FOR REACT-CHARTJS-2
defaults.global.defaultFontColor = "rgba(220,220,215,255)";
defaults.global.elements.line.borderColor = "rgba(220,220,215,255)";

class AnalyticsPage extends React.Component {
  state = { departments: [], roleData: [], employeeData: [], errorMessage: "" };

  getDepartments = () => {
    api
      .get("/departments")
      .then((response) => {
        this.setState({ departments: response.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage: "There was an error connecting to the server.",
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

  getEmployeeData = () => {
    api
      .get("/api/employees/chartdata")
      .then((response) => {
        this.setState({ employeeData: response.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage: "There was an error connecting to the server.",
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

  getRoleData = () => {
    api
      .get("/api/roles/chartdata")
      .then((response) => {
        this.setState({ roleData: response.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          this.setState({ errorMessage: error.response.statusText });
        } else if (error.request) {
          console.log(error.request);
          this.setState({
            errorMessage: "There was an error connecting to the server.",
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

  componentDidMount() {
    this.getDepartments();
    this.getRoleData();
    this.getEmployeeData();
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="mb-4">
          <h1 className="text-center">Company Overview</h1>
        </div>
        {this.state.errorMessage ? (
          <ErrorModal modalMessage={this.state.errorMessage} />
        ) : (
          <div>
            <Row>
              <Col lg={6} md={12} className="mb-5">
                {this.state.departments.length > 0 && (
                  <Doughnut
                    data={util.formatDataForChart(
                      this.state.departments,
                      "name",
                      "departmentUtilization"
                    )}
                    height={400}
                    width={400}
                    options={util.optionsForDepUtilChart(
                      this.state.departments,
                      "name",
                      "departmentUtilization"
                    )}
                  />
                )}
              </Col>
              <Col lg={6} md={12} className="mb-5">
                {this.state.departments.length > 0 && (
                  <Doughnut
                    data={util.formatDataForChart(
                      this.state.departments,
                      "name",
                      "employees"
                    )}
                    height={400}
                    width={400}
                    options={util.optionsEmployeesPerDeptChart(
                      this.state.departments,
                      "employees"
                    )}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={12} className="mb-5 pl-4 pr-4">
                {this.state.roleData.length > 0 && (
                  <Bar
                    data={util.formatDataForChart(
                      this.state.roleData,
                      "title",
                      "salary",
                      "Salary ($)"
                    )}
                    height={400}
                    options={util.optionsForSalaryRangeChart(
                      this.state.roleData,
                      "title",
                      "salary"
                    )}
                  />
                )}
              </Col>
              <Col lg={6} md={12} className="mb-5 pl-4 pr-4">
                {this.state.employeeData.length > 0 && (
                  <Bar
                    data={util.formatDataForChart(
                      this.state.employeeData,
                      "year",
                      "employees_hired",
                      "Employees Hired"
                    )}
                    height={400}
                    options={util.optionsForEmployeesHiredChart()}
                  />
                )}
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default AnalyticsPage;
