<template>
  <div class="flex justify-between items-center">
    <!-- Header left side -->
    <div class="relative flex h-12 items-center">
      <!-- Icon token0 -->
      <div class="absolute items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
        <img :src="pool.imgtoken0" class="h-8 w-8">
      </div>
      <!-- Icon token1 -->
      <div class="absolute left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
        <img :src="pool.imgtoken1" class="h-8 w-8">
      </div>
      <!-- Pair Title -->
      <div class="absolute left-20 pl-2 items-center justify-center flex h-12 space-x-2">
        <p class="text-xs text-oswapBlue-light">{{pool.pair}}</p>
        <tooltip-me>
          <i class="las la-exclamation-circle text-xl transform rotate-180 hover:text-oswapGreen"></i>
          <tooltip-me-content :options="this.tooltip"
            class="flex w-80 items-start space-x-2 p-3 rounded-lg shadow-xl"
          >
            <div class="flex space-x-2 items-center">
              <i class="las la-coins text-3xl text-gray-500 dark:text-oswapDark-gray"></i>
            </div>

            <div class="flex flex-1 flex-col space-y-2 text-gray-500 dark:text-oswapDark-gray">
              <p class="text-sm mt-1">Total Staked</p>
              <div class="flex items-center text-xs">
                <p>{{pool.pair}} Staked: {{tas}}</p>
              </div>
              <div class="flex items-center text-xs">
                <p>{{pool.name[0]}} Staked: {{tt0s}}</p>
              </div>
              <div class="flex items-center text-xs">
                <p>{{pool.name[1]}} Staked: {{tt1s}}</p>
              </div>
            </div>
          </tooltip-me-content>
        </tooltip-me>
      </div>
    </div>
    <!-- Header right side -->
    <div class="flex h-10 w-20 items-center mr-2">
      <div v-if="!this.rewards" class="flex flex-1 items-center justify-end">
        <svg class="animate-spin h-7 w-7 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p v-else class="text-xl font-bold text-pink-400 group-hover:text-oswapGreen italic">{{this.rewards}}%</p>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { ethers } from "ethers";

  export default {
    name: 'PoolHeader',
    mixins: [openswap],
    props: {
      pool: Object,
      poolData: Array
    },
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 0.9)',
          offset: 16,
          speed: 300,
          shift: 50
        },
        ttpObj: null,
        ttpRec: null,
        tt0s: '?',
        tt1s: '?',
        tas: '?',
        rewards: null
      } 
    },
    mounted: async function() {
      // Grabs the tooltip element
      this.ttpObj = document.querySelector(`div[tooltipme="tooltip-me_${this.tooltip.name}"]`);
      // Format the tooltip the first time
      this.adjustTooltip();
      // Format the tooltip when the user resizes the browser
      window.addEventListener('resize', () => {
        this.adjustTooltip();
      });
      // When the user clicks top open the farm pair details
      // we must recalc tooltips again
      this.oswapEmit.on('recalc-tooltips', () => {
        this.adjustTooltip();
      });

      var valueData = await this.getTokenAmounts(
        this.pool,
        String(this.poolData[4]['value']),
        String(this.poolData[3]['value']),
        String(this.poolData[1]['value'])
      );
      
      this.tt0s = valueData[2]
      this.tt1s = valueData[3]
      this.tas = ethers.utils.commify(parseFloat(this.poolData[1]['value']).toFixed(4));

      var liquidityValue = await this.getLiquidityValue(this.pool, valueData[4].toFixed(4), valueData[5].toFixed(4))
      var rewardValue = await this.getRewardValue(this.pool, 100)   
      this.rewards = parseFloat( ((rewardValue[1] / liquidityValue[1]) * 12) * 100).toFixed(2)
    },
    methods: {
      getWindowSize() {
        return {
          height: window.innerHeight,
          width: window.innerWidth
        }
      },
      adjustTooltip() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        // screen size from 0 - 800
        if (width > 0 && width < 800) {
          // for tooltips at the middle left
          if ((this.ttpRec.width / 2 + this.ttpRec.left) < xMiddle) {
            this.tooltip.shift = 50
          }
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 70
          }
        } else if (width > 800 && width < 1200) {
          // for tooltips at the middle left
          if ((this.ttpRec.width / 2 + this.ttpRec.left) < xMiddle) {
            this.tooltip.shift = 30
          }
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 70
          }
        } else {
          this.tooltip.shift = 50
        }
      } 
    }
  }
</script>