<template>
  <!-- Swap disabled -->
  <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({swap: 'disabled'})" class="flex w-28 st5 st5-all justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Swap</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Swap -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="parseAndExecuteSwap" v-if="this.getBtnState({swap: 'swap'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Swap</p>
        </div>
        <i class="las la-random text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapping -->
  <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({swap: 'swapping'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Swapping</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapped -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({swap: 'swapped'})" class="flex w-28 st5 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Swapped</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperApprove',
    mixins: [openswap],
    computed: {
      ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
      ...mapGetters('exchange/swapper', ['getInputAmount', 'getThePath'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper/buttons', ['setBtnState']),
      
      parseAndExecuteSwap: async function() { 
        let token0 = await this.getToken()['token1'];
        let token1 = await this.getToken()['token2'];
        this.setBtnState({swap: 'swapping'});

        if(token0.oneZeroxAddress != this.WONE() && token1.oneZeroxAddress != this.WONE()){
          // await this.swapExactTokensForTokens(this.amount, this.amountOut, this.path, token0, token1)
          await this.swapExactTokensForTokens(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token0, token1
          )
          this.setBtnState({swap: 'swapped'});
        }
        if(token0.oneZeroxAddress == this.WONE()){
          // await this.swapETHForExactTokens(this.amount, this.amountOut, this.path, token1)
          await this.swapETHForExactTokens(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token1
          )
          this.setBtnState({swap: 'swapped'});
        }
        if(token1.oneZeroxAddress == this.WONE()){
          // await this.swapTokensForExactETH(this.amount, this.amountOut, this.path, token0)
          await this.swapTokensForExactETH(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token0
          )
          this.setBtnState({swap: 'swapped'});
        }

        this.$emit('reload', true)
      }

    }
  }
</script>