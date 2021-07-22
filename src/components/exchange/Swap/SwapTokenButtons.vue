<template>
  <div class="flex pt-3">
    <!-- Active buttons if tokens selected -->
    <div v-if="token('token1', 'token2')" class="flex flex-1 items-center justify-between">
      <!-- Reset Tokens Button -->
      <div @click="this.resetTokens()" class="flex items-center pr-4 rounded-full hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
        <i class="las la-undo-alt text-lg p-2 text-red-400 rounded-full"></i>
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">reset</p>
      </div>

      <!-- Move to the next phase button -->
      <div @click="goTo('swapper')" class="flex items-center space-x-2 rounded-full group hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 pl-3 cursor-pointer">
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">next</p>
        <i class="las la-arrow-right text-lg p-2 text-gray-200 dark:text-gray-600 rounded-full bg-oswapGreen dark:bg-oswapBlue-light dark:group-hover:bg-oswapGreen group-hover:bg-oswapGreen-dark"></i>
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
      <div class="flex items-center space-x-2 rounded-full bg-opacity-100 pl-3">
        <p class="text-sm text-gray-300 dark:text-gray-600">next</p>
        <i class="las la-arrow-right text-lg p-2 text-gray-200 dark:text-gray-700 rounded-full bg-gray-300 dark:bg-gray-600"></i>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapTokenButtons',
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['resetTokens', 'goTo']),

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