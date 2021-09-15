<template>
  <div class="flex items-center justify-between text-xs min-w-0 px-1 mt-3">
    <p class="dark:text-gray-300 text-el">Slippage Rate &nbsp;</p>
    <div class="flex items-center ss:space-x-1 xs:space-x-2">
      <div class="flex">
        <div class="flex pr-1 items-center rounded-lg text-oswapGreen">
          <p>{{getSlippageRate}}%</p>
        </div>
      </div>
      <SelectRate rate="0.1" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SelectRate rate="0.3" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SelectRate rate="0.5" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SwapperRateCustom :picked="getSlippageRate" @selectRate="updateSelectedRate"/>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import SelectRate from '@/components/SelectRate';
  import SwapperRateCustom from '@/components/exchange/Swapper/SwapperRateCustom';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperRate',
    components: {
      SelectRate,
      SwapperRateCustom,
    },
    mixins: [openswap],
    mounted: async function() {
      this.updateData();
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getInputAmount', 'getSlippageRate'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
      ...mapActions('exchange/swapper', ['setSlippageRate', 'setInputAmount', 'setPriceImpact', 'setThePath']),
      
      updateSelectedRate(rate) {
        // Ensures a correct rate
        this.setSlippageRate(
          Number((rate == '' || parseFloat(rate) < 0.1 ) ? '0.1' : rate).toString()
        )
        this.updateData();
      },

      updateData: async function() {
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']

        let units = this.getUnits(this.getInputAmount(0), token0)
        let bestRoute = await this.getBestRoute(units, token0, token1)

        this.setPriceImpact(bestRoute.priceImpact.toFixed(2));

        this.setInputAmount({
          0: await bestRoute.inputAmount.toFixed(6)
        })

        this.setInputAmount({
          1: await this.getAmountOutWithSlippage(this.getInputAmount(0), bestRoute, this.getSlippageRate, token0, token1)
        })
        
        this.setThePath(this.getPath(bestRoute));
      }
    }
  }
</script>