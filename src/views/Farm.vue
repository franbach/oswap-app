<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500 pb-16">
    <transition name="fall" appear>
      <FarmHeader :totalRewards="rewardsPending"/>
    </transition>
    
    <transition name="farm" appear>
      <div v-if="soloData != null" :key="farmData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <SoloFarmPair  v-for="(pool, index) in SoloPools" :key="index" :poolData="soloData[pool.i]" :pool="pool" />
        <FarmPair  v-for="(pool, index) in Pools" :key="index" :poolData="farmData[pool.i]" :pool="pool" />
        <CustomFarmPair  v-for="(pool, index) in CustomPools" :key="index" :poolData="customData[pool.i]" :pool="pool" />
      </div>
      <div v-else class="flex items-center mt-16">
        <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
  import FarmHeader from "@/components/farm/FarmHeader"
  import FarmPair from '@/components/farm/FarmPair'
  import SoloFarmPair from '@/components/farm/SoloFarmPair'
  import CustomFarmPair from '@/components/farm/CustomFarmPair'
  import openswap from "@/shared/openswap.js";

  import { createWatcher } from '@makerdao/multicall';
  import { mapGetters } from 'vuex';

  const { Pools, SoloPools, CustomPools } = require("@/store/modules/farm/pools.js")

  export default {
    name: 'Farm',
    mixins: [openswap],
    components: {
      FarmHeader,
      FarmPair,
      SoloFarmPair,
      CustomFarmPair
    },
    mounted: async function () {
      this.CustomPools = CustomPools;
      this.Pools = Pools;
      this.SoloPools = SoloPools;
      await setTimeout(async function (){
        this.customData = await this.initMulticall(this.CustomPools)
        this.farmData = await this.initMulticall(this.Pools)
        this.soloData = await this.initMulticall(this.SoloPools)
        this.getTotalPending();
      }.bind(this), 1000);
    },
    data() {
      return {
        Pools,
        SoloPools,
        farmData: null,
        soloData: null,
        rewardsPending: 0
      }
    },
    methods: {
      ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF', 'hMULTICALL', 'hRPC']),
      ...mapGetters('wallet', ['getUserAddress', 'getUserSignedIn']),
      getTotalPending: async function(){

        
        for (var n in this.farmData) {
          this.rewardsPending = this.rewardsPending + this.farmData[n][0][2]['value']
        }

        for (var n in this.soloData) {
          this.rewardsPending = this.rewardsPending + this.soloData[n][0][2]['value']   
        }

        for (var n in this.customData) {
          this.rewardsPending = this.rewardsPending + this.customData[n][0][2]['value']  
        }
      },
      initMulticall: async function(pools){

        
        //const OPENMAKER = this.oSWAPMAKER();
        const MULTICALL = this.hMULTICALL();
        const RPC = this.hRPC();
        const CALL = this.generateCalls(pools);
        var results= [];

        const config = {
          rpcUrl: RPC,
          multicallAddress: MULTICALL
        };

        const watcher = createWatcher(
            CALL,
            config
          );
        
        watcher.subscribe(update => { results.push(update) });
        watcher.start();
        await watcher.awaitInitialFetch();
        var res = await this.parseResults(results);
        return res;
      },
      parseResults: async function(results){
        let count = results.length
        
        let dataObj = []
        var i,j, temporary, numOfCallsPerPool = 5;
        for (i = 0,j = results.length; i < j; i += numOfCallsPerPool) {
            temporary = results.slice(i, i + numOfCallsPerPool);
            dataObj.push([temporary])
        }
        return dataObj;
        
     },
      generateCalls: function(pools){
        let CALL = [];
        let userAddress = this.getUserAddress();
        const MASTERCHEF = this.oSWAPCHEF();
        var i = 0;

        for (var n in pools) {
          

          //LP Balance CALLS
          CALL.push(
            {
              target: pools[n].pairaddress,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [['BALANCE_OF_' + n , val => val / 10 ** 18]]
            }
          );
          //Staked LP Balance Calls
          CALL.push(
            {
              target: pools[n].pairaddress,
              call: ['balanceOf(address)(uint256)', MASTERCHEF],
              returns: [['TOTAL_LP_STAKED_OF_' + n , val => val / 10 ** 18]]
            }
          );
          
          //unclaimed rewards calls
          CALL.push(
            {
              target: MASTERCHEF,
              call: ['pendingSushi(uint256,address)(uint256)', parseInt(pools[n].pid), userAddress],
              returns: [['PENDING_OF_' + n , val => val / 10 ** 18]]
            }
          ); 
          //total LP staked calls
          CALL.push(
            {
              target: MASTERCHEF,
              call: ['amountStaked(uint256,address)(uint256)', parseInt(pools[n].pid), userAddress],
              returns: [['LP_STAKED_OF_' + n , val => val / 10 ** 18]]
            }
          );
          CALL.push(
            {
              target: pools[n].pairaddress,
              call: ['totalSupply()(uint256)'],
              returns: [['TOTAL_SUPPLY_OF_' + n , val => val / 10 ** 18]]
            }
          );
          i++;
        }
        return CALL;
      }
    }
    
  }
</script>