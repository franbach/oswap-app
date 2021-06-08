<template>
  <div v-if="token('token1', 'token2')" @click="this.switchTokens()" class="flex items-center justify-center relative z-20 cursor-pointer">
    <div class="flex absolute items-center p-1 rounded-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 bg-opacity-100 glow-oswapBlue-light-lg border-2 border-oswapGreen-dark dark:border-oswapBlue-dark dark:bg-oswapBlue-light bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen">
      <i class="las la-exchange-alt text-xl text-gray-200 dark:text-gray-700"></i>
    </div>
  </div>

  <div v-else class="flex items-center justify-center relative z-20">
    <div class="flex absolute items-center p-1 rounded-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 bg-opacity-100 dark:bg-gray-700 bg-gray-200">
      <i class="las la-exchange-alt text-xl text-gray-300 dark:text-gray-500"></i>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapTokenSwitch',
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['switchTokens']),

      // Helper
      // It Checks if token1 and or token2 have been already stored.
      token(tokenA, tokenB) {
        if (tokenA && tokenB) {
          return this.getToken()[tokenA] && this.getToken()[tokenB] ? true : false
        } else {
          return this.getToken()[tokenA] ? true : false
        }
      },
    }
  }
</script>