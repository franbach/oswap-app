<template>
  <div class="flex flex-col st5-all p-4 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-pallet text-xl dark:text-gray-200"></i>
      <p class="text-sm dark:text-gray-200">Bridge</p>
    </div>
    <div class="flex flex-col space-y-3">
      <BridgeNetworkSelect  v-if="(this.getToken()['token1'])" :token="this.getToken()['token1']" />

      <BridgeTokenSelect @click="selectToken('token1')" whichToken="token1" />
      <div class="flex flex-1 items-center space-x-3">
        <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-10">{{tokenSymbol}}</p>
        </InputWithValidation>
        

        <div class="flex flex-1 items-center justify-end group-scope">
          <div @click="setMax()" class="flex h-10 items-center group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer px-3 rounded-xl space-x-2">
            <i class="las la-wallet text-xl dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100"></i>
            <p class="dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
          </div>
        </div>
      </div>
      <Warning :warnings="warnings" />
      <div class="flex w-full pl-2">
        <p class="text-xs dark:text-gray-400">Available: {{balance}}</p>
      </div>
      <div class="flex items-center justify-between">
        <!-- Active buttons if tokens selected -->
        <div v-if="(this.getToken()['token1'])" class="flex flex-1 items-center">
          <!-- Reset Tokens Button -->
          <div @click="this.resetSelection()" class="flex items-center pr-4 rounded-full hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
            <i class="las la-undo-alt text-lg p-2 text-red-400 rounded-full"></i>
            <p class="text-sm text-gray-500 dark:text-oswapBlue-light">reset</p>
          </div>
        </div>

        <!-- Disables buttons if tokens not selected -->
        <div v-else class="flex flex-1 items-center cursor-default select-none">
          <!-- Reset Tokens Button -->
          <div class="flex items-center pr-4 rounded-full bg-opacity-100">
            <i class="las la-undo-alt text-lg p-2 rounded-full text-gray-300 dark:text-gray-600"></i>
            <p class="text-sm text-gray-300 dark:text-gray-600">reset</p>
          </div>
        </div>

        <div class="flex h-full w-28 relative">
          <BridgeButton @bridge="bridgeCheckAndExecute" :token="this.getToken()['token1']" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import BridgeNetworkSelect from '@/components/bridge/BridgeNetworkSelect';
  import BridgeTokenSelect from '@/components/bridge/BridgeTokenSelect';
  import BridgeButton from '@/components/bridge/BridgeButton';
  import InputWithValidation from '@/components/InputWithValidation';
  import Warning from '@/components/exchange/Warning'

    import { toBech32 } from '@harmony-js/crypto'
  import { ethers } from "ethers";
  const { BridgeSDK, TOKEN, NETWORK_TYPE, EXCHANGE_MODE, STATUS } = require('bridge-sdk');
  const configs = require('bridge-sdk/lib/configs');
  import openswap from "@/shared/openswap.js";

  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Bridge',
    mixins: [openswap],
    components: {
      BridgeNetworkSelect,
      BridgeTokenSelect,
      BridgeButton,
      InputWithValidation,
      Warning
    },
    data() {
      return {
        amount: '0.0',
        balance: 0,
        errors: {},
        warnings: {},
        tokenSymbol: ' ? ',
        token: null,
        userAddress: ''
      }
    },
    mounted: async function() {
       const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        this.userAddress = await signer.getAddress();
      if (this.getToken()['token1'] != undefined) {
        
        this.token = this.getToken()['token1']
        this.getTokenBalance()
        const network = this.getTokenOrigin()
        await this.checkChainId(network)
        window.ethereum.on('chainChanged',() => {
          this.checkChainId(network)
      });
      }
    },
    methods: {
      ...mapGetters('migrate', ['getToken', 'getToNetwork']),
      ...mapGetters('wallet', ['getUserAddress']),

      ...mapActions('migrate', ['resetTokens']),

      selectToken(token) {
        this.$emit('triggerModal', token)
      },

      resetSelection() {
        this.resetTokens();
        this.tokenSymbol = ' ? '
      },
      bridgeCheckAndExecute:async function(){
        const network = this.getTokenOrigin()
        await this.checkChainId(network)

 
     
        this.Bridge(network)
      

        console.log()
        //if(getToNetwork)
       
        
        console.log(TOKEN)
        console.log(this.token)
        console.log('BRIDGE MATE')
      },
      Bridge: async function(tokenNetwork){
        const bridgeSDK = new BridgeSDK({ logLevel: 2 })
        await bridgeSDK.init(configs.mainnet);
        bridgeSDK.setUseMetamask(true);

        //this sets network to binance
        var network = this.getTokenOrigin()
        //this set mode (ONE TO ETH or ETH to ONE depending bridge route selected)
        var bridgeMode = this.getBridgeMode()
        var tokenType
        var erc20;
        var amount = 0.0001;
        //gets bech32 user address
        var oneAddress = toBech32(this.userAddress)
        //returns true if token is native (aka one, eth, bsc tokens)
        var isNative = this.isNative(this.getToken()['token1'])

        var hrc20 = this.getHrcForBridge(this.getToken()['token1'], isNative)

        let operationId;
        //sets token type based on native token or not else selects erc20 mode
        if(isNative){
          tokenType = TOKEN.ETH
        }
        else{
          tokenType = TOKEN.ERC20
        }
        //Gets the ERC20Token address (returns harmony 0x version if bridge to harmony)
        erc20 = this.get0xForBridge(this.getToken()['token1'], network, isNative)

        let intervalId = setInterval(async () => {
          if (operationId) {
              const operation = await bridgeSDK.api.getOperation(operationId);
              this.warnings['Network'] = 'Support Ticket : ' + String(operationId)
              console.log(operation)
              if (operation.status !== STATUS.IN_PROGRESS) {
                clearInterval(intervalId);
                process.exit();
              }  
          }
        }, 4000);
        try {
          console.log('bridgeMode : ' + bridgeMode)
          console.log('tokenType : ' + tokenType)
          console.log('netwrk : ' + tokenNetwork)
          console.log('erc20 : ' + erc20)
          await bridgeSDK.sendToken({
            type: bridgeMode,
            token: tokenType,
            amount: 0.0001,
            erc20Address: erc20,
            /*hrc20Address: hrc20,*/
            oneAddress: oneAddress,
            ethAddress: this.userAddress,
            network: tokenNetwork
          }, id => (operationId = id))
        }catch (e) {
            console.log(e.message);
            this.warnings['Error'] = 'Failed :' + e.message
            console.log(e)
        }
        process.exit();
      },
      getBridgeMode:  function(){
        if(this.getToNetwork().name == 'Harmony Network'){
          return EXCHANGE_MODE.ETH_TO_ONE
        }else{
          return EXCHANGE_MODE.ONE_TO_ETH
        }
      },
      isNative(token){
        if(token.Symbol == 'ONE' || token.Symbol == 'eETH' ||  token.Symbol == 'bBNB'){
          return true
        }else{
          return false
        }
      },
      get0xForBridge(token, network, native){
        if(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE ){
          if(native){
            return null
          }else if(network == NETWORK_TYPE.BINANCE){
            return token.bscAddress
          }
          else if(network == NETWORK_TYPE.ETHEREUM){
            return token.ethAddress
          }
        }else{
          return token.oneZeroxAddress
        }
      },
      getHrcForBridge(token, native){
        if(this.getBridgeMode() != EXCHANGE_MODE.ETH_TO_ONE ){
          if(native){
            return null
          }else {
            return token.oneZeroxAddress
          }
        }else{
          return null
        }
        

      },
      getTokenOrigin(){
        if(this.token.bscAddress != undefined){
          return NETWORK_TYPE.BINANCE
        }
        if(this.token.ethAddress != undefined){
          return NETWORK_TYPE.ETHEREUM
        }
      },
      checkChainId: async function(tokenNetwork){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        const chainID = await network.chainId;
        console.log(chainID)
        if(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE ){
          if (chainID != 1 && tokenNetwork == NETWORK_TYPE.ETHEREUM ) {
            this.warnings['Network'] = 'You are on the wrong network. change network to ETHEREUM in metamask'
          }
          else if (chainID != 56 && tokenNetwork == NETWORK_TYPE.BINANCE ) {
            this.warnings['Network'] = 'You are on the wrong network. change network to BINANCE in metamask'
          }
          else{
            delete this.warnings['Network']
          }
        }else{
          if (chainID != 1666600000 ) {
            this.warnings['Network'] = 'You are on the wrong network. change network to Harmony in metamask'
          }
        }
      },
      getTokenBalance: async function(){
        if(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE){
          if (this.getToken()['token1'].bscAddress != undefined) {
          this.tokenSymbol = this.getToken()['token1'].Symbol
          this.balance = await this.getBSCTokenBalance(this.getToken()['token1'], this.userAddress)
          }
          else if (this.getToken()['token1'].ethAddress != undefined) {
            this.tokenSymbol = this.getToken()['token1'].Symbol
            this.balance = await this.getETHTokenBalance(this.getToken()['token1'], this.userAddress)
          }
        }else{
           this.balance = await this.getTokenBalance(this.getToken()['token1'])
        }
        
      },
      setMax(){
        this.amount = this.balance
      }
    }
  }
</script>