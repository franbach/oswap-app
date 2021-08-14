<template>
<div class="relative flex ss:col-span-3 md:col-span-1 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-2xl p-4"> 
  <div class="flex flex-col space-y-6">
    <p class="text-sm uppercase text-oswapGreen-dark dark:text-oswapBlue-light">FARM DETAILS</p>
    <div class="flex flex-col">
      <p class="ss:text-2xl md:text-lg lg:text-2xl font-bold text-gray-600 dark:text-gray-50">${{ prettify(parseFloat(TVL).toFixed(2))}}</p>
      <p class="text-xs text-gray-400">Total Staked Value</p>
    </div><!--
    <div class="flex ss:flex-row ss:space-x-3 ss:space-y-0 md:flex-col md:space-y-3 md:space-x-0 lg:flex-row lg:space-x-3 lg:space-y-0 w-full">
      <div class="flex space-x-2 items-start min-w-0">
        <div class="flex flex-none w-10 h-10 bg-gray-200 dark:bg-oswapDark-gray items-center justify-center text-oswapGreen rounded-lg">
          <i class="las la-user text-3xl"></i>
        </div>
        <div class="flex flex-col h-full space-y-1 justify-center items-start">
          <p class="text-xs font-bold text-gray-600 dark:text-gray-50">$8,022.00</p>
          <p class="text-xs text-gray-400 text-el">Personal Staked Value</p>
        </div>  
      </div>
      <div class="flex space-x-2 items-start min-w-0">
        <div class="flex flex-none w-10 h-10 bg-gray-200 dark:bg-oswapDark-gray items-center justify-center text-oswapGreen rounded-lg">
          <i class="las la-percent text-3xl"></i>
        </div>
        <div class="flex flex-col h-full justify-center items-start">
          <p class="text-sm font-bold text-gray-600 dark:text-gray-50">75%</p>
          <p class="text-xs text-gray-400 text-el">Average APR</p>
        </div>
      </div>
    </div>-->
  </div>
  <div class="absolute top-4 right-4 flex flex-none items-start justify-center h-full overflow-hidden">
    <img src="@/assets/farm_picture3.png" alt="" class="h-20 object-cover">
  </div>
</div>
</template>

<script>
import { ethers } from 'ethers' 
  export default {
    name: 'FarmDetails',
    props: {
      TVL: Number
    },
    methods: {
      prettify: function(number){
        return  ethers.utils.commify(number)
      }
    }
  }
</script>