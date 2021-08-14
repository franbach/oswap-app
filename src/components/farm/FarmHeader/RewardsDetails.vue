<template>
<div class="relative flex ss:col-span-3 md:col-span-1 p-4">
  <div class="flex w-full flex-col space-y-6">
    <p class="text-sm uppercase text-oswapGreen-dark dark:text-oswapBlue-light">Rewards</p>
    <div class="flex flex-col">
      <p class="ss:text-xl xs:text-2xl md:text-lg lg:text-2xl font-bold text-gray-600 dark:text-gray-50">{{parseFloat(details).toFixed(5)}}</p>
      <p class="text-xs text-gray-400">Total Rewards</p>
    </div>
    <div class="flex ss:flex-row ss:space-x-4 ss:space-y-0 md:flex-col md:space-y-3 md:space-x-0 lg:flex-row lg:space-x-4 lg:space-y-0 w-full">
      <div class="flex space-x-2">
        <div class="flex flex-none w-10 h-10 bg-gray-200 dark:bg-oswapDark-gray items-center justify-center text-oswapGreen rounded-lg">
          <i class="las la-dollar-sign text-3xl"></i>
        </div>
        <div class="flex w-24 min-w-0 flex-col h-full space-y-1 justify-center overflow-hidden">
          <p class="text-xs font-bold text-gray-600 dark:text-gray-50 text-el">$1,050.01</p>
          <p class="text-xs text-gray-400">Total in USD</p>
        </div>
      </div>
      <div class="flex w-full space-x-2 items-start">
        <div class="relative flex w-full">
          <div @click="collectAllButton" class="flex w-full z-30 items-center justify-center rounded-lg space-x-2 h-10 bg-gray-100 group-scope dark:bg-slightDark hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
            <i class="las la-hand-holding-usd text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
            <p class="ss:text-sm xl:text-base text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Claim All!</p>
          </div>
          <div v-if="true" class="absolute -left-0.5 flex flex-none glow-collect-all z-20"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute flex flex-none right-4">
    <img src="@/assets/pic_1.png" alt="" class="h-28 object-cover">
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