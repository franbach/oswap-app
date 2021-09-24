<template>
  <div class="flex p-3">
    <div class="flex space-x-3">
      <div class="relative">
        <apexchart type="donut" width="200" height="224" :options="chartStaking.options" :series="chartStaking.series" />
        <div class="flex flex-col items-center w-full absolute center-component text-gray-500 dark:text-gray-200">
          <p class="text-2xl">$ {{prettify("23000")}}</p>
          <p class="text-sm">Total Staking</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueApexCharts from "vue3-apexcharts";
  import { ethers } from 'ethers'; 

  import stakingChart from './stakingChart'

  export default {
    name: 'ChartStaking',
    components: {
      apexchart: VueApexCharts
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      }
    },
    beforeMount() {
      // load asset names for balance Pie Chart
      stakingChart.options['labels'] = ["A", "B", "C", "D", "E", "FFF"];
      // load series for balance Pie Chart
      this.chartStaking.series = [3, 43, 11, 24, 56, 99]
    },
    data() {
      return {
        chartStaking: {
          options: stakingChart.options,
          series: [1]
        }
      }
    }
  }

</script>