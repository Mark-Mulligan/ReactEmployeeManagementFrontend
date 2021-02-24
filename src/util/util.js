import * as d3 from "d3";

const Util = {
  formatDataForChart: (inputData, labelKey, dataKey, barChartLabel) => {
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

  formatOptionsForMoney: function (chartTitle, fontSize, inputData, labelKey, dataKey) {
    const chartData = [];
    const chartLabels = [];
    inputData.forEach(item => {
      chartData.push(item[dataKey]);
      chartLabels.push(item[labelKey])
    })

    return {
      title: {
        fontSize: fontSize,
        display: true,
        text: chartTitle,
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

  formatChartOptions: function (chartTitle, fontSize) {
    return {
      title: {
        fontSize: fontSize,
        display: true,
        text: chartTitle,
      },
      maintainAspectRatio: false,
      tooltips: {
        bodyFontSize: 20,
      },
    };
  },
};

export default Util;
