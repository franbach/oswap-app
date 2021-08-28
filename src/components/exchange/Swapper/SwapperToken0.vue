<template>
  <div class="flex flex-1 items-center">
    <!-- Left side -->
    <div class="flex flex-col space-y-1 w-1/3 min-w-0">
      <!-- Token img and name -->
      <div class="flex space-x-2 items-center h-10">
        <img :src="this.getToken()['token1'].imgSrc" class="h-8 w-8 rounded-full flex items-center justify-center" alt="">
        <div class="flex flex-1 items-center min-w-0">
          <p class="text-sm text-el text-oswapGreen-dark">{{this.getToken()['token1'].Symbol}}</p>
        </div>
      </div>
      <!-- Network name -->
      <div class="flex pl-1 space-x-2 h-4">
        <p class="text-xs text-el">{{this.getToken()['token1'].name}}</p>
      </div>
    </div>
    <!-- Right side -->
    <div class="flex flex-col space-y-1 flex-1 w-2/3 min-w-0">
      <div class="flex h-10">
        <Input0 :errors="errors" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <div class="flex flex-1 st5-all items-center justify-end group-scope z-30 absolute right-0">
            <div @click="setMax()" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
              <p class="text-sm dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </Input0>
      </div>
      <div class="flex pl-2 space-x-2 h-4">
        <p class="text-xs flex-none dark:text-oswapGreen-dark">Balance :</p>
        <p class="text-xs text-el text-gray-600 dark:text-gray-300">{{parseFloat(getBalanceToken(0)).toFixed(8)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Input0 from '@/components/exchange/Swapper/Input0';
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'SwapperToken0',
    components: {
      Input0
    },
    mixins: [openswap],
    mounted: async function() {
      this.setBalanceToken({ 
        0: await this.getTokenBalance(this.getToken()['token1']) 
      })
    },
    data() {
      return {
        errors: {},
      }
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getBalanceToken', 'getInputAmount', 'getSlippageRate', 'getPriceImpact', ])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper', [
        'setBalanceToken', 
        'setInputAmount', 
        'setPriceImpact', 
        'setThePath', 
        'setWarning', 
        'deleteWarning'
      ]),

      setMax: async function(){
        this.setInputAmount({
          0: await this.getTokenBalance(this.getToken()['token1'])
        })

        this.setInputForToken1();
      },

      setInputForToken1: async function() {
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']

        let units = this.getUnits(this.getInputAmount(0), token0)
        let bestRoute = await this.getBestRoute(units, token0, token1)
        
        this.setPriceImpact(bestRoute.priceImpact.toFixed(2))
        
        // Validation
        if (this.getPriceImpact > 3) { 
          this.setWarning({
            'impact': 'Price impact high. Check reserves. Continue only if you know what you are doing.'
          })
        } else {
          this.deleteWarning('impact')
        }

        this.setInputAmount({
          1: await this.getAmountOutWithSlippage(this.getInputAmount(0), bestRoute, this.getSlippageRate, token0, token1)
        })
      }
    }
  }
</script>