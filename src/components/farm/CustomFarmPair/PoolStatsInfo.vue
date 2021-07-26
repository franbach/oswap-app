<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col w-full h-full justify-between absolute">
      <div class="flex flex-col dark:bg-gray-700 bg-gray-200 rounded-2xl">
        <div class="flex flex-1 shadow-lg dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
          <div class="flex flex-1 items-center justify-between relative">
            <div class="flex h-full flex-col justify-between">
              <p class="text-xs text-oswapGreen-dark">Your Unclaimed Rewards</p>
              <p class="text-2xl dark:text-gray-300">{{parseFloat(poolData[2]['value']).toFixed(6)}}</p>
            </div>

            <div v-if="parseFloat(poolData[2]['value']).toFixed(6) > 0" class="glow-collect -right-1 z-20"></div>

             <div v-if="parseFloat(poolData[2]['value']).toFixed(6) == 0" class="absolute -right-1 z-30 flex space-x-2 px-3 py-3 items-center rounded-lg bg-gray-100 group-scope dark:bg-oswapDark-gray border border-gray-300 dark:border-gray-500 select-none">
              <i class="las la-hand-holding-usd text-3xl text-gray-300 dark:text-gray-500"></i>
              <p class="text-lg text-gray-300 dark:text-gray-500">Collect !</p>
            </div>

            <div v-else class="absolute -right-1 z-30 flex space-x-2 px-3 py-3 items-center rounded-lg bg-gray-100 group-scope dark:bg-oswapDark-gray hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p @click="this.collectOSWAP(this.pool)" class="text-lg text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Collect !</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <i class="las la-balance-scale-left text-xl text-oswapGreen"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
              <p class="text-xs text-oswapBlue-light">Stake Weight</p>
              <p class="text-lg dark:text-gray-400">{{stakeWeight}} %</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <i class="las la-coins text-xl text-oswapGreen"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
              <p class="text-xs text-oswapBlue-light">Staked LP Tokens</p>
              <p class="text-lg dark:text-gray-400">{{parseFloat(poolData[3]['value']).toFixed(5)}}</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken0" class="h-4" alt="">
              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-oswapBlue-light">{{pool.name[0]}} Staked</p>
              <p class="text-lg dark:text-gray-400">{{pt0s}}</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken1" class="h-4" alt="">
              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-oswapBlue-light">{{pool.name[1]}} Staked</p>
              <p class="text-lg dark:text-gray-400">{{pt1s}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col ml-2 mt-2 mb-1 h-full justify-between">
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar-day dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Weekly Rewards: $ {{weeklyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Monthly Rewards: $ {{monthlyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-coins dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">LP Tokens Available: {{parseFloat(poolData[0]['value']).toFixed(5)}}</p>
        </div>
      </div>

      <div class="flex items-center h-12 pt-2 justify-between">
        <!-- Burn Fees Button -->
        <div class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 bg-gray-200 dark:bg-gray-600 border border-oswapGreen-dark dark:border-oswapGreen group-scope hover:bg-red-400 dark:hover:bg-red-400 hover:border-red-400 dark:hover:border-red-400 cursor-pointer">
          <p @click="this.burnPool(this.pool)" class="text-sm text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Burn Fees</p>
          <i class="las la-burn text-2xl text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
        <!-- Unstake Button -->
        <div @click="this.$emit('setPool', 'unstake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 bg-gray-200 group-scope dark:bg-gray-600 hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <p class="text-sm text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Unstake</p>
          <i class="las la-sign-out-alt text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
        <!-- Stake Button -->
        <div @click="this.$emit('setPool', 'stake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 bg-gray-200 group-scope dark:bg-gray-600 hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <p class="text-sm text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Stake</p>
          <i class="las la-sign-in-alt text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
        <!-- Refresh Button -->
        <tooltip-me>
          <div class="flex items-center justify-center rounded-full h-9 w-9 bg-gray-200 group-scope dark:bg-gray-600 hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
            <i class="las la-undo-alt text-lg text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
          </div>
          <tooltip-me-content :options="tooltip" class="flex p-2 px-3 rounded-lg shadow-lg text-sm">
            <p class="text-gray-500 dark:text-oswapDark-gray">Refresh</p>
          </tooltip-me-content>
        </tooltip-me>
        <!-- Close Button -->
        <div @click="this.$emit('setPool', 'close')" class="flex items-center justify-center rounded-full h-9 w-9 bg-gray-200 group-scope dark:bg-gray-600 hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <i class="las la-times text-xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
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
        tooltip: {
          name: 'poolRefresh',
          position: 'top',
          color: 'rgba(24, 213, 187, 0.9)',
          offset: 16,
          speed: 300
        },
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