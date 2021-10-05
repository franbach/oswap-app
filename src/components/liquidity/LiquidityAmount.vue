<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-1 items-center space-x-3 mb-3 z-30">
      <InputWithValidationLiquidity @click="setInputClicked('1')" :input="amount0" :errors="error0" @catchInput="inputAmount0" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <div class="flex items-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl h-10">
          <p class="px-3">{{token0.Symbol}}</p>

          <div v-if="pair" class="flex flex-1 st5-all items-center justify-end group-scope">
            <div @click="setMax0()" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
              <p class="text-sm dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </div>
      </InputWithValidationLiquidity>
    </div>

    <div class="flex flex-1 items-center space-x-3 z-20">
      <InputWithValidationLiquidity @click="setInputClicked('2')" :input="amount1" :errors="error1" @catchInput="inputAmount1" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <div class="flex items-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl h-10">
          <p class="px-3">{{token1.Symbol}}</p>

          <div v-if="pair" class="flex flex-1 st5-all items-center justify-end group-scope">
            <div @click="setMax1()" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
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
      balances: Object,
      createNewPair: Boolean
      },
    data() {
      return {
        amount0: '1.0',
        amount1: '0.0',
        clickedInput: null,
        pair: null,
        error0: {},
        error1: {},
      }
    },
    mounted: async function() {
      if (!this.createNewPair) {
        this.pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
        this.amount1 = await this.getToken1Amount();
      }      
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('liquidity/buttons', ['setBtnState']),
      ...mapActions('liquidity/amounts', ['setToken0Amount','setToken1Amount']),

      getToken1Amount: async function(){
        var amountOut = await this.getAmountsLiquidity(this.pair, this.token0, this.token1, this.amount0)
        return amountOut;
      },
      getToken0Amount: async function(){
        var amountOut = await this.getAmountsLiquidity(this.pair, this.token1, this.token0, this.amount1)
        return amountOut;
      },
      setInputClicked: function(value){
        this.clickedInput = value
      },
      setMax0: async function() {
        this.clickedInput = '1'
        this.inputAmount0(String(this.balances.token0))
      },
      setMax1: async function() {
        this.clickedInput = '2'
        this.inputAmount1(String(this.balances.token1))
      },
      inputAmount0: async function(value) {
        if (this.clickedInput == '1') {
          if (!this.createNewPair) {
            this.amount0 = value;
            this.formatError0Input(value);
            await this.input1()
              this.balanceError0Input(this.balances.token0)
              this.balanceError1Input(this.balances.token1)
            
            this.setToken0Amount(value);
            this.setToken1Amount(this.amount1);
          } else {
            this.amount0 = value;
            this.setToken0Amount(value)
          }
        }
      },
      input0: async function() {
        let input = await Promise.resolve(this.getToken0Amount());
        this.amount0 = input
        return input;
      },
      balanceError0Input(balance) {
        if (parseFloat(this.amount0) > parseFloat(balance)) {
          this.error0['exceed'] = 'Your input exceeds the amount available in your balance !';
        } else {
          delete this.error0['exceed'];
        }
      },
      formatError0Input(value) {
        if (!value.match(/^\d*\.?\d*$/)) {
          this.error0['format'] = 'Invalid format ! e.g: 12345.678';
        } else {
          delete this.error0['format'];
        }
        if (value == '') {
          this.error0['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.error0['blank']
        }
      },
      inputAmount1: async function(value) {
        if (this.clickedInput == '2') {
          if (!this.createNewPair) {
            this.amount1 = value;
            this.formatError1Input(value);
            await this.input0()
              this.balanceError1Input(this.balances.token1) 
              this.balanceError0Input(this.balances.token0)
         
            this.setToken1Amount(value);
            this.setToken0Amount(this.amount0);
          } else {
            this.amount1 = value;
            this.setToken1Amount(value);
          }
        }
      },
      input1: async function() {
        let input = await Promise.resolve(this.getToken1Amount());
        this.amount1 = input
        return input;
      },
      balanceError1Input(balance) {
        if (parseFloat(this.amount1) > parseFloat(balance)) {
          this.error1['exceed'] = 'Your input exceeds the amount available in your balance !';
        } else {
          delete this.error1['exceed'];
        }
      },
      formatError1Input(value) {
        if (!value.match(/^\d*\.?\d*$/)) {
          this.error1['format'] = 'Invalid format ! e.g: 12345.678';
        } else {
          delete this.error1['format'];
        }
        if (value == '') {
          this.error1['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.error1['blank']
        }
      },
    }
  }
</script>