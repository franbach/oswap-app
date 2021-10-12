<template>
  <div class="flex flex-col w-full">
  
    <div class="flex space-x-2 items-center mb-6">
      <i class="las la-user text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Personal :</p>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full">
      <div class="flex items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark">
          <i class="las la-dollar-sign text-3xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-xl xs:text-3xl font-extrabold">{{prettify(parseFloat(TVL).toFixed(2))}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked Value</p>
        </div>
      </div>

      <div class="flex items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark">
          <i class="las la-percent text-3xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-xl xs:text-3xl font-extrabold">{{PAPR}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Averag APR</p>
        </div>
      </div>

      <div class="flex items-center space-x-3 w-full mt-6 col-span-2">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark">
          <i class="las la-coins text-3xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-xl xs:text-3xl font-extrabold">{{parseFloat(REWARDS).toFixed(2)}} / $ {{pendingValue}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Rewards</p>
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
      await setInterval(async function(){
        this.oswapPrice = await this.getOswapPrice();
      }.bind(this), 15000)
      
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