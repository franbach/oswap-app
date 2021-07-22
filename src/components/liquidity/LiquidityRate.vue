<template>
  <div class="flex flex-col mt-3 pl-1">
    <div class="flex items-center justify-between text-xs">
      <p class="dark:text-gray-300">Slippage Rate</p>
      <div class="flex items-center space-x-1">
        <div class="flex">
          <div class="flex pr-1 items-center rounded-lg text-oswapGreen">
            <p>{{selectedRate}}%</p>
          </div>
        </div>
        <SelectRate rate="0.1" :picked="selectedRate" @selectRate="updateSelectedRate"/>
        <SelectRate rate="0.3" :picked="selectedRate" @selectRate="updateSelectedRate"/>
        <SelectRate rate="0.5" :picked="selectedRate" @selectRate="updateSelectedRate"/>
        <LiquidityRateCustom :picked="selectedRate" @selectRate="updateSelectedRate"/>
      </div>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import SelectRate from '@/components/SelectRate';
  import LiquidityRateCustom from '@/components/liquidity/LiquidityRateCustom';
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperRate',
    components: {
      SelectRate,
      LiquidityRateCustom,
    },
    mixins: [openswap],
    props: {
      amount: String
    },
    data() {
      return {
        selectedRate: '0.5'
      }
    },
    mounted: async function() {
      this.updateData();
    },
    async created() {},
    methods: {
      ...mapGetters('exchange', ['getToken']),
      
      updateSelectedRate(rate) {
        // Ensures a correct rate
        this.selectedRate = Number((rate == '' || parseFloat(rate) < 0.1 ) ? '0.1' : rate).toString()
        this.updateData();
      },

      updateData: async function(){
        this.$emit("setSlippageRate", this.selectedRate);
      }
    }
  }
</script>