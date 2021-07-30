<template>
<div class="flex flex-1 flex-col space-y-2">
  <div class="flex items-center space-x-2">
    <ul class="flex -space-x-4">
      <li>
        <img :src="this.getToken()['token1'].imgSrc" class="h-20 w-20 object-cover rounded-full p-1 border-8 border-gray-100 dark:border-oswapDark-gray bg-slightGray" alt="">
      </li>
      <li>
        <img :src="this.getToken()['token2'].imgSrc" class="h-20 w-20 object-cover rounded-full p-1 border-8 border-gray-100 dark:border-oswapDark-gray bg-slightGray" alt="">
      </li>
    </ul>
    <div class="flex flex-1 flex-col">
      <div class="flex items-center space-x-2 dark:text-gray-300">
        <p class="text-xs">{{this.getToken()['token1'].Symbol}}</p>
        <p class="text-lg text-oswapGreen">/</p>
        <p class="text-xs">{{this.getToken()['token2'].Symbol}}</p>
      </div>
      <div class="flex flex-1 space-x-2 dark:text-gray-300">
        <p class="text-xs">Available:</p>
        <p class="text-xs">{{parseFloat(available).toFixed(8)}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LiquidityPair',
    methods: {
      ...mapGetters('exchange', ['getToken']),
    },
    props: {
     available: Number
    },
  }
</script>