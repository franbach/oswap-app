<template>
  <div class="flex flex-col flex-1 space-y-3">
    <div class="flex flex-1 space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{this.getToken()['token1'].Symbol}}</p>
      </InputWithValidation>
      <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 space-x-2">
        <i class="las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithValidation from '@/components/InputWithValidation';
  import { mapGetters } from 'vuex';

  export default {
    name: 'LiquidityAmount',
    components: {
      InputWithValidation
    },
    data() {
      return {
        amount: '0.0',
        errors: {}
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),

      setMax() {}
    }
  }
</script>