import React from "react";
import axios from "axios";
import util from "../util/util";
import { Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";

class AnalyticsPage extends React.Component {
  state = { departments: [], roleData: [] };

  getDepartments = async () => {
    const { data } = await axios.get("http://localhost:3001/departments");
    this.setState({ departments: data });
  };

  getRoleData = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/api/roles/chartdata"
    );
    this.setState({ roleData: data });
  };

  componentDidMount() {
    this.getDepartments();
    this.getRoleData();
  }

  render() {
    return (
      <div className="container-fluid mt-5">
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
                options={util.formatOptionsForMoney("Department Utilization", 20, this.state.departments, "name", "departmentUtilization")}
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
                options={util.formatChartOptions(
                  "Employees Per Department",
                  20
                )}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} className="mb-5">
          {this.state.roleData.length > 0 && (
            <Bar
              data={util.formatDataForChart(this.state.roleData, 'title', 'salary', 'Salary ($)')}
              height={400}
              options={util.formatChartOptions("Salary Ranges", 20)}
            />
          )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AnalyticsPage;
