<template>
  <div class="flex flex-col flex-1 space-y-3">
    <div class="flex flex-1 space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-10">{{token0.Symbol}}/{{token1.Symbol}}</p>
      </InputWithValidation>
      <div class="flex flex-1 items-center justify-end group-scope">
        <div @click="setMax()" class="flex h-10 items-center group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer px-3 rounded-xl ss:space-x-0 xs:space-x-2">
          <i class="las la-wallet ss:hidden xs:block text-xl dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100"></i>
          <p class="dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
        </div>
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
        if (parseFloat(value) > parseFloat(this.getFormatedUnitsDecimals(balance, 18))) {
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