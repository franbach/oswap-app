<template>
  <div :class="token(whichToken) ? 'border border-oswapGreen' : 'border border-black border-opacity-10'" class="flex h-24 z-10 px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-oswapDark-gray st5 cursor-pointer overflow-hidden">
    <!-- if nothing is selected yet -->
    <div v-if="!token(whichToken)" class="flex flex-1 items-center space-x-2 justify-center h-full">
      <p class="dark:text-gray-300">Select Token</p>
      <i class="las la-angle-down dark:text-gray-400"></i>
    </div>
    
    <!-- if token selected -->
    <div v-else class="flex flex-1 items-center animate__animated animate__fadeInLeft animate__faster">
      <div class="flex items-center">
        <img :src="this.getToken()[whichToken].imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center  m-3" alt="">            
      </div>
      <div class="flex flex-1 flex-col items-start justify-center">
        <p class="dark:text-gray-300">{{this.getToken()[whichToken].Symbol}}</p>
        <p class="text-gray-400">{{this.getToken()[whichToken].name}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {
    name: 'TokenSelect',
    props: {
      whichToken: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),

      // Helper
      // It Checks if token1 and or token2 have been already stored.
      token(tokenA, tokenB) {
        if (tokenA && tokenB) {
          return this.getToken()[tokenA] && this.getToken()[tokenB] ? true : false
        } else {
          return this.getToken()[tokenA] ? true : false
        }
      },
    }
  }
</script>