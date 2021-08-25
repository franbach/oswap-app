<template>
  <div class="flex pt-3 st5-all">
    <!-- Active buttons if tokens selected -->
    <div v-if="token('token1', 'token2')" class="flex flex-1 items-center justify-between">
      <!-- Reset Tokens Button -->
      <div @click="this.resetTokens()" class="flex items-center pr-4 rounded-full hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
        <i class="las la-undo-alt text-lg p-2 text-red-400 rounded-full"></i>
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">reset</p>
      </div>

      <!-- Move to the next phase button -->
      <div @click="goTo('addremoveliquidity')" class="flex h-9 st5 items-center space-x-2 ss:space-x-0 xs:space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ss:pl-0 xs:pl-3 cursor-pointer">
        <p class="ss:hidden xs:block text-sm text-gray-500 dark:text-oswapBlue-light">next</p>
        <i class="las la-arrow-right text-lg p-2 st5 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
      </div>
    </div>

    <!-- Disables buttons if tokens not selected -->
    <div v-else class="flex flex-1 items-center justify-between cursor-default select-none">
      <!-- Reset Tokens Button -->
      <div class="flex items-center pr-4 rounded-full bg-opacity-100">
        <i class="las la-undo-alt text-lg p-2 rounded-full text-gray-300 dark:text-gray-600"></i>
        <p class="text-sm text-gray-300 dark:text-gray-600">reset</p>
      </div>

      <!-- Move to the next phase button -->
      <div class="flex h-9 st5 items-center space-x-2 ss:space-x-0 xs:space-x-2 rounded-full group bg-slightGray dark:bg-slightDark ss:pl-0 xs:pl-3">
        <p class="ss:hidden xs:block text-sm text-gray-300 dark:text-gray-600">next</p>
        <i class="las la-arrow-right text-lg p-2 st5 text-gray-200 dark:text-gray-700 rounded-full bg-gray-300 dark:bg-gray-600"></i>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'LiquidityTokenButtons',
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['resetTokens']),
      ...mapActions('liquidity/buttons', ['goTo']),

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