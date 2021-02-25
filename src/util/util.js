import * as d3 from "d3";

const Util = {
  formatDataForChart: function(inputData, labelKey, dataKey, barChartLabel) {
    const formattedData = {
      labels: [],
      datasets: [
        {
          label: barChartLabel,
          data: [],
          backgroundColor: [],
        },
      ],
    };

    let colors = d3
      .scaleSequential()
      .domain([0, inputData.length])
      .interpolator(d3.interpolateViridis);

    inputData.forEach((item, index) => {
      formattedData.labels.push(item[labelKey]);
      formattedData.datasets[0].data.push(item[dataKey]);
      formattedData.datasets[0].backgroundColor.push(colors(index));
    });

    return formattedData;
  },

  optionsForDepUtilChart: function (inputData, labelKey, dataKey) {
    const chartData = [];
    const chartLabels = [];
    inputData.forEach(item => {
      chartData.push(item[dataKey]);
      chartLabels.push(item[labelKey])
    })

    return {
      title: {
        fontSize: 24,
        display: true,
        text: "Department Utilization",
      },
      maintainAspectRatio: false,
      tooltips: {
        bodyFontSize: 16,
        callbacks: {
          label: (tooltipItem) => {
            return `${chartLabels[tooltipItem.index]}: $${chartData[tooltipItem.index].toLocaleString()}`;
          },
        },
      },
    };
  },

  optionsForSalaryRangeChart: function (inputData, labelKey, dataKey) {
    const chartData = [];
    const chartLabels = [];
    inputData.forEach(item => {
      chartData.push(item[dataKey]);
      chartLabels.push(item[labelKey])
    })

    return {
      title: {
        fontSize: 24,
        display: true,
        text: "Salary",
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            color: 'rgba(220,220,215,255)'
          },
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: 'rgba(220,220,215,255)'
          },
        }]
      },
      maintainAspectRatio: false,
      tooltips: {
        bodyFontSize: 16,
        titleFontSize: 16,
        callbacks: {
          label: (tooltipItem) => {
            return `$${chartData[tooltipItem.index].toLocaleString()}`;
          },
        },
      },
    };
  },

  optionsEmployeesPerDeptChart: function () {
    return {
      title: {
        fontSize: 24,
        display: true,
        text: "Employees Per Department",
      },
      maintainAspectRatio: false,
      tooltips: {
        bodyFontSize: 16,
      },
    };
  },
};

export default Util;