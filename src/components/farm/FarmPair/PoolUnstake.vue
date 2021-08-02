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
            <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :errorTop="'pt-10'">
              <p class="text-xs z-20 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{pool.pair}}</p>
            </InputWithValidation>
          </div>
          <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
            <div class="flex h-12 space-x-2">
              <div class="flex items-start h-full">
                <i class="las la-coins text-xl text-oswapGreen"></i>
              </div>
              <div class="flex flex-col h-full justify-between">
                <p class="text-xs text-oswapBlue-light">LP Tokens Staked</p>
                <p class="text-lg dark:text-gray-400">{{parseFloat(maxAmount).toFixed(6)}}</p>
              </div>
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
      <div class="flex justify-between items-center mb-0.5 h-9">
        <!-- back to Stats -->
        <div @click="setPool()" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pr-3 cursor-pointer">
          <i class="las la-arrow-left text-lg p-2 text-gray-200 dark:text-gray-500 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-oswapGreen border-2 border-gray-200 dark:border-gray-700"></i>
          <p class="text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
        </div>
        
        <div class="flex items-center w-28 h-full relative">
          <!-- Unstake Disabled -->
          <transition tag="div" name="approve-btn" class="inline-block absolute">
            <div v-if="buttonState == 'disabled'" class="flex w-28 h-9 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group-scope dark:bg-gray-700 bg-gray-200 select-none">
              <div class="flex flex-1 items-center justify-center">
                <p class="text-sm text-gray-300 dark:text-gray-600">Unstake</p>
              </div>
              <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
            </div>
          </transition>

          <!-- Unstake -->
          <transition tag="div" name="approve-btn" class="inline-block absolute">
            <div @click="unstake()" v-if="buttonState == 'active'" class="flex w-28 group-scope">
              <div class="grab-attention-glowing"></div>
              <div class="grab-attention cursor-pointer">
                <div class="flex flex-1 items-center justify-center">
                  <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Unstake</p>
                </div>
                <i class="las las la-download text-xl text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
              </div>
            </div>
          </transition> 

          <!-- Unstaking -->
          <transition tag="div" name="swap-btn" class="inline-block absolute">
            <div v-if="buttonState == 'executing'" class="flex w-28 group-scope">
              <div class="grab-attention-glowing"></div>
              <div class="grab-attention cursor-wait">
                <div class="flex flex-1 items-center justify-right">
                  <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Unstaking</p>
                </div>
                <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
              </div>
            </div>
          </transition>

          <!-- Unstaked -->
          <transition tag="div" name="approve-btn" class="inline-block absolute">
            <div v-if="buttonState == 'finished'" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
              <div class="flex flex-1 items-center justify-right">
                <p class="text-sm text-oswapGreen">Unstaked</p>
              </div>
              <i class="las la-check-circle text-xl text-oswapGreen"></i>
            </div> 
          </transition>
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
        errors: {},
        buttonState: 'disabled',
      }
    },
    mounted() {
      this.buttonState = 'executing'

      if ( this.maxAmount > 0 ) {
        this.buttonState = 'active'
      } else { 
        this.buttonState = 'disabled'
      }
    },
    methods: {
      unstake: async function() {
        this.buttonState = 'executing';
        await this.unstakeLP(this.pool, String(this.roundDown(this.amount, 14)));
        this.buttonState = 'finished';
      },
      setMax() {
        this.amount = String(this.maxAmount);
      },
      setPool() {
        // reset Input
        this.amount = ''
        // reset errors
        this.errors = {}
        this.$emit('setPool', 'stats')
      },
      roundDown: function(number, decimals) {
        decimals = decimals || 0;
        return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
      },
      inputAmount(value) {
        this.amount = value;
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (parseFloat(this.maxAmount) == 0) {
          this.errors['zeroStaked'] = 'Your don\'t have anything staked!';
        } else {
          delete this.errors['zeroStaked'];

          if (!value.match(/^\d*\.?\d*$/)) {
            this.errors['format'] = 'Invalid format! e.g: 12345.678';
          } else {
            delete this.errors['format'];
          }
          if (value == '') {
            this.errors['blank'] = 'Amount can\'t be blank';
          } else {
            delete this.errors['blank'];
          }
          if (parseFloat(value) > parseFloat(this.maxAmount)) {
            this.errors['exceed'] = 'Your input exceeds the amount you have staked!';
          } else {
            delete this.errors['exceed'];
          }
        }
      }
    }
  }
</script>