<template>
  <div class="flex flex-col space-y-2 items-center bg-opacity-100 hover:bg-slightGray dark:hover:bg-slightDark p-3 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-3xl cursor-pointer">
    <div class="flex relative">
      <apexchart type="radialBar" width="200" height="224" :options="chartBalance.options" :series="chartBalance.series" />
      <div class="flex flex-col items-center absolute center-component">
        <img :src="require(`@/assets/${info.icon}`)" class="h-16 w-16 mb-1" alt="">
      </div>
    </div>
    <div class="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-200">
      <p class="text-sm">{{info.chain}} Total Balance</p>
      <p class="text-2xl">$ {{prettify("105769")}}</p>
    </div>
  </div>
</template>

<script>
  import VueApexCharts from "vue3-apexcharts";
  import { ethers } from 'ethers'; 

  import balanceChart from './balanceChart'

  export default {
    name: 'ChartBalances',
    components: {
      apexchart: VueApexCharts
    },
    props: {
      info: Object,
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      }
    },

    beforeMount() {
      // load asset names for balance Pie Chart
      balanceChart.options['labels'] = ["Harmony", "Ethereum", "Binance"];
      // load series for balance Pie Chart
      this.chartBalance.series = [3, 43, 11]
    },
    data() {
      return {
        chartBalance: {
          options: balanceChart.options,
          series: [1]
        }
      }
    }
  }

</script>