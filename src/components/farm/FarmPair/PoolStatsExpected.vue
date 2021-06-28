<template>
  <div v-if="isOpen" class="flex flex-col ml-2 mt-2 mb-1 h-full justify-between">
    <div class="flex space-x-2 h-5 items-center">
      <i class="las la-calendar-day dark:text-oswapGreen"></i>
      <p class="text-sm font-thin dark:text-gray-300">Expected Weekly Rewards: $ 250.00</p>
    </div>

    <div class="flex space-x-2 h-5 items-center">
      <i class="las la-calendar dark:text-oswapGreen"></i>
      <p class="text-sm font-thin dark:text-gray-300">Expected Monthly Rewards: $ 1000.00</p>
    </div>

    <div class="flex space-x-2 h-5 items-center">
      <i class="las la-coins dark:text-oswapGreen"></i>
      <p class="text-sm font-thin dark:text-gray-300">LP Tokens Available: 3000.00</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PoolStatsExpected',
    props: {
      isOpen: Boolean
    }
  }
</script>