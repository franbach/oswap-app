<template>
  <div class="flex justify-between items-center">
    <!-- Header left side -->
    <div class="relative flex h-12 items-center">
      <!-- Icon token0 -->
      <div class="absolute items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-gray-200 dark:border-gray-700 group-hover:border-slightGray dark:group-hover:border-slightDark">
        <img :src="pool.imgtoken0" class="h-8 w-8">
      </div>
      
      <!-- Pair Title -->
      <div class="absolute left-10 pl-5 items-center justify-center flex h-12 space-x-2">
        <p class="text-xs text-oswapBlue-light">{{pool.token}}</p>
        <tooltip-me>
          <i class="las la-exclamation-circle text-xl transform rotate-180 hover:text-oswapGreen"></i>
          <tooltip-me-content name="staked" position="top" color="rgba(24, 213, 187, 0.9)" offset="12"
            class="flex w-80 items-start space-x-2 p-3 rounded-lg shadow-xl"
          >
            <div class="flex space-x-2 items-center">
              <i class="las la-coins text-3xl text-gray-50"></i>
            </div>

            <div class="flex flex-1 flex-col space-y-2 text-gray-50">
              <p class="text-sm mt-1">Total Staked</p>
              <div class="flex items-center text-xs">
                <p>{{pool.token}} Staked: {{tas}}</p>
              </div>
              
            </div>
          </tooltip-me-content>
        </tooltip-me>
      </div>
    </div>
    <!-- Header right side -->
    <div class="flex items-center h-10 w-10 mr-2">
      <p class="text-3xl font-extrabold text-gray-400 group-hover:text-oswapGreen italic">{{pool.rewards}}</p>
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
        tas: '?'
      } 
    },
    mounted: async function(){
   
   
        
        
        this.tas = ethers.utils.commify(parseFloat(this.poolData[1]['value']).toFixed(4));
    },
  }
</script>