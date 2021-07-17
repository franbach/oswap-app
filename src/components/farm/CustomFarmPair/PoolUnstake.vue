<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col justify-between h-full w-full absolute">
      <div class="flex flex-col space-y-2">
        <div class="flex items-center space-x-2 mx-2">
          <i class="las la-hand-holding-usd text-xl text-oswapGreen"></i>
          <p class="text-sm dark:text-gray-300">Withdraw your LP Tokens</p>
        </div>
        <div class="flex flex-col dark:bg-gray-700 bg-gray-200 rounded-2xl">
          <div class="flex flex-1 shadow-lg rounded-2xl">
            <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount">
              <p class="text-xs z-20 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{pool.pair}}</p>
            </InputWithValidation>
          </div>
          <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
            <div class="flex flex-col justify-between h-12">
              <div class="flex items-center space-x-2">
                <i class="las la-coins text-xl text-oswapGreen"></i>
                <p class="text-xs text-oswapBlue-light">LP Tokens Staked</p>
              </div>
              <p class="text-xl dark:text-gray-300">{{parseFloat(maxAmount).toFixed(6)}}</p>
            </div>
            <div class="flex items-center justify-end">
              <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 space-x-2">
                <i class="las la-wallet text-xl"></i>
                <p class="">MAX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-end h-12 justify-between">
        <!-- back to Stats -->
        <div @click="this.$emit('setPool', 'stats')" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pr-3 cursor-pointer">
          <i class="las la-arrow-left text-lg p-2 text-gray-200 dark:text-gray-500 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-oswapGreen border-2 border-gray-200 dark:border-gray-700"></i>
          <p class="text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
        </div>
        <!-- Continue Button -->
        <div class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <p @click="unstakeLP(this.pool, String(roundDown(this.amount, 14)))" class="text-sm text-gray-200 dark:text-gray-700">Unstake !</p>
          <i class="las la-sign-out-alt text-2xl text-gray-200 dark:text-gray-700"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import InputWithValidation from "@/components/InputWithValidation"
  import openswap from "@/shared/openswap.js";

  export default {
    name: 'PoolUnstake',
    mixins: [openswap],
    components: {
      InputWithValidation,
    },
    props: {
      pool: Object,
      isOpen: Boolean,
      maxAmount: Number
    },
    data() {
      return {
        amount: '',
        errors: {}
      }
    },
    methods: {
      setMax() {
        this.amount = String(this.maxAmount);
      },
      roundDown: function(number, decimals) {
          decimals = decimals || 0;
          return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
      },
      inputAmount(value){
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
          this.amount = value
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.errors['blank']
          this.amount = value
        }
        if (parseFloat(value) > parseFloat(this.balance)) {
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
          this.amount = value
        }
      },
    }
  }
</script>