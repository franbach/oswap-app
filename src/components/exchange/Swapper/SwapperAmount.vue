<template>
  <div class="flex flex-col mt-3 rounded-xl">
    <div class="flex items-center space-x-3">
      <div class="relative flex flex-1 items-center rounded-xl focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen dark:text-gray-500 text-gray-400">
        <input type="text" v-model="amount" :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none' : 'ring-black ring-opacity-5 focus:ring-oswapGreen ring-1 focus:outline-none'" class="flex flex-1 z-30 bg-gray-100 rounded-xl py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount...">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{this.getToken()['token1'].Symbol}}</p>
        <!-- input validation -->
        <div v-if="this.invalidInput" class="flex z-20 w-full pt-10 absolute top-0 left-0 bg-red-400 rounded-xl animate__animated animate__fadeIn">
          <p class="text-xs m-2 mx-3 text-gray-50">Invalid format! e.g: 12345.67</p>
        </div>
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
    props: {
      balance: String
    },
    data() {
      return {
        amount: "1",
        rate: "0",
        invalidInput: false
      }
    },
    mounted: async function(){
      let pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
      this.rate = pair.token0Price.toFixed(5);
    },
    watch: {
      amount(value) {
        this.amount = value
        this.inputChange(value)
      }
    },
    computed: {
      ...mapGetters('exchange', ['findToken'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),

      inputChange(value){
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.invalidInput = true
        } else { 
          this.invalidInput = false
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