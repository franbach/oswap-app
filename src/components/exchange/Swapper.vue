<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex mb-3">
        <p class="text-sm dark:text-gray-400">Swap</p>
      </div>
      <div class="flex flex-col dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <SwapperToken whichToken="token1" :amount="this.amount" @balance="setBalance" />
          <SwapperToken whichToken="token2" :amount="this.amount" @balance="setBalance" />
        </div>
        <SwapperReserves />
      </div>
      <Warning :warnings="warnings" />
      <SwapperAmount @amount="setAmount" :balance="balance1" />
      <SwapperRate :key="amount" :amount="amount" />
      <SwapperButtons />
    </div>

  </div>
</template>

<script>
  import SwapperToken from '@/components/exchange/Swapper/SwapperToken'
  import SwapperReserves from '@/components/exchange/Swapper/SwapperReserves'
  import SwapperAmount from '@/components/exchange/Swapper/SwapperAmount'
  import SwapperRate from '@/components/exchange/Swapper/SwapperRate'
  import SwapperButtons from '@/components/exchange/Swapper/SwapperButtons'
  import Warning from '@/components/exchange/Warning'

  export default {
    name: 'Swapper',
    components: {
      SwapperToken,
      SwapperReserves,
      SwapperAmount,
      SwapperRate,
      SwapperButtons,
      Warning
    },
    data() {
      return {
        amount: 0.0,
        balance1: 0.0,
        balance2: 0.0,
        warnings: {}
      }
    },
    methods: {
      setAmount(value) {
        this.amount = value;

        // just for testing purposes
        if (value == '007') { 
          this.warnings['impact'] = 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        } else { delete this.warnings['impact'] }
      },

      setBalance(value) {
        if (value.token == 'token1') { this.balance1 = value.balance } 
        if (value.token == 'token2') { this.balance2 = value.balance }
      }
    }
  }
</script>