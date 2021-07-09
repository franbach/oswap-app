<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500 pb-16">
    <transition name="fall" appear>
      <FarmHeader/>
    </transition>
    <transition name="farm" appear>
      <div v-if="farmData != null" :key="farmData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <FarmPair  v-for="(pool, index) in Pools" :key="index" :poolData="farmData[pool.i]" :pool="pool" />
      </div>
    </transition>
  </div>
</template>

<script>
  import FarmHeader from "@/components/farm/FarmHeader"
  import FarmPair from '@/components/farm/FarmPair'
  import openswap from "@/shared/openswap.js";

  import { createWatcher } from '@makerdao/multicall';
  import { mapGetters } from 'vuex';

  const { Pools } = require("@/store/modules/farm/pools.js")

  export default {
    name: 'Farm',
    mixins: [openswap],
    components: {
      FarmHeader,
      FarmPair
    },
    mounted: async function () {
      this.Pools = Pools;
      this.initMulticall()
      
    },
    data() {
      return {
        Pools,
        farmData: null,
      }
    },
    methods: {
      ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF', 'hMULTICALL', 'hRPC']),
      ...mapGetters('wallet', ['getUserAddress']),
      initMulticall: async function(){

        
        //const OPENMAKER = this.oSWAPMAKER();
        const MULTICALL = this.hMULTICALL();
        const RPC = this.hRPC();
        const CALL = this.generateCalls();
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
        await watcher.awaitInitialFetch()
        this.parseResults(results)
      },
      parseResults: async function(results){
        let count = results.length
        console.log(count)
        let dataObj = []
        var i,j, temporary, numOfCallsPerPool = 5;
        for (i = 0,j = results.length; i < j; i += numOfCallsPerPool) {
            temporary = results.slice(i, i + numOfCallsPerPool);
            dataObj.push([temporary])
        }
        console.log(dataObj)
        this.farmData = dataObj;
        
     },
     /* genData: async function(poolInfo){
 
        var i = 0;
        
        for (var n in Pools) {
          
          //SKIP PID 8
          if (i == 1) { //

            var [t0PStaked, t1PStaked, t0TStaked, t1TStaked] = ["?","?","?","?",]
            
          }else{
            var [t0PStaked, t1PStaked, t0TStaked, t1TStaked] = await this.getTokenAmounts(
            Pools[n],
            String(poolInfo[0][0][4]['value']),
            String(poolInfo[0][0][3]['value']),
            String(poolInfo[0][0][1]['value'])
          );
           
          }
          this.t0PStaked.push(t0PStaked);
          this.t1PStaked.push(t1PStaked);
          this.t0TStaked.push(t0TStaked);
          this.t1TStaked.push(t1TStaked);
          console.log("h" + t0PStaked)
          i++;
        }
       
      },*/
      generateCalls: function(){
        let CALL = [];
        let userAddress = this.getUserAddress();
        const MASTERCHEF = this.oSWAPCHEF();
        var i = 0;

        for (var n in Pools) {
          
          //SKIP PID 8
          if (i == 8) {
            i++;
          }
          //LP Balance CALLS
          CALL.push(
            {
              target: Pools[n].pairaddress,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [['BALANCE_OF_' + n , val => val / 10 ** 18]]
            }
          );
          //Staked LP Balance Calls
          CALL.push(
            {
              target: Pools[n].pairaddress,
              call: ['balanceOf(address)(uint256)', MASTERCHEF],
              returns: [['TOTAL_LP_STAKED_OF_' + n , val => val / 10 ** 18]]
            }
          );
          
          //unclaimed rewards calls
          CALL.push(
            {
              target: MASTERCHEF,
              call: ['pendingSushi(uint256,address)(uint256)', i, userAddress],
              returns: [['PENDING_OF_' + n , val => val / 10 ** 18]]
            }
          ); 
          //total LP staked calls
          CALL.push(
            {
              target: MASTERCHEF,
              call: ['amountStaked(uint256,address)(uint256)', i, userAddress],
              returns: [['LP_STAKED_OF_' + n , val => val / 10 ** 18]]
            }
          );
          CALL.push(
            {
              target: Pools[n].pairaddress,
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