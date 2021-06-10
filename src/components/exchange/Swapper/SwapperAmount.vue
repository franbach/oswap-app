<template>
  <div class="flex flex-col mt-3 rounded-xl">
    <div class="flex items-center space-x-3">
      <div class="relative flex flex-1 items-center">
        <input type="text" v-model="amount" @input="inputChange()" class="flex flex-1 ring-1 bg-gray-100 focus:outline-none text-oswapGreen focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount...">
        <p class="text-xs right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2 text-oswapGreen-dark">{{this.getToken()['token1'].Symbol}}</p>
      </div>
      <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 space-x-2">
        <i class="las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
    <div class="flex items-center space-x-1 px-1 pt-2">
      <p class="text-xs dark:text-gray-300">1</p>
      <p class="text-xs text-oswapGreen">{{this.getToken()['token1'].Symbol}}</p>
      <p class="text-xs dark:text-gray-300">=</p>
      <p class="text-xs dark:text-gray-300">{{rate}}</p>
      <p class="text-xs text-oswapGreen">{{this.getToken()['token2'].Symbol}}</p>
    </div>
  </div>
</template>

<script>
  import { toastMe } from '@/components/toaster/toaster.js'
  import { mapGetters, mapActions } from 'vuex';
  import openswap from "../../../shared/openswap.js";
  export default {
    name: 'SwapperAmount',
    mixins: [openswap],
    components: {},
    data() {
      return {
        amount: "1",
        rate: "0"
      }
    },
    mounted: async function (){
      let pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
      this.rate = pair.token0Price.toFixed(5);
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),

      inputChange: function(){
        // parseFloat seems to behave like this regex rule.
        if (!this.amount.match(/^\d*\.?\d*$/)) {
          toastMe('warning', {
            title: 'Invalid input',
            msg: 'Please insert a valid amount. e.g.: 12345.67'
          });
          this.amount = ''
        } else {
          // If theres nothing wrong with the input then emit the amount!
          this.$emit("amount", this.amount);
        }
      },

      setMax: async function(){
        this.amount = await this.getTokenBalance(this.getToken()['token1'])
        this.$emit("amount", this.amount);
      }
    }
  }


</script>