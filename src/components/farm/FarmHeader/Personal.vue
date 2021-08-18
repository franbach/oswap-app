<template>
  <div class="flex flex-col pl-6 py-2 space-y-2 h-full">
    <div class="flex flex-col text-gray-500 dark:text-gray-300">
      <div class="flex space-x-2 items-center mb-3">
        <i class="las la-user text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Personal :</p>
      </div>
      <div class="flex divide-x divide-oswapGreen">
        <div class="flex flex-col pr-4 w-40 min-w-0">
          <div class="flex items-center space-x-1">
            <i class="las la-dollar-sign text-xl dark:text-oswapGreen"></i>
            <p class="text-lg font-extrabold text-el">{{prettify(parseFloat(TVL).toFixed(2))}}</p>
          </div>
          <p class="text-sm pl-6">Total Staked Value</p>
        </div>
        <div class="flex flex-col px-3 text-gray-500 dark:text-gray-300">
          <div class="flex items-center space-x-1">
            <i class="las la-percent text-xl dark:text-oswapGreen"></i>
            <p class="text-lg font-extrabold">{{PAPR}} %</p>
          </div>
          <p class="text-sm pl-6">Average APR</p>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col text-gray-500 dark:text-gray-300 pt-3">
      <div class="flex space-x-2 items-center mb-3">
        <i class="las la-hand-holding-usd text-lg dark:text-oswapGreen"></i>
        <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Rewards :</p>
      </div>
      <div class="flex">
        <div class="flex flex-col pr-4 w-40 min-w-0">
          <div class="flex items-center space-x-1">
            <i class="las la-coins text-xl dark:text-oswapGreen"></i>
            <p class="text-lg font-extrabold text-el">{{parseFloat(REWARDS).toFixed(2)}}</p>
          </div>
          <p class="text-sm pl-6">Total Rewards</p>
          <p class="text-xs pl-6 text-oswapGreen dark:text-oswapBlue-light">~ $ {{pendingValue}}</p>
        </div>
        <div class="flex w-24 space-x-2 items-center">
          <div class="relative flex w-24">
            <div @click="collectAllButton" class="flex w-24 z-30 items-center justify-center rounded-lg space-x-2 h-10 bg-gray-100 group-scope dark:bg-slightDark hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
              <p class="ss:text-sm xl:text-base text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Claim All !</p>
            </div>
            <div v-if="true" class="absolute -left-0.5 flex flex-none glow-collect-all z-20"></div>
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
      return{
        oswapPrice: 0,
        usdValue: 0.00,
      }
    },
    mounted: async function(){
      this.oswapPrice = await this.getOswapPrice();
    },
    computed: {
      pendingValue: function(){
        return this.prettify(String(parseFloat(this.REWARDS * this.oswapPrice).toFixed(2)))
      }
    },
    methods: {
      prettify: function(number){
        return  ethers.utils.commify(number)
      },
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

<style lang="scss" scoped>

</style>