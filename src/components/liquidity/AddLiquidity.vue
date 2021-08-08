<template>
  <div class="flex w-full">
    <div class="flex w-full z-30 rounded-b-xl bg-gray-100 dark:bg-gray-600 dark:text-gray-300 shadow-lg">
      <div class="flex w-full flex-col p-3 space-y-3">
        <div class="flex flex-1 flex-col space-y-1 px-1">
          <p class="text-xs">Available:</p>
          <div class="flex flex-1 space-x-3 items-center">
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token1'].Symbol}}:</p>
              <p v-if="balances" class="text-xs text-el">{{parseFloat(balances.token0).toFixed(6)}}</p>
            </div>
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token2'].Symbol}}:</p>
              <p v-if="balances" class="text-xs text-el">{{parseFloat(balances.token1).toFixed(6)}}</p>
            </div>
          </div>
        </div>
        <Warning :key="createNewPair" :warnings="warnings" />
        <LiquidityAmount v-if="token1" :createNewPair="createNewPair" :token0="token0" :token1="token1" :balances="balances"/>
        <LiquidityRate @setSlippageRate="setSlippage"/> 
      </div>
    </div>
  </div>
</template>

<script>
  import LiquidityAmount from '@/components/liquidity/LiquidityAmount';
  import LiquidityRate from '@/components/liquidity/LiquidityRate';
  import Warning from '@/components/liquidity/Warning'
  import { mapGetters } from 'vuex';

  export default {
    name: 'AddLiquidity',
    components: {
      LiquidityAmount,
      LiquidityRate,
      Warning
    },
    props: {
      balances: Object,
      createNewPair: Boolean
    },
    data() {
      return {
        token0: null,
        token1: null,
        warnings: {}
      }
    },
    mounted() {
      this.token0 = this.getToken()['token1']
      this.token1 = this.getToken()['token2']
      
      if (this.createNewPair == true) { 
          this.warnings['newPair'] = 'You are creating a new pool. Set price accordingly. Procede with caution.'
        } else { delete this.warnings['newPair'] }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      setSlippage(value){
        this.$emit("setSlippageRate", value)
      }
    }
  }
</script>