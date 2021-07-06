<template>
  <div class="flex items-center space-x-2">
    <img :src="this.getToken()[whichToken].imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center" alt="">            
    <div class="flex flex-1 items-center justify-between">
      <div class="flex flex-col">
        <p class="text-xs text-oswapGreen-dark">{{this.getToken()[whichToken].Symbol}}</p>
        <p class="text-xs">{{this.getToken()[whichToken].name}}</p>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-xs dark:text-oswapGreen-dark">Balance</p>
        <p class=" text-gray-600 dark:text-gray-300">{{balance}}</p>
        <div class="flex h-3">
          <p v-if="whichToken == 'token1'" class="text-xs text-oswapBlue-light"> - {{balanceOut}}</p>
          <p v-if="whichToken == 'token2'" class="text-xs text-oswapGreen"> {{balanceIn}}</p>
        </div>
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
          amount < balance ? this.balanceOut = (amount).toFixed(5) : this.balanceOut = '-'
        }
        
        if (this.whichToken == 'token2') {
          this.balanceIn = "+ " + this.amountOut
        }
      },
    }
  }
</script>