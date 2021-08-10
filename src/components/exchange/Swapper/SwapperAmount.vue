<template>
  <div class="flex flex-col rounded-xl mt-3">
    <div class="flex items-center space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{this.getToken()['token1'].Symbol}}</p>
      </InputWithValidation>

      <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 xs:space-x-2">
        <i class="ss:hidden xs:block las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
    <div class="flex space-x-2 items-center pt-2">
      <div class="flex items-center space-x-1 px-1">
        <p class="text-xs dark:text-gray-300">1</p>
        <p class="text-xs text-oswapGreen">{{this.getToken()['token1'].Symbol}}</p>
        <p class="text-xs dark:text-gray-300">=</p>
        <p class="text-xs dark:text-gray-300">{{rate}}</p>
        <p class="text-xs text-oswapGreen">{{this.getToken()['token2'].Symbol}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import InputWithValidation from '@/components/InputWithValidation';
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperAmount',
    mixins: [openswap],
    components: {
      InputWithValidation
    },
    props: {
      balance: String
    },
    data() {
      return {
        amount: "1",
        rate: "0",
        errors: {}
      }
    },
    mounted: async function(){
      let pair = await this.getPair(this.getToken()['token1'], this.getToken()['token2'])
      this.rate = this.getRate(pair, this.getToken()['token1'] )
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),

      inputAmount(value){
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
          this.$emit("amount", value);
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.errors['blank']
          this.$emit("amount", value);
        }
        if (parseFloat(value) > parseFloat(this.getFormatedUnits(this.balance, this.getToken()['token2']))) {
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
          this.$emit("amount", value);
        }
      },

      setMax: async function(){
        this.amount = await this.getTokenBalance(this.getToken()['token1'])
        this.$emit("amount", this.amount);
      }
    }
  }
</script>