import { ethers } from 'ethers'; 

function prettify(number) {
  return ethers.utils.commify(number)
}

const stakingChart = {
  options: {
    chart: {
      type: 'donut'
    },
    responsive: [{
      breakpoint: 540,
      options: {
        chart: {
          width: 150,
          height: 168
        }
      }
    }],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '85%',
        }
      }
    },
    colors: [
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
      '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb'
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
      curve: 'smooth',
      lineCap: 'round',
      colors: 'rgba(49, 53, 71, 1)',
      width: 1,      
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0.15,
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0.35,
        }
      },
    },
    tooltip: {
      theme: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return (
          '<div class="flex p-3 rounded-full bg-gray-100 dark:bg-slightDark text-xs text-gray-500 dark:text-gray-200 border-2 border-oswapGreen">' +
          "<span>" + w.globals.labels[seriesIndex] + ": " + "$ " + prettify(parseFloat(series[seriesIndex]).toFixed(2)) + "</span>" +
          "</div>"
        );
      }
    }
  },
}

export default stakingChart