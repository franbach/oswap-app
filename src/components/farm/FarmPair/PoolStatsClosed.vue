<template>
  <div v-if="isOpen" class="flex ml-2 justify-between">
    <div class="flex min-w-0 w-full h-12 space-x-3">
      <!-- Earned Info -->
      <div class="flex w-20 flex-col h-full justify-between">
        <div class="flex space-x-2 items-center">
          <i class="las la-hand-holding-usd text-oswapGreen"></i>
          <p class="text-xs font-extralight text-oswapBlue-light">Earned</p>
        </div>
        <p class="text-sm font-bold dark:text-gray-300 text-el">{{pendingReward}}</p>
      </div>
      <!-- Liquidity Info -->
      <div class="flex min-w-0 w-full flex-col h-full justify-between">
        <div class="flex space-x-2 items-center">
          <i class="las la-tint text-oswapGreen"></i>
          <p class="text-xs font-extralight text-oswapBlue-light">Liquidity</p>
        </div>
        <div v-if="!this.totalLiquidityValue" class="flex items-center pb-2 h-4">
          <svg class="animate-spin h-4 w-4 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p v-else class="text-sm font-extralight pl-1 dark:text-gray-300 text-el">$ {{totalLiquidityValue[0]}}</p>
      </div>
    </div>
    <!-- Open Details Button -->
    <div class="flex h-12 items-end">
      <div @click="setPool()" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">details</p>
        <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";

  import { mapGetters, mapActions } from 'vuex';

  
  export default {
    name: 'PoolStatsClosed',
    mixins: [openswap],
    props: {
      isOpen: Boolean,
      pool: Object,
      poolData: Object
    },
    data() {
      return {
        totalLiquidityValue: '',
        personalLiquidityValue: '',
        pendingReward: ''
      }
    },
    mounted: async function (){

      this.pendingReward = this.getEthUnits(this.poolData.pendingReward)

      
      this.totalLiquidityValue = await this.getLiquidityValue(this.pool, this.poolData.token0Tstaked, this.getBN(this.poolData.token1Tstaked))
    
      this.personalLiquidityValue = await this.getLiquidityValue(this.pool, this.poolData.token0Pstaked, this.getBN(this.poolData.token1Pstaked))
      let TVLData = {}
      TVLData.pvl = this.personalLiquidityValue[1]
      TVLData.pool = {
        name: this.poolData.pool.pair,
        TVL: this.totalLiquidityValue[1]
      }
      this.$emit("updateTVL", TVLData)



      
    },
    methods: {
      ...mapActions('farm/farmData', ['setPoolDataState']),
      ...mapGetters('farm/farmData', ['getFarmData']),
      setPool() {
        this.$emit('setPool', 'open');
        if (window.innerWidth >= 768) {
          this.oswapEmit.emit("recalc-tooltips");
        }
      }
    }
  }
</script>