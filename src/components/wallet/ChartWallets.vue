<template>
  <div class="flex flex-col space-y-2 items-center p-3">
    <div class="flex relative items-start bg-red-300">
      <apexchart type="radialBar" height="300" :options="chartBalance.options" :series="chartBalance.series" />
    </div>

  </div>
</template>

<script>
  import VueApexCharts from "vue3-apexcharts";
  import { ethers } from 'ethers'; 

  import walletsChart from './walletsChart'

  export default {
    name: 'ChartWallets',
    components: {
      apexchart: VueApexCharts
    },
    props: {
      logo: String,
      assets: Object,
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      }
    },
    beforeMount() {
      // load asset names for balance Pie Chart
      walletsChart.options['labels'] = ["Harmony", "Ethereum", "Binance"];
      // load series for balance Pie Chart
      this.chartBalance.series = [75, 43, 1]
    },
    data() {
      return {
        chartBalance: {
          options: walletsChart.options,
          series: [1]
        }
      }
    }
  }
</script>