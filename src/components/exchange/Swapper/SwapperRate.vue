<template>
  <div class="flex flex-col space-y-2 px-1 mt-3">
    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Median Rate</p>
      <p>{{mRate}}</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Current Rate</p>
      <p>{{cRate}}</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Slippage Rate</p>
      <div class="flex items-center space-x-2">
        <!-- Could we add a different color when a user has selected one ? -->
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.1%</p>
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.3%</p>
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.5%</p>
      </div>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Next Rate</p>
      <p>{{nRate}}</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Price Impact</p>
      <p>{{pImpact}}%</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import openswap from "../../../shared/openswap.js";

  export default {
    name: 'SwapperRate',
    mixins: [openswap],
    props: {
      amount: String
    },
    data() {
      return {
        mRate: 0.0,
        cRate: 0.0,
        nRate: 0.0,
        fee: 0.0, //will set this up
        pImpact: 0.0,

      }
    },
    async created(){
      let units = this.getUnits(this.amount, this.getToken()['token1'])
      let bestRoute = await this.getBestRoute(units, this.getToken()['token1'], this.getToken()['token2'])
      //let trade = await this.getTrade(bestRoute.route, units,this.getToken()['token1']);
      this.mRate = bestRoute.route.midPrice.toFixed(4);
      this.cRate = bestRoute.executionPrice.toFixed(4);
      this.nRate = bestRoute.nextMidPrice.toFixed(4);
      this.pImpact = bestRoute.priceImpact.toFixed(2);
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
    }
  }
</script>