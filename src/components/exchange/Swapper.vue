<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex mb-3">
        <p class="text-sm dark:text-gray-400">Swap</p>
      </div>
      <div class="flex flex-col dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <SwapperToken :key="amountOut" whichToken="token1" :amount="this.amount" :amountOut="amountOut" @balance="setBalance" />
          <SwapperToken :key="amountOut" whichToken="token2" :amount="this.amount" :amountOut="amountOut" @balance="setBalance" />
        </div>
        <SwapperReserves />
      </div>
      <Warning :warnings="warnings" />
      <SwapperAmount @amount="setAmount" :balance="balance1" />
      <SwapperRate :key="amount" :amount="amount" @amountOut="setAmountOut" @priceImpact="setPriceImpact" />
      <div class="flex pt-6">
        <div class="flex flex-1 items-center relative">
          <SwapperApprove :key="amount" :amount="amount" />
        </div>
      </div>
      <div class="flex pt-3">
        <div class="flex flex-1 items-center relative">
          <SwapperBackButton />
          
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import SwapperToken from '@/components/exchange/Swapper/SwapperToken'
  import SwapperReserves from '@/components/exchange/Swapper/SwapperReserves'
  import SwapperAmount from '@/components/exchange/Swapper/SwapperAmount'
  import SwapperRate from '@/components/exchange/Swapper/SwapperRate'
  import SwapperBackButton from '@/components/exchange/Swapper/SwapperBackButton'
  import SwapperApprove from '@/components/exchange/Swapper/SwapperApprove'
  import Warning from '@/components/exchange/Warning'

  export default {
    name: 'Swapper',
    components: {
      SwapperToken,
      SwapperReserves,
      SwapperAmount,
      SwapperRate,
      SwapperBackButton,
      SwapperApprove,
      Warning
    },
    data() {
      return {
        amount: '1',
        amountOut: 0.0,
        priceImpact:0.0,
        balance1: 0.0,
        balance2: 0.0,
        warnings: {},
        approveState: 'disabled'
      }
    },
    methods: {
      setAmountOut(value){
        this.amountOut = value;
      },
      setPriceImpact(value){
        this.priceImpact = value;
        if (this.priceImpact > 3) { 
          this.warnings['impact'] = 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        } else { delete this.warnings['impact'] }
      },
      setAmount(value) {
        this.amount = value;
        

        // just for testing purposes
        if (value == '') {
          this.approveState = 'disabled'
        }
        if (value == '1') {
          this.approveState = 'loading'
        }
        if (value == '12') {
          this.approveState = 'active'
        }
      },

      setBalance(value) {
        if (value.token == 'token1') { this.balance1 = value.balance } 
        if (value.token == 'token2') { this.balance2 = value.balance }
      }
    }
  }
</script>