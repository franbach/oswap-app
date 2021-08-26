<template>
  <div class="flex flex-1 items-center">
    <!-- Left side -->
    <div class="flex flex-col space-y-1 w-1/3 min-w-0">
      <!-- Token img and name -->
      <div class="flex space-x-2 items-center h-10">
        <img :src="this.getToken()[whichToken].imgSrc" class="h-8 w-8 rounded-full flex items-center justify-center" alt="">
        <div class="flex flex-1 items-center min-w-0">
          <p class="text-sm text-el text-oswapGreen-dark">{{this.getToken()[whichToken].Symbol}}</p>
        </div>
      </div>
      <!-- Network name -->
      <div class="flex pl-1 space-x-2 h-4">
        <p class="text-xs text-el">{{this.getToken()[whichToken].name}}</p>
      </div>
    </div>
    <!-- Right side -->
    <div class="flex flex-col space-y-1 flex-1 w-2/3 min-w-0">
      <div class="flex h-10">
        <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-10">MAX</p>
        </InputWithValidation>
      </div>
      <div class="flex pl-2 space-x-2 h-4">
        <p class="text-xs flex-none dark:text-oswapGreen-dark">Balance :</p>
        <p class="text-xs text-el text-gray-600 dark:text-gray-300">{{parseFloat(balance).toFixed(8)}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import InputWithValidation from '@/components/InputWithValidation';
  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperToken',
    components: {
      InputWithValidation
    },
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
        balanceIn: "-",
        errors: {},
        amount: '0.0'
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