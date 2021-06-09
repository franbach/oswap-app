<template>
  <div class="flex flex-col space-y-2 px-1 mt-3">
    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Median Rate</p>
      <p>0</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Current Rate</p>
      <p>0.70460689</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Slippage Rate</p>
      <div class="flex items-center space-x-2">
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.1%</p>
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.3%</p>
        <p class="dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">0.5%</p>
      </div>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Next Rate</p>
      <p>0.70460689</p>
    </div>

    <div class="flex items-center justify-between dark:text-gray-400 text-xs">
      <p>Price Impact</p>
      <p>0.30%</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperRate',
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
    }
  }
</script>