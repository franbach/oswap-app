<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-1 col-span-2 rounded-b-xl bg-gray-100 dark:bg-gray-600 dark:text-gray-300 shadow-lg">
      <div class="flex flex-1 flex-col p-3 space-y-3">
        <div class="flex flex-col space-y-1 px-1">
          <p class="text-xs">Available:</p>
          <div class="flex space-x-4 items-center">
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token1'].Symbol}}</p>
              <p class="text-xs">1300.75</p>
            </div>
            <div class="flex items-center space-x-1">
              <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
              <p class="text-xs">{{this.getToken()['token2'].Symbol}}</p>
              <p class="text-xs">517.89</p>
            </div>
          </div>
        </div>
        <LiquidityAmount />
        <LiquidityRate />
        <p class="text-xs px-2">
          You will need 1 ONE And 6.388241105327963516 oSWAP
        </p>
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
    methods: {
      ...mapGetters('exchange', ['getToken'])
    }
  }
</script>