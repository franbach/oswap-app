<template>
  <div class="flex flex-col st5-all p-4 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-pallet text-xl dark:text-gray-200"></i>
      <p class="text-sm dark:text-gray-200">Bridge</p>
    </div>
    <div class="flex flex-col space-y-3">
      <BridgeNetworkSelect @updateBalances="updateBalances"  v-if="(this.getToken()['token1'])" :token="this.getToken()['token1']" />

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
          <BridgeButton @bridge="bridgeCheckAndExecute" :buttonState="buttonState" :token="this.getToken()['token1']" />
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
        userAddress: '',
        buttonState: 'disabled'
        // 0x8139d578f11638C78E16685EB2804c2a34482E41 // bridge send
        //0xb6b55f250000000000000000000000000000000000000000000000006124fee993bc0000
      }
    },
    mounted: async function() {
       
        this.userAddress = this.getUserAddress();
      if (this.getToken()['token1'] != undefined) {
        this.token = this.getToken()['token1']
        console.log(this.token)
        this.getTokenBalance()
        const network = this.getTokenOrigin()
        await this.checkChainId(network)
        if(this.getWalletType() == 'metamask'){
            window.ethereum.on('chainChanged',() => {
            this.checkChainId(network)
          });
        }
      }
    },
    methods: {
      ...mapGetters('migrate', ['getToken', 'getToNetwork']),
      ...mapGetters('wallet', ['getUserAddress', 'getWalletType']),
      ...mapActions('migrate', ['resetTokens']),

      selectToken(token) {
        this.$emit('triggerModal', token)
      },
      updateBalances(){
        this.getTokenBalance()
      },
      resetSelection() {
        this.resetTokens();
        this.tokenSymbol = ' ? '
      },
      bridgeCheckAndExecute:async function(){
        const network = this.getTokenOrigin()
        await this.checkChainId(network)

        this.token = this.getToken()['token1']
     
        await this.Bridge(network)
      
        
        console.log(TOKEN)
        console.log(this.token)
        console.log('BRIDGE MATE')
      },
      Bridge: async function(tokenNetwork){
        this.buttonState = 'executing'
        const bridgeSDK = new BridgeSDK({ logLevel: 3})
        let walletType = this.getWalletType();
        var sdk
        if(walletType == 'metamask'){
          sdk = 'web3'
          await bridgeSDK.init({...configs.mainnet, sdk: sdk});
          await bridgeSDK.setUseMetamask(true);
          //await bridgeSDK.setUseOneWallet(true);

        }else{
          sdk = 'hmy'
          await bridgeSDK.init({...configs.mainnet, sdk: sdk});
          await bridgeSDK.setUseOneWallet(true);
        }

        
       
        
        //
        //await bridgeSDK.setUseOneWallet(true);
        //this sets network to binance
        var network = this.getTokenOrigin()
        //this set mode (ONE TO ETH or ETH to ONE depending bridge route selected)
        var bridgeMode = this.getBridgeMode()
        var tokenType
        var erc20;
        var amount = 0.0001;
        //gets bech32 user address
        if(this.getBridgeMode() == EXCHANGE_MODE.ONE_TO_ETH){
            var oneAddress = toBech32(this.userAddress)
        }else{
          var oneAddress = toBech32(this.userAddress)
        }
        
        console.log("userAddress  " + this.userAddress)
        //returns true if token is native (aka one, eth, bsc tokens)
        var isNative = this.isNative(this.getToken()['token1'])
        var hrc20 = null
       

        let operationId;
        //sets token type based on native token or not else selects erc20 mode
        console.log(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE)

        if(isNative){
          tokenType = TOKEN.ETH
        }else{
          tokenType = TOKEN.ERC20
          erc20 = this.get0xForBridge(this.getToken()['token1'], network, isNative)
        }
         
        
        
        //Gets the ERC20Token address (returns harmony 0x version if bridge to harmony)
       

        let intervalId = setInterval(async () => {
          if (operationId) {
              const operation = await bridgeSDK.api.getOperation(operationId);
              this.warnings['Network'] = 'Support Ticket : ' + String(operationId)
              console.log(operation)
              if (operation.status !== STATUS.IN_PROGRESS) {
                this.buttonState = 'finished'
                this.getTokenBalance()
                clearInterval(intervalId);
              }  
          }
        }, 4000);
        try {
          console.log('Native? : ' + isNative)
          console.log('bridgeMode : ' + bridgeMode)
          console.log('tokenType : ' + tokenType)
          console.log('netwrk : ' + tokenNetwork)
          console.log('erc20 : ' + erc20)
         //console.log('hrc20 : ' + hrc20)
         await bridgeSDK.sendToken({
            type: bridgeMode,
            token: tokenType,
            amount: this.amount,
            erc20Address: erc20,
            //hrc20Address: erc20,
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
        console.log(this.getToNetwork().name)
        console.log(this.token)
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
          if(network == NETWORK_TYPE.BINANCE){
            return token.bscAddress
          }
          else if(network == NETWORK_TYPE.ETHEREUM){
            return token.ethAddress
          }
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
        console.log(this.token)
        if(this.getToken()['token1'].bscAddress != undefined){
          return NETWORK_TYPE.BINANCE
        }
        if(this.getToken()['token1'].ethAddress != undefined){
          return NETWORK_TYPE.ETHEREUM
        }
      },
      checkChainId: async function(tokenNetwork){
        if(this.getWalletType() == 'metamask'){
          const provider = this.getProvider()
          const network = await provider.getNetwork();
          const chainID = await network.chainId;
          console.log(chainID)
          if(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE ){
            if (chainID != 1 && tokenNetwork == NETWORK_TYPE.ETHEREUM ) {
              this.warnings['Network'] = 'You are on the wrong network. change network to ETHEREUM in metamask'
              this.buttonState = 'disabled'
            }
            else if (chainID != 56 && tokenNetwork == NETWORK_TYPE.BINANCE ) {
              this.warnings['Network'] = 'You are on the wrong network. change network to BINANCE in metamask'
              this.buttonState = 'disabled'
            }
            else{
              delete this.warnings['Network']
              this.buttonState = 'active'
            }
            }else{
              if (chainID != 1666600000 ) {
                this.warnings['Network'] = 'You are on the wrong network. change network to Harmony in metamask'
                this.buttonState = 'disabled'
              }else{
                delete this.warnings['Network']
                this.buttonState = 'active'
              }
            }
          }else{
            if(this.getBridgeMode() == EXCHANGE_MODE.ETH_TO_ONE && this.getWalletType() != 'metamask'){
              this.warnings['Network'] = "You can't Bridge from this network using this wallet. use Metamask"
                this.buttonState = 'disabled'
            }else{
              delete this.warnings['Network']
                this.buttonState = 'active'
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
           this.balance = await this.getHMYTokenBalance(this.getToken()['token1'])
        }
        if(this.balance != 0 ){
          this.buttonState = 'active'
        }
        
      },
      depositFromHarmony: async function(){

      },
      setMax(){
        this.amount = this.balance
      },
      inputAmount(value){
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
          this.amount = value
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.errors['blank']
          this.amount = value        }
        if (parseFloat(value) > parseFloat(this.balance)) {
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
          this.amount = value
        }
      },
    }
  }
</script>