import { ethers } from 'ethers'; 

function prettify(number) {
  return ethers.utils.commify(number)
}

const walletsChart = {
  options: {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        inverseOrder: true,
        hollow: {
          margin: 0,
          size: '48%',
          background: 'transparent',
  
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180
  
      },
    },
    stroke: {
      lineCap: 'round'
    },
    legend: {
      show: false,
      floating: true,
      position: 'right',
      offsetX: 0,
      offsetY: 158
    },
  }
}

export default walletsChart