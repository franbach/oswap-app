<template>
  <div v-if="isOpen" class="flex ml-2 justify-between">
    <div class="flex h-12 space-x-2">
      <!-- Earned Info -->
      <div class="flex flex-col justify-between">
        <div class="flex space-x-2 items-center">
          <i class="las la-hand-holding-usd text-oswapGreen"></i>
          <p class="text-xs font-extralight text-oswapBlue-light">Earned</p>
        </div>
        <p class="text-xl font-extralight dark:text-gray-400">{{parseFloat(pending).toFixed(5)}}</p>
      </div>
      <!-- Liquidity Info -->
      <div class="flex flex-col justify-between">
        <div class="flex space-x-2 items-center">
          <i class="las la-tint text-oswapGreen"></i>
          <p class="text-xs font-extralight text-oswapBlue-light">Liquidity</p>
        </div>
        <p class="text-sm font-extralight pl-1 dark:text-gray-400">$ 3,663,455.23</p>
      </div>
    </div>
    <!-- Open Details Button -->
    <div class="flex h-12 items-end">
      <div @click="this.$emit('setPool', 'open')" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">details</p>
        <i class="las la-arrow-down text-lg p-2 text-gray-200 dark:text-gray-500 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-oswapGreen border-2 border-gray-200 dark:border-gray-700"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PoolStatsClosed',
    props: {
      isOpen: Boolean,
      pending: Number
    }
  }
</script>