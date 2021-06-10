<template>

    <!-- <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-196 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
       -->
<div class="flex flex-col p-8 bg-white dark:bg-oswapDark-gray dark:border-oswapGreen-dark border shadow-md hover:shodow-lg rounded-2xl">
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<img src="../../../assets/oswap_asset.png" width="500" height="600"
				class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 dark:border-blue-100 dark:text-blue-400 dark:bg-blue-50" fill="none"
				viewBox="0 0 24 24" stroke="currentColor"/>
			<div class="flex flex-col ml-3">
				<div class="font-medium leading-none dark:text-oswapGreen">Current Rewards</div>
				<p class="text-sm text-gray-600 leading-none mt-1 pt-3 dark:text-oswapGreen">{{unclaimedTotal}} 
				</p>
			</div>
		</div>
		<button mat-icon-button="" class="flex-no-shrink bg-oswapGreen dark:bg-oswapDark-gray px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-oswapGreen dark:text-oswapGreen text-white rounded-full" @click="collectAllButton()">Collect</button>
	</div>
</div>

</template>

<script>
  import openswap from "../../../shared/openswap.js";
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'Collect',
    components: {
    },
    mixins: [openswap],
    mounted: async function (){
      await this.getAllRewards();
      await setInterval(
        async function() {
          await this.getAllRewards();
        }.bind(this),
        10000
      );
    },
    data() {
      return {
        unclaimedTotal: 0.0
      }
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