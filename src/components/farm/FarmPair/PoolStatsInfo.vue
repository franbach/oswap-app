<template>
  <div v-if="isOpen" class="flex flex-col dark:bg-gray-700 bg-gray-200 rounded-2xl">
    <div class="flex flex-1 shadow-lg dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
      <div class="flex flex-1 items-center justify-between">
        <div class="flex h-full flex-col justify-between">
          <p class="text-xs text-oswapGreen-dark">Your Unclaimed Rewards</p>
          <p class="text-2xl dark:text-gray-300">1750.5479</p>
        </div>
        <div class="flex space-x-2 px-3 py-3 items-center rounded-lg bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <i class="las la-hand-holding-usd text-3xl text-gray-200 dark:text-gray-700"></i>
          <p class="text-lg text-gray-200 dark:text-gray-700">Collect !</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
      <div class="flex flex-col justify-between h-12">
        <div class="flex items-center space-x-2">
          <i class="las la-balance-scale-left text-xl text-oswapGreen"></i>
          <p class="text-xs text-oswapBlue-light">Stake Weight</p>
        </div>
        <p class="text-xl dark:text-gray-300">0.25%</p>
      </div>
      <div class="flex flex-col justify-between h-12">
        <div class="flex items-center space-x-2">
          <i class="las la-coins text-xl text-oswapGreen"></i>
          <p class="text-xs text-oswapBlue-light">Staked LP Tokens</p>
        </div>
        <p class="text-xl dark:text-gray-300">2157.345</p>
      </div>
      <div class="flex flex-col justify-between h-12">
        <div class="flex items-center space-x-2">
          <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
            <img :src="pool.imgtoken0" class="h-4" alt="">
          </div>
          <p class="text-xs text-oswapBlue-light">{{pool.name[0]}} Staked</p>
        </div>
        <p class="text-xl dark:text-gray-300">4503.2158</p>
      </div>
      <div class="flex flex-col justify-between h-12">
        <div class="flex items-center space-x-2">
          <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
            <img :src="pool.imgtoken1" class="h-4" alt="">
          </div>
          <p class="text-xs text-oswapBlue-light">{{pool.name[1]}} Staked</p>
        </div>
        <p class="text-xl dark:text-gray-300">1077.984</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PoolStatsInfo',
    props: {
      isOpen: Boolean,
      pool: Object
    }
  }
</script>