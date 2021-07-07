<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-random text-xl dark:text-gray-400"></i>
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
      <SwapperRate :key="amount" :amount="amount" @amountOut="setAmountOut" @setSlippageRate="setSlippageRate" @priceImpact="setPriceImpact" @path="setPath" />
      
      <div class="flex pt-3">
        <div class="flex w-full items-center">
          <SwapperBackButton />
          <div class="flex flex-1 h-full items-center justify-end space-x-3">
            <div class="flex relative items-center bg-red-300">
              <SwapperApprove @setSwapState="setSwapState" :amount="this.amount" />
            </div>
            <div class="flex relative items-center bg-red-300">
              <SwapperSwap :state="swapState" :amount="amount" :amountOut="amountOut" :slippageRate="slippageRate" :path="path" />
            </div>
          </div>
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
  import SwapperSwap from '@/components/exchange/Swapper/SwapperSwap'
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
      SwapperSwap,
      Warning
    },
    data() {
      return {
        amount: '1',
        amountOut: "0",
        balance1: "0",
        balance2: "0",
        slippageRate: '0.5',
        path: [],
        warnings: {},
        swapState: 'disabled'
      }
    },
    mounted: async function() {},
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
      },
      setSwapState(value) {
        this.swapState = value
      },
      setPath(value){
        this.path = value;
      },
      setSlippageRate(value){
        this.slippageRate = value;
      },
      setBalance(value) {
        if (value.token == 'token1') { this.balance1 = value.balance } 
        if (value.token == 'token2') { this.balance2 = value.balance }
      }
    }
  }
</script>