<template>
  <div class="flex flex-1 flex-col ss:w-80 xs:w-96 pb-5 pt-2.5">
    <div class="flex flex-1 flex-col p-4 st5 bg-gray-200 dark:bg-gray-700 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-tint text-xl dark:text-gray-400"></i>
        <p class="text-sm dark:text-gray-400">Liquidity</p>
      </div>
      <div class="flex flex-col space-y-1 st5 dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 st5 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <LiquidityPair :available="balances.lpToken"/>
        </div>
        <LiquidityInfo :pairAddress="pairAddress"/>
      </div>
      <div class="flex flex-1 pt-4">
        <button @click="toggleAdd" :class="addLiquidity ? 'bg-gray-100 dark:bg-gray-600 shadow-lg z-30' : 'bg-slightGray dark:bg-slightDark dark:hover:bg-gray-600 hover:bg-gray-100 z-10'" class="flex flex-1 items-center justify-center p-3 space-x-2 rounded-t-xl st5 text-oswapGreen focus:outline-none">
          <p class="text-sm">Add Liquidity</p>
          <i class="las la-level-down-alt"></i>
        </button>
        <button @click="toggleRemove" :class="removeLiquidity ? 'bg-gray-100 dark:bg-gray-600 shadow-lg z-30' : 'bg-slightGray dark:bg-slightDark dark:hover:bg-gray-600 hover:bg-gray-100 z-10'" class="flex flex-1 items-center justify-center p-3 space-x-2 rounded-t-xl st5 text-red-400 focus:outline-none">
          <p class="text-sm">Remove Liquidity</p>
          <i class="las la-level-up-alt"></i>
        </button>
      </div>
      
      <div v-if="addLiquidity" ><AddLiquidity :key="createNewPair" :createNewPair="createNewPair" :balances="balances" @setSlippageRate="setSlippage" /></div>
      <div v-if="removeLiquidity" ><RemoveLiquidity :balances="balances" /></div>

      <div class="flex pt-4">
        <div class="flex w-full h-10 items-center">
          <LiquidityBackButton />
            <div class="flex flex-1 h-full space-x-2 justify-end">
              <div v-if="addLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityApproveButton v-if="!token0Approved" :amount="getToken0Amount()" :token="getToken()['token1']" @set0approved="set0approved" />
                <LiquidityApproveButton v-if="token0Approved" :amount="getToken1Amount()" :token="getToken()['token2']" @set0approved="set0approved" :token0Approved="token0Approved" />
              </div>

              <div v-if="removeLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityApproveButton :amount="getToken0Amount()" :token="pairToken" @set0approved="set0approved" />
              </div>

              <div v-if="addLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityAddButton @executeAddLiquidity="executeAddLiquidity"/>
              </div>

              <div v-if="removeLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityRemoveButton @executeRemoveLiquidity="executeRemoveLiquidity"/>
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import LiquidityPair from '@/components/liquidity/LiquidityPair';
  import LiquidityInfo from '@/components/liquidity/LiquidityInfo';
  import AddLiquidity from '@/components/liquidity/AddLiquidity';
  import RemoveLiquidity from '@/components/liquidity/RemoveLiquidity';
  import LiquidityBackButton from '@/components/liquidity/buttons/LiquidityBackButton';
  import LiquidityApproveButton from '@/components/liquidity/buttons/LiquidityApproveButton';
  import LiquidityAddButton from '@/components/liquidity/buttons/LiquidityAddButton';
  import LiquidityRemoveButton from '@/components/liquidity/buttons/LiquidityRemoveButton';

  import { mapGetters, mapActions } from 'vuex'
  import openswap from "@/shared/openswap.js";
  import { ethers } from 'ethers'
  import { createWatcher } from '@makerdao/multicall';

  export default {
    name: 'AddRemoveLiquidity',
    mixins: [openswap],
    components: {
      LiquidityPair,
      LiquidityInfo,
      AddLiquidity,
      RemoveLiquidity,
      LiquidityBackButton,
      LiquidityApproveButton,
      LiquidityAddButton,
      LiquidityRemoveButton
    },
    data() {
      return {
        amount: '1',
        token0Approved: false,
        token1Approved: false,
        slippageRate: '0.5',
        warnings: {},
        addLiquidity: true,
        removeLiquidity: false,
        createNewPair: false,
        pairAddress: null,
        pairToken: null,
        balances: {
          token0: 0,
          token1: 0,
          lpToken: 0
        }
      }
    },
    mounted: async function() {
     
      this.pair = await this.getPair(this.getToken()['token1'],this.getToken()['token2'])
      .catch(() => {
        this.createNewPair = true
      })
      if(!this.createNewPair){
        this.pairAddress = this.pair["liquidityToken"].address;
        this.pairToken = await this.getPairAsToken(this.getToken()['token1'],this.getToken()['token2'])
        await this.initMulticall()
      }
      
      
      
      
    },
    computed: {},
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('liquidity/amounts', ['getToken0Amount','getToken1Amount']),
      ...mapGetters('addressConstants', ['hMULTICALL', 'hRPC', 'WONE']),
      ...mapActions('liquidity/buttons', ['setBtnState']),
      executeRemoveLiquidity:async function(){
        this.setBtnState({remove: 'removing'})
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']
        let amount0 = this.getToken0Amount()

        await this.removeLiquidityParse(token0, token1, amount0, this.slippageRate)
        await this.initMulticall()
        
      },
      executeAddLiquidity: async function(){
        this.setBtnState({add: 'adding'})
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']
        let amount0 = this.getToken0Amount()
        let amount1 = this.getToken1Amount()
        await this.addLiquidityParse(token0, token1, amount0, amount1, this.slippageRate)
        await this.initMulticall()
        
      },
      setSlippage(value){
        this.slippageRate = value;
      },
      set0approved(){
        this.token0Approved = true
      },
      set1approved(){
        this.token1Approved = true
      },
      parseResults: async function(results){
        const token0 = this.getToken()['token1']
        const token1 = this.getToken()['token2']


        this.balances.token0 = this.getFormatedUnits(results[1]['value'].toString(), token0)
        this.balances.token1 = this.getFormatedUnits(results[2]['value'].toString(), token1)
        this.balances.lpToken = this.getEthUnits(results[0]['value'])
        
        if(token0.oneZeroxAddress == this.WONE()){
          this.balances.token0 = this.getEthUnits(await this.getOneBalance())
        }
        if(token1.oneZeroxAddress == this.WONE()){
          this.balances.token1 = this.getEthUnits(await this.getOneBalance())
        }
     },
      initMulticall: async function(){
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
        await watcher.awaitInitialFetch();
        var res = await this.parseResults(results);
        return res;
      },
      generateCalls: function(){
        let CALL = [];
        let userAddress = this.getUserAddress();
        let token0 = this.getToken()['token1'].oneZeroxAddress
        let token1 = this.getToken()['token2'].oneZeroxAddress
        

          //LP Balance CALLS
          CALL.push(
            {
              target: this.pairAddress,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [['BALANCE_OF_LP', val => val]]
            }
          );
          //Staked LP Balance Calls
          CALL.push(
            {
              target: token0,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [['BALANCE_OF_T0', val => val]]
            }
          );
          
          //unclaimed rewards calls
          CALL.push(
            {
              target: token1,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [['BALANCE_OF_T1', val => val]]
            }
          ); 
        return CALL;
      },
    

      toggleAdd() {
        this.addLiquidity = true;
        this.removeLiquidity = false;
      },

      toggleRemove() {
        this.removeLiquidity = true;
        this.addLiquidity = false;
      },

      setAmountOut(value){},

      setPriceImpact(value){
        this.priceImpact = value;
        if (this.priceImpact > 3) { 
          this.warnings['impact'] = 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        } else { delete this.warnings['impact'] }
      },

      setAmount(value) {
        this.amount = value;
        if (this.amount !== '' && this.getBtnState({approve: 'approved'})) {
          //this.setBtnState({swap: 'swap'})
        }
      },

      setPath(value){
        this.path = value;
      },

      setSlippageRate(value){
        this.slippageRate = value;
      },
    }
  }
</script>