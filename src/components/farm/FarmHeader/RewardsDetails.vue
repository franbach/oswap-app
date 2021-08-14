<template>
<div class="relative flex ss:col-span-3 md:col-span-1 p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-2xl">
  <div class="flex flex-col space-y-6">
    <p class="text-sm uppercase text-oswapGreen-dark dark:text-oswapBlue-light">Rewards</p>
    <div class="flex flex-col">
      <p class="text-2xl font-bold text-gray-600 dark:text-gray-50">{{parseFloat(details).toFixed(5)}}</p>
      <p class="text-xs text-gray-400">Total Rewards</p>
    </div>
    <div class="flex ss:flex-row ss:space-x-6 ss:space-y-0 md:flex-col md:space-y-3 md:space-x-0 lg:flex-row lg:space-x-6 lg:space-y-0 w-full">
      <!--
      <div class="flex space-x-2 items-start">
        <div class="flex flex-none w-10 h-10 bg-gray-200 dark:bg-oswapDark-gray items-center justify-center text-oswapGreen rounded-lg">
          <i class="las la-dollar-sign text-3xl"></i>
        </div>
        <div class="flex flex-col h-full space-y-1 justify-center items-start">
          <p class="text-xs font-bold text-gray-600 dark:text-gray-50">$1,050.00</p>
          <p class="text-xs text-gray-400">Total in USD</p>
        </div>
      </div>
      -->
      <div class="flex space-x-2 items-start">
        <div class="relative flex">
          <div @click="collectAllButton" class="flex z-30 items-center pl-2 pr-3 rounded-lg space-x-2 h-10 bg-gray-100 group-scope dark:bg-oswapDark-gray hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
            <i class="las la-hand-holding-usd text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
            <p class="text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Claim</p>
          </div>
          <div v-if="parseFloat(details).toFixed(5) > 0" class="absolute -left-0.5 flex flex-none glow-collect-all z-20"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute flex flex-none ss:top-4 ss:right-6 xs:right-4">
    <img src="@/assets/farm_picture2.png" alt="" class="h-24 object-cover">
  </div>
</div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'RewardsDetails',
    mixins: [openswap],
    props: {
      details: Number
    },
    methods: {
      collectAllButton: async function(){
        const tx = await this.collectAll()
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash

        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Collect All Sent to network. waiting for confirmation",
          link: false,
          href: `${explorer}${transaction}`
        })
        await tx.wait(1)
        toastMe('success', {
          title: 'Tx Succesfull',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
      }
    }
  }
</script>