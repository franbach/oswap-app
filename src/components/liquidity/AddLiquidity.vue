<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-1 z-30 col-span-2 rounded-b-xl bg-gray-100 dark:bg-gray-600 dark:text-gray-300 shadow-lg">
      <div class="flex flex-1 flex-col p-3 space-y-3">
        <div class="flex flex-col space-y-1 px-1">
          <p class="text-xs">Available:</p>
          <div class="flex space-x-4 items-center">
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token1'].Symbol}}:</p>
              <p v-if="balances" class="text-xs">{{parseFloat(balances.token0).toFixed(2)}}</p>
            </div>
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token2'].Symbol}}:</p>
              <p v-if="balances" class="text-xs">{{parseFloat(balances.token1).toFixed(2)}}</p>
            </div>
          </div>
        </div>
        <LiquidityAmount v-if="token1" :token0="token0" :token1="token1" :balances="balances"/>
        <LiquidityRate />
        <div class="flex flex-wrap space-x-1 text-xs px-1">
          <p>You will need 1</p>
          <p class="text-oswapGreen">
            {{this.getToken()['token1'].Symbol}}
          </p>
          <p>and 6.388241105327963516</p>
          <p class="text-oswapGreen">
            {{this.getToken()['token2'].Symbol}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LiquidityAmount from '@/components/liquidity/LiquidityAmount';
  import LiquidityRate from '@/components/liquidity/LiquidityRate';
  import { mapGetters } from 'vuex';

  export default {
    name: 'AddLiquidity',
    components: {
      LiquidityAmount,
      LiquidityRate
    },
    props: {
      balances: Object
    },
    data() {
      return {
        token0: null,
        token1: null,
      }
    },
    mounted() {
      this.token0 = this.getToken()['token1']
      this.token1 = this.getToken()['token2']
    },
    methods: {
      ...mapGetters('exchange', ['getToken'])
    }
  }
</script>