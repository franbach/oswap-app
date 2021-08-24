<template>
  <div class="flex flex-col pb-5 pt-2.5">
    <div class="flex flex-col p-4 st5 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-random text-xl dark:text-gray-400"></i>
        <p class="text-sm dark:text-gray-400">Swap</p>
      </div>
      <div class="flex flex-col st5 dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 st5 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <SwapperToken :key="amountOut" whichToken="token1" :amount="this.amount" :amountOut="amountOut" @balance="setBalance" />
          <SwapperToken :key="amountOut" whichToken="token2" :amount="this.amount" :amountOut="amountOut" @balance="setBalance" />
        </div>
        <SwapperReserves />
      </div>
      <Warning :warnings="warnings" />
      <SwapperAmount @amount="setAmount" :balance="balance1" />
      <SwapperRate :key="amount" :amount="amount" @amountOut="setAmountOut" @setSlippageRate="setSlippageRate" @priceImpact="setPriceImpact" @path="setPath" />
      
      <div class="flex pt-3">
        <div class="flex w-full h-10 items-center">
          <SwapperBackButton />
          <div class="flex flex-1 h-full space-x-2 justify-end">
            <div class="flex items-center w-28 h-full relative">
              <SwapperApprove :amount="this.amount" />
            </div>
            <div class="flex items-center w-28 h-full relative">
              <SwapperSwap @reload='reload' :key="amountOut"  :amount="amount" :amountOut="amountOut" :slippageRate="slippageRate" :path="path" />
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
  import { mapGetters, mapActions } from 'vuex'

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
        warnings: {}
      }
    },
    mounted: async function() {
      this.setBtnState({swap: 'disabled'});
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getBtnState']),
    },
    methods: {
      ...mapActions('exchange/swapper', ['setBtnState']),
      reload(value){
       this.$emit('reload', true)
      },
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
        if (this.amount !== '' && this.getBtnState({approve: 'approved'})) {
          this.setBtnState({swap: 'swap'})
        }
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