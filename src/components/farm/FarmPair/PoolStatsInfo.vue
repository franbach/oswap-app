<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col w-full h-full justify-between absolute">
      <div class="flex flex-col dark:bg-gray-700 bg-gray-200 rounded-2xl">
        <div class="flex flex-1 shadow-lg dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
          <div class="flex flex-1 items-center justify-between">
            <div class="flex h-full flex-col justify-between">
              <p class="text-xs text-oswapGreen-dark">Your Unclaimed Rewards</p>
              <p class="text-2xl dark:text-gray-300">{{parseFloat(poolData[2]['value']).toFixed(6)}}</p>
            </div>
            <div class="flex space-x-2 px-3 py-3 items-center rounded-lg bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-gray-200 dark:text-gray-700"></i>
              <p @click="this.collectOSWAP(this.pool)" class="text-lg text-gray-200 dark:text-gray-700">Collect !</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
          <div class="flex flex-col justify-between h-12">
            <div class="flex items-center space-x-2">
              <i class="las la-balance-scale-left text-xl text-oswapGreen"></i>
              <p class="text-xs text-oswapBlue-light">Stake Weight</p>
            </div>
            <p class="text-xl dark:text-gray-300">{{stakeWeight}} %</p>
          </div>
          <div class="flex flex-col justify-between h-12">
            <div class="flex items-center space-x-2">
              <i class="las la-coins text-xl text-oswapGreen"></i>
              <p class="text-xs text-oswapBlue-light">Staked LP Tokens</p>
            </div>
            <p class="text-xl dark:text-gray-300">{{parseFloat(poolData[3]['value']).toFixed(5)}}</p>
          </div>
          <div class="flex flex-col justify-between h-12">
            <div class="flex items-center space-x-2">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken0" class="h-4" alt="">
              </div>
              <p class="text-xs text-oswapBlue-light">{{pool.name[0]}} Staked</p>
            </div>
            <p class="text-xl dark:text-gray-300">{{pt0s}}</p>
          </div>
          <div class="flex flex-col justify-between h-12">
            <div class="flex items-center space-x-2">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken1" class="h-4" alt="">
              </div>
              <p class="text-xs text-oswapBlue-light">{{pool.name[1]}} Staked</p>
            </div>
            <p class="text-xl dark:text-gray-300">{{pt1s}}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col ml-2 mt-2 mb-1 h-full justify-between">
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar-day dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-300">Expected Weekly Rewards: $ {{weeklyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-300">Expected Monthly Rewards: $ {{monthlyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-coins dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-300">LP Tokens Available: {{parseFloat(poolData[0]['value']).toFixed(5)}}</p>
        </div>
      </div>

      <div class="flex items-center h-12 justify-between">
        <!-- Burn Fees Button -->
        <div class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-red-400 dark:hover:bg-red-400 border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <p @click="this.burnPool(this.pool)" class="text-sm text-gray-200 dark:text-gray-700">Burn Fees</p>
          <i class="las la-burn text-2xl text-gray-200 dark:text-gray-700"></i>
        </div>
        <!-- Unstake Button -->
        <div @click="this.$emit('setPool', 'unstake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <p class="text-sm text-gray-200 dark:text-gray-700">Unstake</p>
          <i class="las la-sign-out-alt text-2xl text-gray-200 dark:text-gray-700"></i>
        </div>
        <!-- Stake Button -->
        <div @click="this.$emit('setPool', 'stake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-2xl h-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <p class="text-sm text-gray-200 dark:text-gray-700">Stake</p>
          <i class="las la-sign-in-alt text-2xl text-gray-200 dark:text-gray-700"></i>
        </div>
        <!-- Refresh Button -->
        <tooltip-me>
          <div class="flex items-center justify-center rounded-full h-9 w-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapGreen dark:hover:bg-oswapGreen-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
            <i class="las la-undo-alt text-lg text-gray-200 dark:text-gray-700"></i>
          </div>
          <tooltip-me-content name="poolRefresh" position="top" offset="16" color="rgba(24, 213, 187, 0.9)" class="flex p-2 px-3 rounded-lg shadow-lg text-sm">
            <p class="text-gray-50">Refresh</p>
          </tooltip-me-content>
        </tooltip-me>
        <!-- Close Button -->
        <div @click="this.$emit('setPool', 'close')" class="flex items-center justify-center rounded-full h-9 w-9 bg-oswapGreen-dark dark:bg-oswapGreen hover:bg-oswapBlue-light dark:hover:bg-oswapBlue-light border-2 border-gray-200 dark:border-gray-700 cursor-pointer">
          <i class="las la-times text-xl text-gray-200 dark:text-gray-700"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import openswap from "@/shared/openswap.js";
  export default {
    name: 'PoolStatsInfo',
    mixins: [openswap],
    props: {
      isOpen: Boolean,
      pool: Object,
      poolData: Array,
    },
    data() {
      return {
        pt0s: '?',
        pt1s: '?',
        stakeWeight: '0 ',
        stakeWeight: '0 ',
        weeklyRewards: '0.00',
        monthlyRewards: '0.00'
      } 
    },
    mounted: async function(){
     
        var valueData = await this.getTokenAmounts(
          this.pool,
          String(this.poolData[4]['value']),
          String(this.poolData[3]['value']),
          String(this.poolData[1]['value'])
        );
        this.pt0s = valueData[0]
        this.pt1s = valueData[1]
        this.stakeWeight = this.getStakeWeight(this.poolData[3]['value'], this.poolData[1]['value'])
        let rewards = await this.getRewardValue(this.pool, this.stakeWeight);
    
        this.weeklyRewards = rewards[0];
        this.monthlyRewards = rewards[1];

    }
  }
</script>