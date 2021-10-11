<template>
  <div class="flex flex-none flex-col ss:pr-0 xs:pr-4 py-2 space-y-2">
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex space-x-2 items-center ss:mb-2 xs:mb-3 ss:pl-1 xs:pl-3">
        <i class="las la-globe-europe text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Total :</p>
      </div>
      <div class="flex items-center space-x-2">
        <i class="las la-dollar-sign ss:text-2xl xs:text-5xl dark:text-oswapGreen"></i>
        <p class="ss:text-xl xs:text-3xl font-extrabold">{{prettify(parseFloat(TVL).toFixed(2))}}</p>
      </div>
      <p class="ss:text-xs xs:text-base ss:pl-8 xs:pl-14">Total Staked Value</p>
    </div>
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex items-center space-x-2">
        <i class="las la-percent ss:text-2xl xs:text-5xl dark:text-oswapGreen"></i>
        <p class="ss:text-xl xs:text-3xl font-extrabold">{{TAPR}} %</p>
      </div>
      <p class="ss:text-xs xs:text-base ss:pl-8 xs:pl-14">Average APR</p>
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