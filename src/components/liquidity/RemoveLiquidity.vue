<template>
  <div class="grid grid-cols-2">
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
              <p class="text-xs">2000.00</p>
            </div>
          </div>
        </div>
        <LiquidityAmount :tokenInfo="tokenInfo" />
      </div>
    </div>
  </div>
</template>

<script>
  import LiquidityAmount from '@/components/liquidity/LiquidityAmount';
  import { mapGetters } from 'vuex';

  export default {
    name: 'RemoveLiquidity',
    components: {
      LiquidityAmount
    },
    data() {
      return {
        tokenInfo: null
      }
    },
    mounted() {
      this.tokenInfo = `${this.getToken()['token1'].Symbol} / ${this.getToken()['token2'].Symbol}`
    },
    methods: {
      ...mapGetters('exchange', ['getToken'])
    }
  }
</script>