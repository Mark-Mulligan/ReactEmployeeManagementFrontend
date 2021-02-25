import React from "react";
import axios from "axios";
import util from "../util/util";
import { Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import { defaults } from 'react-chartjs-2';

defaults.global.defaultFontColor = 'rgba(220,220,215,255)';
defaults.global.elements.line.borderColor = 'rgba(220,220,215,255)';
//defaults.global.gridLines.color = 'rgba(220,220,215,255)';

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
                options={util.optionsForDepUtilChart(this.state.departments, "name", "departmentUtilization")}
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
                options={util.optionsEmployeesPerDeptChart()}
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
              options={util.optionsForSalaryRangeChart(this.state.roleData, 'title', 'salary')}
            />
          )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AnalyticsPage;
