<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col justify-between h-full w-full absolute">
      <div class="flex flex-col space-y-2">
        <div class="flex items-center space-x-2 mx-2">
          <i class="las la-donate text-xl text-oswapGreen"></i>
          <p class="text-sm dark:text-gray-300">Deposit your LP Tokens</p>
        </div>
        <div class="flex flex-col dark:bg-gray-700 bg-gray-200 rounded-2xl">
          <div class="flex flex-1 shadow-lg rounded-2xl">
            <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :errorTop="'pt-10'">
              <p class="text-xs z-20 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{pool.token}}</p>
            </InputWithValidation>
          </div>
          <div class="grid grid-cols-3 gap-3 pt-3 pb-3 px-3">
            <div class="flex col-span-2 h-12 space-x-2">
              <div class="flex items-start h-full">
                <i class="las la-coins text-xl text-oswapGreen"></i>
              </div>
              <div class="flex flex-col h-full justify-between">
                <p class="text-xs text-oswapBlue-light">LP Tokens Available</p>
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
        <div @click="setPool()" class="flex h-9 items-center space-x-2 md:space-x-0 xl:space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pr-3 md:pr-0 xl:pr-3 cursor-pointer">
          <i class="las la-arrow-left text-lg p-2 text-gray-200 dark:text-gray-500 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-oswapGreen border-2 border-gray-200 dark:border-gray-700"></i>
          <p class="block md:hidden xl:block text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="flex items-center w-28 h-full relative">
            <farmApprove :key="amount" :amount="this.amount" :pool="pool" @tellStake="setStakeState" />
          </div>
          <div class="flex items-center w-28 h-full relative">
            <farmStake :key="amount" :amount="this.amount" :pool="pool" :btnState="btnStake" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import InputWithValidation from "@/components/InputWithValidation"
  import farmStake from "@/components/farm/FarmPair/farmStake"
  import farmApprove from "@/components/farm/FarmPair/farmApprove"
  export default {
    name: 'PoolStake',
    components: {
      InputWithValidation,
      farmApprove,
      farmStake
    },
    props: {
      pool: Object,
      isOpen: Boolean,
      maxAmount: Number
    },
    data() {
      return {
        amount: '0.1',
        errors: {},
        btnStake: 'disabled'
      }
    },
    methods: {
      setMax() {
        this.amount = String(this.maxAmount);
      },
      setPool() {
        // reset Input
        this.amount = '0.1'
        // reset errors
        this.errors = {}
        this.$emit('setPool', 'stats')
      },
      inputAmount(value) {
        this.amount = value;
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
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
          this.errors['exceed'] = 'Your input exceeds the amount you have available!';
        } else {
          delete this.errors['exceed'];
        }
      },
      setStakeState(value) {
        this.btnStake = value
      }
    }
  }
</script>