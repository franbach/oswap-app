<template>
  <div class="flex items-center space-x-2">
    <img :src="this.getToken()[whichToken].imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center" alt="">            
    <div class="flex flex-1 items-center justify-between">
      <div class="flex flex-col">
        <p class="text-xs text-oswapGreen-dark">{{this.getToken()[whichToken].Symbol}}</p>
        <p class="text-xs">{{this.getToken()[whichToken].name}}</p>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex items-center space-x-2">
          <!--
          <p v-if="whichToken == 'token1'" class="text-red-400 text-xs">- 100</p>
          <p v-if="whichToken == 'token2'" class="text-oswapGreen text-xs">+ 297</p>
          -->
          <p class="text-xs dark:text-oswapGreen-dark">Available</p>
        </div>
        <p class=" text-gray-600 dark:text-gray-400">{{balance}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import openswap from "../../../shared/openswap.js";
  export default {
    name: 'SwapperToken',
    props: {
      amount: String,
      whichToken: String
    },
    mixins: [openswap],
    mounted: async function() {
      this.balance = await this.getTokenBalance(this.getToken()[this.whichToken])
      this.$emit('balance', this.balance)
    },
    data() {
      return {
        balance: 0.0
      }
    },
    computed: {
      subtract() {
      },
      sum() {
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
    }
  }
</script>