<template>
  <div v-if="isOpen" class="flex items-center h-12 justify-between">
    <!-- Burn Fees Button -->
    <div class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-red-400 dark:hover:bg-red-400 border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
      <p class="text-sm text-gray-200 dark:text-gray-700">Burn Fees</p>
      <i class="las la-burn text-2xl text-gray-200 dark:text-gray-700"></i>
    </div>

    <!-- Unstake Button -->
    <div class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
      <p class="text-sm text-gray-200 dark:text-gray-700">Unstake</p>
      <i class="las la-sign-out-alt text-2xl text-gray-200 dark:text-gray-700"></i>
    </div>

    <!-- Stake Button -->
    <div class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
      <p class="text-sm text-gray-200 dark:text-gray-700">Stake</p>
      <i class="las la-sign-in-alt text-2xl text-gray-200 dark:text-gray-700"></i>
    </div>

    <!-- Refresh Button -->
    <div class="flex items-center justify-center rounded-full h-9 w-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
      <i class="las la-undo-alt text-lg text-gray-200 dark:text-gray-700"></i>
    </div>

    <!-- Close Button -->
    <div @click="this.$emit('toggle')" class="flex items-center justify-center rounded-full h-9 w-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapBlue-light dark:hover:bg-oswapBlue-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
      <i class="las la-times text-xl text-gray-200 dark:text-gray-700"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PoolStatsButtons',
    props: {
      isOpen: Boolean
    }
  }
</script>