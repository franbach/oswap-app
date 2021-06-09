<template>
  <div class="flex items-center space-x-2">
    <img :src="this.getToken()[whichToken].imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center" alt="">            
    <div class="flex flex-1 items-center justify-between">
      <div class="flex flex-col">
        <p class="text-xs text-oswapGreen-dark">{{this.getToken()[whichToken].Symbol}}</p>
        <p class="text-xs">{{this.getToken()[whichToken].name}}</p>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-xs dark:text-oswapGreen-dark">Available</p>
        <p class=" text-gray-600 dark:text-gray-400">250</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperToken',
    props: {
      whichToken: String
    },
    computed: {
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
    }
  }
</script>