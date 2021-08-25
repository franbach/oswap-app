<template>
  <div v-if="token('token1', 'token2')" @click="this.switchTokens()" class="flex items-center justify-center relative z-20 group cursor-pointer">
    <div class="flex absolute items-center justify-center w-7 h-7 rounded-lg glow-oswapBlue-light-lg bg-slightGray dark:bg-slightDark border border-oswapGreen group-hover:bg-oswapGreen st5">
      <i class="las la-exchange-alt text-lg text-oswapGreen group-hover:text-gray-50 st5"></i>
    </div>
  </div>

  <div v-else class="flex items-center justify-center relative z-20">
    <div class="flex absolute items-center justify-center w-7 h-7 rounded-lg border border-black border-opacity-10 dark:bg-slightDark bg-slightGray st5">
      <i class="las la-exchange-alt text-lg text-gray-300 dark:text-gray-500 st5"></i>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'TokenSwitch',
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