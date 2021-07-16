<template>
  <div class="flex justify-between items-center">
    <!-- Header left side -->
    <div class="relative flex h-12 items-center">
      <!-- Icon token0 -->
      <div class="absolute items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-gray-200 dark:border-gray-700 group-hover:border-slightGray dark:group-hover:border-slightDark">
        <img :src="pool.imgtoken0" class="h-8 w-8">
      </div>
      <!-- Icon token1 -->
      <div class="absolute left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-gray-200 dark:border-gray-700 group-hover:border-slightGray dark:group-hover:border-slightDark">
        <img :src="pool.imgtoken1" class="h-8 w-8">
      </div>
      <!-- Pair Title -->
      <div class="absolute left-20 pl-2 items-center justify-center flex h-12 space-x-2">
        <p class="text-xs text-oswapBlue-light">{{pool.pair}}</p>
        <tooltip-me>
          <i class="las la-exclamation-circle text-xl transform rotate-180 hover:text-oswapGreen"></i>
          <tooltip-me-content :options="tooltip"
            class="flex w-80 items-start space-x-2 p-3 rounded-lg shadow-xl"
          >
            <div class="flex space-x-2 items-center">
              <i class="las la-coins text-3xl text-gray-50"></i>
            </div>

            <div class="flex flex-1 flex-col space-y-2 text-gray-50">
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
    <div class="flex h-10 w-20 mr-5">
      <p class="text-xl font-bold text-pink-400 group-hover:text-oswapGreen italic">{{this.rewards}}%</p>
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
          name: 'staked',
          position: 'top',
          color: 'rgba(24, 213, 187, 0.9)',
          offset: 16,
          speed: 300
        },
        tt0s: '?',
        tt1s: '?',
        tas: '?',
        rewards: '?'
      } 
    },
    mounted: async function(){

   
        var valueData = await this.getTokenAmounts(
          this.pool,
          String(this.poolData[4]['value']),
          String(this.poolData[3]['value']),
          String(this.poolData[1]['value'])
        );
        this.tt0s = valueData[2]
        this.tt1s = valueData[3]
        this.tas = ethers.utils.commify(parseFloat(this.poolData[1]['value']).toFixed(4));

        console.log(valueData[4].toFixed(4))
        console.log(valueData[5].toFixed(4))

        var liquidityValue = await this.getLiquidityValue(this.pool, valueData[4].toFixed(4), valueData[5].toFixed(4))
        var rewardValue = await this.getRewardValue(this.pool, 100)

         console.log(this.pool.name )
        console.log('Liquidity value : ' + liquidityValue[1] )
        console.log('reward value : ' + rewardValue[0])
        console.log('reward value 1 : ' + rewardValue[1])
        
        this.rewards = parseFloat( ((rewardValue[1] / liquidityValue[1]) * 12) * 100).toFixed(2)

    },
  }
</script>