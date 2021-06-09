<template>
  <div class="flex flex-col p-4 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="flex mb-3">
      <p class="text-sm dark:text-gray-400">Swap</p>
    </div>
    <div class="flex flex-col dark:bg-gray-600 bg-gray-100 rounded-2xl">
      <div class="flex shadow-lg flex-col space-y-3 dark:bg-oswapDark-gray p-3 rounded-2xl">
        <SwapperToken whichToken="token1" />
        <SwapperToken whichToken="token2" />
      </div>
      <SwapperReserves/>
    </div>
    <SwapperAmount @amount="setAmount" />
    <SwapperRate :key="amount" :amount="amount"/>
    <SwapperButtons />
  </div>
</template>

<script>
  import SwapperToken from '@/components/exchange/Swapper/SwapperToken'
  import SwapperReserves from '@/components/exchange/Swapper/SwapperReserves'
  import SwapperAmount from '@/components/exchange/Swapper/SwapperAmount'
  import SwapperRate from '@/components/exchange/Swapper/SwapperRate'
  import SwapperButtons from '@/components/exchange/Swapper/SwapperButtons'
  
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Swapper',
    components: {
      SwapperToken,
      SwapperReserves,
      SwapperAmount,
      SwapperRate,
      SwapperButtons
    },
    mounted: function() {

    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
      setAmount(value) {
      this.amount = value; 
    },
    },
    data() {
      return {
        amount: null,
      }
    }
  }
</script>