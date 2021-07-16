<template>
  <!-- Oswap token info -->
  <tooltip-me>
    <div class="flex rounded-lg focus:outline-none focus:ring-1 focus:ring-black space-x-2 p-2 px-1 md:px-3 items-center">
      <img alt="oSwap" src="@/assets/oswap_asset.png" class="h-6">
      <p class="text-xs dark:text-oswapGreen">${{oswapPrice}}</p>
    </div>

    <tooltip-me-content :options="tooltip" class="flex flex-col w-72 space-y-3 p-3 rounded-lg shadow-xl">
      <div class="flex space-x-2 items-center">
        <i class="las la-coins text-xl"></i>
        <p class="text-sm">Market Cap: ${{marketCap}} USD</p>
      </div>
      <div class="flex space-x-2 items-center">
        <i class="las la-hand-holding-usd text-xl"></i>
        <p class="text-sm">Total Supply: {{balances.totalSupply}} oSWAP</p>
      </div>
      <div class="flex space-x-2 items-center">
        <i class="las la-fire-alt text-xl"></i>
        <p class="text-sm">Tokens Burnt: {{balances.burnedAmount}} oSWAP</p>
      </div>
    </tooltip-me-content>
  </tooltip-me> 
</template> 

<script>
  import openswap from "@/shared/openswap.js"
import { commify } from '@ethersproject/units';

  export default {
    name: "Oswap",
    components: {},
    data() {
      return {
        tooltip: {
          name: 'oswapInfo',
          position: 'bottom',
          color: 'rgba(249, 250, 251, 1)',
          offset: 12,
          speed: 300
        },
        oswapPrice: 0.00,
        balances: {
          totalSupply: 0.00,
          burnedAmount: 0.00
        },
        marketCap: 0.00
      }
    },
    mixins: [openswap],
    mounted: async function() {
      this.oswapPrice = await this.getOswapPrice();
      this.balances = await this.getBurnAndTotalSupply();
      this.marketCap = commify((this.balances.totalSupply * this.oswapPrice).toFixed(2));
      this.balances.totalSupply = commify(this.balances.totalSupply);
      this.balances.burnedAmount = commify(this.balances.burnedAmount);
      
    }
  }
</script>