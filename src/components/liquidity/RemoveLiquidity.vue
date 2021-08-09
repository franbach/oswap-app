<template>
  <div class="flex w-full">
    <div class="flex flex-1 z-30 col-span-2 rounded-b-xl bg-gray-100 dark:bg-gray-600 dark:text-gray-300 shadow-lg">
      <div class="flex flex-1 flex-col p-3 space-y-3">
        <div class="flex flex-col space-y-1 px-1">
          <p class="text-xs">Max Available:</p>
          <div class="flex space-x-2 items-center">
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
            </div>
            <div class="flex items-center space-x-1">
              <p class="text-xs">{{this.getToken()['token1'].Symbol}}</p>
              <p class="text-lg text-oswapGreen">/</p>
              <p class="text-xs">{{this.getToken()['token2'].Symbol}}:</p>
              <p class="text-xs">{{balances.lpToken}}</p>
            </div>
          </div>
        </div>
        <LiquidityAmountLP v-if="token1" :token0="token0" :token1="token1" :balances="balances"/>
      </div>
    </div>
  </div>
</template>

<script>
  import LiquidityAmountLP from '@/components/liquidity/LiquidityAmountLP';
  import { mapGetters } from 'vuex';

  export default {
    name: 'RemoveLiquidity',
    components: {
      LiquidityAmountLP
    },
    props: {
      balances: Object
    },

    data() {
      return {
        tokenInfo: null,
        token0: null,
        token1: null,
      }
    },
    mounted() {
      this.token0 = this.getToken()['token1']
      this.token1 = this.getToken()['token2']
      this.tokenInfo = `${this.getToken()['token1'].Symbol} / ${this.getToken()['token2'].Symbol}`
    },

    methods: {
      
      ...mapGetters('exchange', ['getToken'])
    }
  }
</script>