<template>
  <div class="grid grid-cols-2 gap-2 min-w-0 py-2 text-gray-500 dark:text-gray-300 px-3">
    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Rate</p>
      <p class="text-el">{{cRate}}</p>
    </div>

    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Price Impact</p>
      <p class="text-el">{{pImpact}}%</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SwapperRateInpact',
    data() {
      return {
        cRate: 0.0,
        pImpact: 0.0
      }
    },
  }
</script>