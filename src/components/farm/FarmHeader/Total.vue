<template>
  <div class="flex flex-col pr-6 py-2 space-y-2 h-full">
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex space-x-2 items-center mb-3 pl-2">
        <i class="las la-globe-europe text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Total :</p>
      </div>
      <div class="flex items-center space-x-3">
        <i class="las la-dollar-sign text-5xl dark:text-oswapGreen"></i>
        <p class="text-3xl font-extrabold">{{prettify(parseFloat(TVL).toFixed(2))}}</p>
      </div>
      <p class="text-base pl-16">Total Staked Value</p>
    </div>
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex items-center space-x-3">
        <i class="las la-percent text-5xl dark:text-oswapGreen"></i>
        <p class="text-3xl font-extrabold">{{TAPR}} %</p>
      </div>
      <p class="text-base pl-16">Average APR</p>
    </div>
  </div>
</template>

<script>
  import { ethers } from 'ethers'; 

  export default {
    name: 'Total',
    props: {
      TVL: Number,
      TAPR: Number
    },
    methods: {
      prettify: function(number){
        return  ethers.utils.commify(number)
      }
    }
  }
</script>