<template>
  <div class="relative flex w-full items-center st5 focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen dark:text-oswapGreen text-gray-500">
    <input type="text" :value="getInputAmount(1)" @input="setInput" :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none ' + this.rounded : 'ring-black ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none ' + this.rounded" class="flex w-full z-20 st5 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" :placeholder="placeholder">
    <slot />
    <!-- display errors -->
    <transition name="invalid-input-body">
      <div v-if="this.invalidInput" class="flex z-10 w-full absolute py-2 my-2 top-0 left-0 bg-red-400 rounded-xl shadow-lg" :class="errorTop">
        <transition-group tag="div" name="invalid-input-list" class="relative flex flex-col space-y-2">
          <div v-for="(error, index) in this.errors" :key="index" class="text-xs text-gray-50 mx-3 flex">
            {{error}}
          </div>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    mixins: [openswap],

    name: 'Input1',
    props: {
      errors: Object,
      rounded: String,
      placeholder: String,
      errorTop: String
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getInputAmount', 'getSlippageRate', 'getPriceImpact']),

      invalidInput() {
        if (Object.keys(this.errors).length > 0) {
          return true
        } else { 
          return false
        }
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper', [
        'setInputAmount', 
        'setPriceImpact', 
        'setThePath',
        'setWarning', 
        'deleteWarning'
      ]),

      setInput(event) {
        this.setInputAmount({1: event.target.value});

        this.setInputForToken0();
      },

      setInputForToken0: async function(amount1) {
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']

        let units = this.getUnits(this.getInputAmount(1), token1)
        let bestRoute = await this.getBestRoute(units, token1, token0)
        
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
          0: await this.getAmountOutWithSlippage(this.getInputAmount(1), bestRoute, this.getSlippageRate, token1, token0)
        })
      }
    }
  }
</script>