<template>
  <div class="flex flex-col space-y-2 pt-2 pb-3 px-3">
    <p class="text-sm dark:text-gray-300">Reserves</p>
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
        <p class="text-xs dark:text-gray-300">54,648.421</p>
      </div>
      <div class="flex items-center space-x-2">
        <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
        <p class="text-xs dark:text-gray-300">54,648.421</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperReserves',
    computed: {
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
    }
  }
</script>