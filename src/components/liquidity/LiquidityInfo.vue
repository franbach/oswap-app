<template>
  <div class="flex flex-col space-y-2 p-3 dark:text-gray-300">
    <div class="flex flex-col space-y-1">
      <p class="text-xs">Pair Address:</p>
      <p class="text-xs">0x17c0396FbeBE7B011D9519F2B5D04215496d9653</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LiquidityInfo',
    methods: {
      ...mapGetters('exchange', ['getToken'])
    }
  }
</script>