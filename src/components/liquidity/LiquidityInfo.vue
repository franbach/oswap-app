<template>
  <div class="flex flex-col space-y-2 px-3 py-4 dark:text-gray-300">
    <div class="flex flex-col space-y-1">
      <p class="text-xs">Pair Address:</p>
      <p class="text-xs break-all">{{pairAddress}}</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LiquidityInfo',
    methods: {
      ...mapGetters('exchange', ['getToken'])
    },
    props: {
     pairAddress: String
    },
  }
</script>