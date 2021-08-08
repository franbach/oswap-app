<template>
  <div class="flex flex-1 flex-col space-y-3">
    <div class="flex flex-1 items-center space-x-3">
      <InputWithValidation @click="setInputClicked('1')" :input="amount0" :errors="error0" @catchInput="inputAmount0" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{token0.Symbol}}</p>
      </InputWithValidation>
      <div v-if="pair" @click="setMax0()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 xs:space-x-2">
        <i class="ss:hidden xs:block las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <InputWithValidation @click="setInputClicked('2')" :input="amount1" :errors="error1" @catchInput="inputAmount1" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{token1.Symbol}}</p>
      </InputWithValidation>
      <div v-if="pair" @click="setMax1()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 xs:space-x-2">
        <i class="ss:hidden xs:block las la-wallet"></i>
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
      if(!this.createNewPair){
          this.pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
          this.amount1 =  await this.getToken1Amount();
      }      
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('liquidity/buttons', ['setBtnState']),
      ...mapActions('liquidity/amounts', ['setToken0Amount','setToken1Amount']),
      getToken1Amount: async function(){
        var amountOut = await this.getAmountsLiquidity(this.pair, this.token0, this.amount0)
        return amountOut;
      },
      getToken0Amount: async function(){
        var amountOut = await this.getAmountsLiquidity(this.pair, this.token1, this.amount1)
        return amountOut;
      },

      inputAmount0: async function(value){
        if(this.clickedInput == '1'){
          if(!this.createNewPair){
            this.amount0 = value;
            this.amount1 =  await this.getToken1Amount();
            this.manageError0Input(value, this.balances.token0)   
            this.manageError1Input(value, this.balances.token1)
            this.setToken0Amount(value);
            this.setToken1Amount(this.amount1);
          }else{
            this.amount0 = value;
            this.setToken0Amount(value)
          }
        
        }
      },
      inputAmount1:async function(value){
        if(this.clickedInput == '2'){
          if(!this.createNewPair){
            this.amount1 = value;
            this.amount0 =  await this.getToken0Amount();
            this.manageError1Input(value, this.balances.token1) 
            this.manageError0Input(value, this.balances.token0)
            this.setToken1Amount(value);
            this.setToken0Amount(this.amount0);
          }else{
              this.amount1 = value;
              this.setToken1Amount(value);
          }
        
        }
          
          
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
      manageError0Input(value,balance){
        if (!value.match(/^\d*\.?\d*$/)) {
          this.error0['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.error0['format'];
        }
        if (value == '') {
          this.error0['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.error0['blank']
        }
        if (parseFloat(value) > parseFloat(balance)) {
          this.error0['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.error0['exceed'];
        }
      },
      manageError1Input(value,balance){
        if (!value.match(/^\d*\.?\d*$/)) {
          this.error1['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.error1['format'];
        }
        if (value == '') {
          this.error1['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.error1['blank']
        }
        if (parseFloat(value) > parseFloat(balance)) {
          this.error1['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.error1['exceed'];
        }
      }
    }
  }
</script>