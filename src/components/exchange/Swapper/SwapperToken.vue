<template>
  <div class="flex items-center space-x-2">
    <img :src="this.getToken()[whichToken].imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center" alt="">            
    <div class="flex flex-1 items-center justify-between">
      <div class="flex w-1/2 flex-col">
        <p class="text-xs text-oswapGreen-dark">{{this.getToken()[whichToken].Symbol}}</p>
        <p class="text-xs">{{this.getToken()[whichToken].name}}</p>
      </div>
      <div class="flex flex-col w-1/2 min-w-0">
        <p class="text-xs text-right dark:text-oswapGreen-dark">Balance</p>
        <p class="text-sm text-right text-el text-gray-600 dark:text-gray-300">{{balance}}</p>

        <p v-if="whichToken == 'token1'" class="text-xs text-right text-el text-oswapBlue-light"> - {{balanceOut}}</p>
        <p v-if="whichToken == 'token2'" class="text-xs text-right text-el text-oswapGreen"> {{balanceIn}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperToken',
    props: {
      amount: String,
      amountOut: String,
      whichToken: String
    },
    mixins: [openswap],
    mounted: async function() {
      this.balance = await this.getTokenBalance(this.getToken()[this.whichToken])
      this.balanceInOut(this.amount)
      this.$emit('balance', { token: [this.whichToken], balance: this.balance })
    },
    data() {
      return {
        balance: 0.0,
        balanceOut: "-",
        balanceIn: "-"
      }
    },
    
    methods: {
      ...mapGetters('exchange', ['getToken']),

      balanceInOut(value) {
        let balance = parseFloat(this.balance)
        let amount = parseFloat(value)

        if (this.whichToken == 'token1') {
          amount < balance ? this.balanceOut = (amount).toFixed(8) : this.balanceOut = '-'
        }
        
        if (this.whichToken == 'token2') {
          this.balanceIn = "+ " + this.amountOut
        }
      },
    }
  }
</script>