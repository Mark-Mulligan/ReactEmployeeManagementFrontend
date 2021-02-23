import React from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import "./AnalyticsPage.css";

const chartInformation = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

const options = {
  title: {
    fontSize: 20,
    display: true,
    text: "Department Utilizations",
  },
};

class AnalyticsPage extends React.Component {
  state = { departments: [] };

  getDepartments = async () => {
    const { data } = await axios.get("http://localhost:3001/departments");
    const labels = [];
    const chartData = [];
    data.forEach((department) => {
      labels.push(department.name);
      chartData.push(department.departmentUtilization);
    });
    chartInformation.labels = labels;
    chartInformation.datasets[0].data = chartData;
    console.log(chartInformation);
    this.setState({ departments: data });
  };

  renderChart() {
    return <Doughnut data={chartInformation} options={options} />;
  }

  componentDidMount() {
    this.getDepartments();
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <Row>
          <Col>
            {this.state.departments.length > 0 ? this.renderChart() : null}
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default AnalyticsPage;
