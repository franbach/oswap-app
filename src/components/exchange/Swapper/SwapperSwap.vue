<template>
  <!-- Swap disabled -->
  <transition tag="div" name="swap-btn" class="inline-block absolute right-0">
    <div v-if="getBtnState == 'disabled'" class="flex items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <p class="text-sm text-gray-300 dark:text-gray-600">Swap</p>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Swap -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-0">
    <div @click="parseAndExecuteSwap" v-if="getBtnState == 'swap'" class="flex items-center group border border-oswapGreen-dark dark:hover:bg-oswapGreen hover:bg-oswapGreen space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-pointer">
      <p class="text-sm text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Swap</p>
      <i class="las la-random text-xl text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
    </div>
  </transition>

  <!-- Swapping -->
  <transition tag="div" name="swap-btn" class="inline-block absolute right-0">
    <div v-if="getBtnState == 'swapping'" class="flex items-center border border-oswapGreen-dark space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-wait">
      <p class="text-sm text-oswapGreen-dark">Swapping</p>
      <i class="las la-sync text-xl animate-spin text-oswapGreen-dark"></i>
    </div>
  </transition>

  <!-- Swapped-->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-0">
    <div v-if="getBtnState == 'swapped'" class="flex items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <p class="text-sm text-oswapGreen">Swapped</p>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'SwapperApprove',
    mixins: [openswap],
    props: {
      state: String,
      amount: String,
      amountOut: String,
      slippageRate: String,
      path: Array,
    },
    data() {
      return {
        btnState: this.state
      }
    },
    computed: {
      getBtnState() {
        // If input is empty set btn state to disabled
        if (this.amount === '') {
          return 'disabled'
        } else {
          return this.state
        }
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      
      parseAndExecuteSwap: async function() { 
        let token0 = await this.getToken()['token1']
        let token1 = await this.getToken()['token2']
        this.btnState = 'swapping';

        if(token0.oneZeroxAddress != this.WONE() && token1.oneZeroxAddress != this.WONE()){
          await this.swapExactTokensForTokens(this.amount, this.amountOut, this.path, token0, token1)
          this.btnState = 'swapped';
          return;
        }
        if(token0.oneZeroxAddress == this.WONE()){
          await this.swapETHForExactTokens(this.amount, this.amountOut, this.path, token1);
          this.btnState = 'swapped';
          return;
        }
        if(token1.oneZeroxAddress == this.WONE()){
          await this.swapTokensForExactETH(this.amount, this.amountOut, this.path, token0);
          this.btnState = 'swapped';
          return;
        }
      }

    }
  }
</script>