<template>
  <div class="flex flex-col flex-1 space-y-3">
    <div class="flex flex-1 space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{token0.Symbol}}/{{token1.Symbol}}</p>
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
  import { mapGetters, mapActions } from 'vuex';
   import openswap from "@/shared/openswap.js";

  export default {
    name: 'LiquidityAmount',
    mixins: [openswap],
    components: {
      InputWithValidation
    },
    props: {
      token0: Object,
      token1: Object,
      balances: Object

      },
    data() {
      return {
        amount: '1.0',
        pair: null,
        errors: {},
        i: 0
      }
    },
    mounted: async function() {
      this.pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('liquidity/buttons', ['setBtnState']),
      ...mapActions('liquidity/amounts', ['setToken0Amount']),
      inputAmount: async function(value){
        this.amount = value;
        var balance = this.balances.lpToken

        this.setToken0Amount(value);

        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.errors['blank']
        }
        if (parseFloat(value) > parseFloat(balance)) {
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
        }
        
      },
      setMax() {
        this.inputAmount(this.balances.lpToken)
      }
    }
  }
</script>