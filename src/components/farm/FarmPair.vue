<template>

    <!-- <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-196 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
       -->
<div class="p-8 bg-white dark:bg-oswapDark-gray dark:border-oswapGreen-dark border shadow-md hover:shodow-lg rounded-2xl">
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<img :src="pool.imgtoken0" width="500" height="600"
				class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 dark:border-blue-100 dark:text-blue-400 dark:bg-blue-50" fill="none"
				viewBox="0 0 24 24" stroke="currentColor"/>

			<img :src="pool.imgtoken1" width="500" height="600"
				class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 dark:border-blue-100 dark:text-blue-400 dark:bg-blue-50" fill="none"
				viewBox="0 0 24 24" stroke="currentColor"/>
			<div class="flex flex-col ml-3">
				<div class="font-medium leading-none dark:text-oswapGreen">{{pool.pair}} {{pool.rewards}}</div>
				<p class="text-sm text-gray-600 leading-none mt-1 pt-3 dark:text-oswapGreen">{{unclaimedTotal}} 
				</p>
			</div>
		</div>
		<!-- <button mat-icon-button="" class="flex-no-shrink bg-oswapGreen dark:bg-oswapDark-gray px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-oswapGreen dark:text-oswapGreen text-white rounded-full" @click="this.collectAll()">Collect</button> -->
	</div> 
</div>

</template>

<script>
  import openswap from "../../shared/openswap.js";

  export default {
    name: 'FarmPair',
    props: {
      pool: Object
    },
    components: {
    },
    mixins: [openswap],
    mounted: async function (){
      //this.token0 = this.pool;
      //this.token1 = this.pool.name;
    //   await this.getAllRewards();
    //   await setInterval(
    //     async function() {
    //       await this.getAllRewards();
    //     }.bind(this),
    //     10000
    //   );
    },
    data() {
      return {
        //pool: null,
        token0: null,
        token1: null,
        lpBalance: 0,
        sushiBalance: 0,
        pendingSushi: 0,
        selectedPool: null,
        //e1: 1,
        amount: "0",
        lpToken: {},
        //addLiquidity: false,
        staked: 0,
        poolWeight: 0,
        totalStaked: 0,
        txHash: "",
        tradeExecuted: false,
        tradeSuccesful: false,
        txLink: null,
        loading: false,
        totalLpSupply: 0,
        token0PStaked: 0,
        token1PStaked: 0,
        token0TStaked: 0,
        token1TStaked: 0,
        unclaimedTotal: 0,
        transactionExecuted: false,
        totalStakedUI: null,
        monthly: 0,
        weekly: 0,
       // pool: 0
      }
    },
    methods: {
    }
  }
</script>