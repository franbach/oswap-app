<template>
  <div class="flex w-full flex-col py-10">
    <div class="flex md:space-x-6 items-center">
      <div class="md:flex hidden items-center justify-center h-56 w-80 overflow-hidden">
        <img src="@/assets/farm_picture2.png" alt="" class="h-56 object-cover">
      </div>
      <div class="flex flex-col space-y-3">
        <div class="flex flex-col ml-3">
          <p class="text-3xl font-bold dark:text-gray-300">Stake LP Tokens</p>
          <p class="text-lg text-oswapBlue-light">Earn rewards holding crypto</p>
        </div>
        <div class="flex space-x-3 items-center h-24">
          <!-- Burn All Button -->
          <div :class="parseFloat(unclaimedTotal).toFixed(5) > 0 ? 'pt-1' : ''" class="flex flex-col space-y-1 h-20">
            <div class="flex items-center space-x-1 pl-2 h-14 pr-4 rounded-full bg-gray-200 dark:bg-oswapDark-gray border border-oswapGreen-dark dark:border-oswapGreen group-scope hover:bg-red-400 dark:hover:bg-red-400 hover:border-red-400 dark:hover:border-red-400 cursor-pointer">
              <i class="las la-burn text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p @click="this.burnAll()" class="text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Burn All !</p>
            </div>
            <p class="text-xs dark:text-gray-300 ml-4">Burn all Fees</p>
          </div>
          <!-- Collect All Button -->
          <div class="flex flex-col space-y-1 h-20 relative">

            <div v-if="parseFloat(unclaimedTotal).toFixed(5) > 0" class="flex glow-collect-all z-20"></div>

            <div @click="collectAllButton" class="flex z-30 items-center rounded-full space-x-2 h-14 pl-3 pr-3 bg-gray-200 group-scope dark:bg-oswapDark-gray hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p class="text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Collect All</p>
              <p class="text-xs bg-gray-200 p-2 dark:bg-oswapDark-gray rounded-full px-3 text-oswapGreen-dark dark:text-oswapGreen">{{parseFloat(unclaimedTotal).toFixed(5)}}</p>
            </div>
            <div class="flex">
              <p class="text-xs dark:text-gray-300 ml-4">All unclaimed rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openswap from "../../shared/openswap.js";
import { toastMe } from '@/components/toaster/toaster.js'
import { mapState } from 'vuex';

  export default {
    name: 'FarmHeader',
    mixins: [openswap],
     props: {
      totalRewards: Number
    },
    data() {
      return {
        unclaimedTotal: '0.0',
      }
    },
    mounted: function() {
     this.getAmounts();
    },
    methods: {
      getAmounts: async function (){
       await setTimeout(async function (){
         this.unclaimedTotal = this.totalRewards
          await setInterval(
            async function() {
              this.unclaimedTotal = this.totalRewards
            }.bind(this),
            10000
          );
        }.bind(this), 2500);
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