<template>
  <div class="grid grid-cols-2 gap-2 min-w-0 py-2 text-gray-500 dark:text-gray-300 px-3">
    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Rate</p>
      <p class="text-el">{{getPriceRate}}</p>
    </div>

    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Price Impact</p>
      <p class="text-el">{{getPriceImpact}}%</p>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'SwapperRateInpact',
    
    mixins: [openswap],
    
    mounted: async function() {
      
       let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']

        let units = this.getUnits(this.getInputAmount(0), token0)
        let bestRoute = await this.getBestRoute(units, token0, token1)
        this.setPriceRate(bestRoute.executionPrice.toFixed(6))
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getPriceRate', 'getPriceImpact', 'getSlippageRate','getInputAmount'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper', ['setPriceRate'])
    }
  }
</script>