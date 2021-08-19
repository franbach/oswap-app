<template>
  <!-- Swap disabled -->
  <transition tag="div" name="swap-btn" class="inline-block center-y-component right-0">
    <div v-if="false" class="flex w-28 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Bridge</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Swap -->
  <transition tag="div" name="approve-btn" class="inline-block center-y-component right-0">
    <div @click="bridge" v-if="true" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Bridge</p>
        </div>
        <i class="las la-random text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapping -->
  <transition tag="div" name="swap-btn" class="inline-block center-y-component right-0">
    <div v-if="false" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Bridging</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapped -->
  <transition tag="div" name="approve-btn" class="inline-block center-y-component right-0">
    <div v-if="false" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Bridged</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>
//const { BridgeSDK, TOKEN, NETWORK_TYPE, EXCHANGE_MODE, STATUS } = require('bridge-sdk');
//const configs = require('bridge-sdk/lib/configs');

  export default {
    name: 'BridgeButton',
     props: {
      token: Object
    },
    mounted(){

    },
    methods: {/*
      bridge: async function() {
        this.getTokenOrigin()
        const bridgeSDK = new BridgeSDK({ logLevel: 2 })
        await bridgeSDK.init(configs.mainnet);
        bridgeSDK.setUseMetamask(true);
        
        console.log(TOKEN)
        console.log(this.token)
        console.log('BRIDGE MATE')
      },
      getTokenOrigin(){
        if(this.token.bscAddress != undefined){
          console.log("bsc token")
          return NETWORK_TYPE.BINANCE
        }
        if(this.token.ethAddress != undefined){
          console.log("eth token")
          return NETWORK_TYPE.ETHEREUM
        }
      }*/
    }
  }
</script>