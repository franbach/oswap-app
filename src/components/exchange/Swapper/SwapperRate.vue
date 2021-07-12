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
        <SwapperSelectRate rate="0.1" :picked="selectedRate" @selectRate="updateSelectedRate"/>
        <SwapperSelectRate rate="0.3" :picked="selectedRate" @selectRate="updateSelectedRate"/>
        <SwapperSelectRate rate="0.5" :picked="selectedRate" @selectRate="updateSelectedRate"/>
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

  import openswap from "@/shared/openswap.js";
  import SwapperSelectRate from '@/components/exchange/Swapper/SwapperSelectRate'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperRate',
    components: {
      SwapperSelectRate
    },
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
        outputAmount: 0.0,
        inputAmount: '1',
        selectedRate: '0.5'
      }
    },
     mounted: async function() {
      this.updateData();
    },
    async created(){
     

    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
      
      updateSelectedRate(rate) {
        this.selectedRate = rate
        this.updateData();
      },
      updateData:async function(){
        let token1 = this.getToken()['token1']
        let token2 = this.getToken()['token2']
        let units = this.getUnits(this.amount, token1)
        let bestRoute = await this.getBestRoute(units, token1, token2)
        
        this.mRate = bestRoute.route.midPrice.toFixed(4);
        this.cRate = bestRoute.executionPrice.toFixed(4);
        this.nRate = bestRoute.nextMidPrice.toFixed(4);
        this.pImpact = bestRoute.priceImpact.toFixed(2);
        this.inputAmount = await bestRoute.inputAmount.toFixed(5)
        this.outputAmount = await this.getAmountOutWithSlippage(this.amount, bestRoute, this.selectedRate, token1, token2)
        let path = this.getPath(bestRoute);



        this.$emit("setSlippageRate", this.selectedRate);
        this.$emit("path", path);
        this.$emit("priceImpact", this.pImpact);
        this.$emit("amountOut", this.outputAmount);
      }
    }
  }
</script>