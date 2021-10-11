<template>
  <div class="flex flex-col flex-1 space-y-3">
    <div class="flex flex-1 space-x-3">
      <InputWithValidationLiquidity :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <div class="flex items-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl h-10">
          <p class="px-3">{{token0.Symbol}}/{{token1.Symbol}}</p>

          <div v-if="pair" class="flex flex-1 st5-all items-center justify-end group-scope">
            <div @click="setMax()" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
              <p class="text-sm dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </div>
      </InputWithValidationLiquidity>
    </div>
  </div>
</template>

<script>
  import InputWithValidationLiquidity from '@/components/InputWithValidationLiquidity';
  import { mapGetters, mapActions } from 'vuex';
   import openswap from "@/shared/openswap.js";

  export default {
    name: 'LiquidityAmount',
    mixins: [openswap],
    components: {
      InputWithValidationLiquidity
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