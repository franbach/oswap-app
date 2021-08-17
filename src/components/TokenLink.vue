<template>
  <div v-if="token('token1', 'token2')" class="flex st5-all items-center justify-center relative z-20 cursor-pointer">
    <div class="glow-link-line"></div>
    <div class="glow-link"></div>
    <div class="flex absolute z-30 items-center w-7 h-7 justify-center rounded-lg border border-oswapGreen-dark dark:border-oswapGreen-light dark:bg-oswapBlue-light bg-gray-200">
      <i class="las la-link text-xl text-oswapGreen-dark dark:text-oswapGreen-light"></i>
    </div>
  </div>

  <div v-else class="flex items-center st5-all justify-center relative z-20">
    <div class="flex absolute items-center w-7 h-7 justify-center rounded-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 bg-opacity-100 dark:bg-gray-700 bg-gray-200">
      <i class="las la-link text-xl text-gray-300 dark:text-gray-500"></i>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'TokenLink',
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