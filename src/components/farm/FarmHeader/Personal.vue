<template>
  <div class="flex flex-col pl-4 py-2">
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex space-x-2 items-center mb-3">
        <i class="las la-user text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Personal :</p>
      </div>
      <div class="flex divide-x divide-oswapGreen">
        <div class="flex flex-col pr-4 ss:w-36 xs:w-40 min-w-0">
          <div class="flex items-center ss:space-x-0 xs:space-x-1">
            <i class="las la-dollar-sign text-xl dark:text-oswapGreen"></i>
            <p class="ss:text-sm xs:text-lg font-extrabold text-el">{{prettify(parseFloat(TVL).toFixed(2))}}</p>
          </div>
          <p class="ss:text-xs xs:text-sm ss:pl-5 xs:pl-6">Total Staked Value</p>
        </div>
        <div class="flex flex-col px-3 text-gray-500 dark:text-gray-300">
          <div class="flex items-center space-x-1">
            <i class="las la-percent text-xl dark:text-oswapGreen"></i>
            <p class="ss:text-sm xs:text-lg font-extrabold">{{PAPR}} %</p>
          </div>
          <p class="ss:text-xs xs:text-sm pl-6">Average APR</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col text-gray-500 dark:text-gray-300 pt-3">
      <div class="flex space-x-2 items-center mb-3">
        <i class="las la-hand-holding-usd text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Rewards :</p>
      </div>
      <div class="flex divide-x divide-oswapGreen">
        <div class="flex flex-col pr-4 ss:w-36 xs:w-40 min-w-0">
          <div class="flex items-center space-x-1">
            <i class="las la-coins text-xl dark:text-oswapGreen"></i>
            <p class="ss:text-sm xs:text-lg font-extrabold text-el">{{parseFloat(REWARDS).toFixed(2)}}</p>
          </div>
          <p class="ss:text-xs xs:text-sm pl-6">Total Rewards</p>
        </div>
        <div class="flex flex-col px-3 text-gray-500 dark:text-gray-300">
          <div class="flex items-center space-x-1">
            <i class="las la-dollar-sign text-xl dark:text-oswapGreen"></i>
            <p class="ss:text-sm xs:text-lg font-extrabold">{{pendingValue}}</p>
          </div>
          <div class="flex items-center -space-y-2 space-x-3">
            <p class="ss:text-xs xs:text-sm pl-6">Total in USD</p>
            <tooltip-me>
              <div class="relative flex">
                <div @click="collectAllButton" class="flex w-8 h-8 z-30 items-center justify-center rounded-lg bg-gray-100 group-scope dark:bg-slightDark hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
                  <i class="las la-hand-holding-usd text-lg text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
                </div>
                <div v-if="true" class="absolute -left-0.5 flex flex-none glow-collect-all z-20"></div>
              </div>
              <tooltip-me-content :options="tooltip" class="flex w-24 rounded-lg shadow-xl p-0.5">
                <div class="flex w-full text-xs items-center justify-center bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                  <p>Claim All !</p>
                </div>
              </tooltip-me-content>
            </tooltip-me>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ethers } from 'ethers';
  import openswap from "@/shared/openswap.js";
  import { toastMe } from '@/components/toaster/toaster.js';

  export default {
    name: 'Personal',
    mixins: [openswap],
    props: {
      TVL: Number,
      PAPR: Number,
      REWARDS: Number
    },
    data() {
      return {
        oswapPrice: 0,
        usdValue: 0.00,
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 1)',
          offset: 16,
          speed: 200,
          shift: 50
        },
      }
    },
    mounted: async function(){
      this.oswapPrice = await this.getOswapPrice();
    },
    computed: {
      pendingValue: function() {
        return this.prettify(String(parseFloat(this.REWARDS * this.oswapPrice).toFixed(2)))
      }
    },
    methods: {
      prettify: function(number){
        return  ethers.utils.commify(number)
      },
      collectAllButton: async function(){
        const tx = await this.collectAll()
        
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>