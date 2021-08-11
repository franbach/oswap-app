<template>
  <div class="flex w-full flex-col ss:pt-0 ss:pb-6 xs:pt-6 xs:pb-6 sm:pb-12">
    <div class="flex md:space-x-6 items-center">
      <div class="md:flex hidden items-center justify-center h-56 w-80 overflow-hidden">
        <img src="@/assets/farm_picture2.png" alt="" class="h-56 object-cover">
      </div>
      <div class="flex flex-col ss:space-y-6 xs:space-y-8">
        <div class="flex flex-col ml-1">
          <p class="ss:text-xl xs:text-3xl font-bold dark:text-gray-300">Stake LP Tokens</p>
          <p class="ss:text-xs xs:text-lg text-oswapBlue-light">Earn rewards holding crypto</p>
        </div>
        <div class="flex ss:flex-col xs:flex-row">
          <!-- Burn All button container absolute
          <div class="flex flex-col ss:mb-6 mr-4">
            <div class="flex items-center ss:mb-2 space-x-1 pl-2 h-14 w-32 pr-4 rounded-full bg-gray-200 dark:bg-oswapDark-gray border border-oswapGreen-dark dark:border-oswapGreen group-scope hover:bg-red-400 dark:hover:bg-red-400 hover:border-red-400 dark:hover:border-red-400 cursor-pointer">
              <i class="las la-burn text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p @click="this.burnAll()" class="text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Burn All !</p>
            </div>
            <p class="text-xs dark:text-gray-300 ml-4">Burn all Fees</p>
          </div>
           Collect All button container absolute -->
          <div class="relative flex flex-col">
            <div @click="collectAllButton" class="flex z-30 items-center rounded-full ss:mb-2 space-x-2 h-14 pl-3 pr-3 bg-gray-200 group-scope dark:bg-oswapDark-gray hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p class="text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Collect All</p>
              <p class="text-xs bg-gray-200 p-2 dark:bg-oswapDark-gray rounded-full px-3 text-oswapGreen-dark dark:text-oswapGreen">{{parseFloat(unclaimedTotal).toFixed(5)}}</p>
            </div>
            <p class="text-xs dark:text-gray-300 ml-4">All unclaimed rewards</p>
            <div v-if="parseFloat(unclaimedTotal).toFixed(5) > 0" class="absolute -top-0.5 -left-0.5 flex flex-none glow-collect-all z-20"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { toastMe } from '@/components/toaster/toaster.js'

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
        this.$emit('updateData')
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

<style>
.center-y-component {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
