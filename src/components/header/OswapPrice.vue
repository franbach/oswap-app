<template>
    <!-- Oswap token info -->
    <div class="flex items-center space-x-2 p-2 px-3 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-black">
    <img alt="Vue logo" src="../../assets/oswap_asset.png" class="h-6">
    <p class="text-xs dark:text-oswapGreen">${{oswapPrice}}</p>
    </div>
</template> 

<script>
import openswap from "../../shared/openswap.js"

export default {
    name: "Oswap",
    data() {
      return {
        oswapPrice: 0.00
      }
    },
    mixins: [openswap],
    mounted: async function() {
        this.oswapPrice = await this.getOswapPrice();
    },
    methods: {
    }
}
</script>
