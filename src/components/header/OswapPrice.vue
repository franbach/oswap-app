<template>
  <!-- Oswap token info -->
  <tooltipMe>
    <div class="flex rounded-lg focus:outline-none focus:ring-1 focus:ring-black space-x-2 p-2 px-1 md:px-3 items-center">
      <img alt="oSwap" src="@/assets/oswap_asset.png" class="h-6">
      <p class="text-xs dark:text-oswapGreen">${{oswapPrice}}</p>
    </div>

    <tooltipMeContent name="oswapInfo" position="bottom" color="rgba(249, 250, 251, 1)" offset="12" class="flex flex-col w-72 space-y-3 p-3 rounded-lg shadow-xl">
      <div class="flex space-x-2 items-center">
        <i class="las la-coins text-xl"></i>
        <p class="text-sm">Market Cap: $ 260,754.97 USD</p>
      </div>
      <div class="flex space-x-2 items-center">
        <i class="las la-hand-holding-usd text-xl"></i>
        <p class="text-sm">Total Supply: 13,723,945.74 oSWAP</p>
      </div>
      <div class="flex space-x-2 items-center">
        <i class="las la-fire-alt text-xl"></i>
        <p class="text-sm">Tokens Burnt: 823,282.45 oSWAP</p>
      </div>
    </tooltipMeContent>
  </tooltipMe>    
</template> 

<script>
  import openswap from "@/shared/openswap.js"
  import tooltipMe from "@/components/tooltipMe"
  import tooltipMeContent from "@/components/tooltipMeContent"

  export default {
    name: "Oswap",
    components: {
      tooltipMe,
      tooltipMeContent
    },
    data() {
      return {
        oswapPrice: 0.00,
      }
    },
    mixins: [openswap],
    mounted: async function() {
      this.oswapPrice = await this.getOswapPrice();
    }
  }
</script>