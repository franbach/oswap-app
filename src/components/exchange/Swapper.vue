<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex mb-3">
        <p class="text-sm dark:text-gray-400">Swap</p>
      </div>
      <div class="flex flex-col dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <SwapperToken whichToken="token1" @balance="setBalance" :amount="this.amount" />
          <SwapperToken whichToken="token2" />
        </div>
        <SwapperReserves/>
      </div>
      <SwapperAmount @amount="setAmount" :balance="balance" />
      <SwapperRate :key="amount" :amount="amount"/>
      <SwapperButtons />
    </div>

    <div v-if="warning" class="flex w-96">
      <Warning />
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
  import { mapGetters, mapActions } from 'vuex';

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
        amount: null,
        balance: null,
        warning: false
      }
    },
    mounted: function() {},
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
      
      setAmount(value) {
        this.amount = value; 
      },
      setBalance(value) {
        this.balance = value
      }
    }
  }
</script>