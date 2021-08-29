<template>
  <div class="flex flex-col pb-5 pt-2.5">
    <div class="flex flex-col p-4 st5 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-random text-xl dark:text-gray-300"></i>
        <p class="text-sm dark:text-gray-300">Swap</p>
      </div>
      <div class="flex flex-col st5 dark:bg-oswapDark-gray bg-gray-100 rounded-2xl">
        <div class="flex flex-col st5 dark:bg-oswapDark-gray bg-gray-100 rounded-2xl">
          <div class="flex shadow-lg flex-col space-y-3 st5 dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
            <SwapperToken0 />
            <SwapperToken1 />
          </div>
          <SwapperReserves />
        </div>
        <SwapperRateInpact />
      </div>
      <SwapperRate />
      
      <Warning :warnings="getWarnings" />

      <div class="flex pt-3">
        <div class="flex w-full h-10 items-center">
          <SwapperBackButton />
          <div class="flex flex-1 h-full space-x-2 justify-end">
            <div class="flex items-center w-28 h-full relative">
              <SwapperApprove />
            </div>
            <div class="flex items-center w-28 h-full relative">
              <SwapperSwap @reload='reload' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SwapperToken0 from '@/components/exchange/Swapper/SwapperToken0'
  import SwapperToken1 from '@/components/exchange/Swapper/SwapperToken1'
  import SwapperReserves from '@/components/exchange/Swapper/SwapperReserves'
  import SwapperRate from '@/components/exchange/Swapper/SwapperRate'
  import SwapperRateInpact from '@/components/exchange/Swapper/SwapperRateInpact'
  import SwapperBackButton from '@/components/exchange/Swapper/SwapperBackButton'
  import SwapperApprove from '@/components/exchange/Swapper/SwapperApprove'
  import SwapperSwap from '@/components/exchange/Swapper/SwapperSwap'
  import Warning from '@/components/exchange/Warning'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Swapper',
    components: {
      SwapperToken0,
      SwapperToken1,
      SwapperReserves,
      SwapperRate,
      SwapperRateInpact,
      SwapperBackButton,
      SwapperApprove,
      SwapperSwap,
      Warning
    },
    unmounted() {
      this.resetAll();
    },
    computed: {
      ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
      ...mapGetters('exchange/swapper', ['getWarnings']),
    },
    methods: {
      ...mapActions('exchange/swapper/buttons', ['setBtnState']),
      ...mapActions('exchange/swapper', ['resetAll']),

      reload(value) {
        this.$emit('reload', true)
      },
    }
  }
</script>