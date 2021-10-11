<template>
  <!-- shows if not selected any network V-IF -->
  <div  v-if="!this.getFromNetwork">
    
      <div class="flex flex-1 h-10 w-32 items-center justify-center ring-1 ring-black dark:ring-gray-600 ring-opacity-10 hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer overflow-hidden rounded-xl space-x-2">
        <p class="text-sm dark:text-gray-200">From</p>
        <i class="las la-angle-down dark:text-gray-200"></i>
      </div>
   
  </div>
  
  <!-- shows if network is selected V-ELSE -->
  <div v-else >
  
      <div class="flex flex-1 h-10 w-32 min-w-0 items-center justify-center text-gray-500 dark:text-gray-300 border border-oswapGreen-dark dark:border-oswapGreen px-3 rounded-xl space-x-2 overflow-hidden hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
        <img :src="getFromNetwork.icon" class="h-4" alt="">
        <p class="text-xs text-el">{{getFromNetwork.name}}</p>
      </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js';

  export default {
    name: 'From',
     props: {
      token: Object
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('migrate', [ 'getFromNetwork', 'getToNetwork']),
    },
    mounted: function(){
        this.selectNetworkAuto()
        if(window.ethereum !== undefined){
          window.ethereum.on('chainChanged', async function(){
            this.selectNetworkAuto()
          }.bind(this))
        }
          
        
    },
    methods: {
      ...mapActions('migrate', ['setFromNetwork', 'setToNetwork', 'resetNetworks','switchNetwork']),
      ...mapGetters('migrate', ['getNetworks', 'getToken']),
      ...mapGetters('wallet', ['getChainID']),
      getTokenOrigin(token){
        if(token.bscAddress != undefined){
          return 'bsc'
        }
        if(token.ethAddress != undefined){
          return 'eth'
        }
      },
      selectNetwork(networkFrom, networkTo) {
          this.resetNetworks()
          this.setFromNetwork(networkFrom)
          this.setToNetwork(networkTo)
      },
      getTokenOriginNetwork(token, network){
        if(token.bscAddress != undefined){
          return network[1]
        }
        if(token.ethAddress != undefined){
          return network[2]
        }
      },
      selectNetworkAuto(){
        var networks = this.getNetworks();
        let token = this.getToken()['token1']
        let byChainID = {
          1666600000: networks[0],
          1666700000: 0,
          1: networks[2],
          56: networks[1],
        }
        var chainID = this.getChainID();
        if(chainID == 1666600000){
          var fromNetwork = networks[0]
          var toNetwork = this.getTokenOriginNetwork(token, networks)
        }else{
          var fromNetwork = this.getTokenOriginNetwork(token, networks)
          var toNetwork = networks[0]
        }
        this.selectNetwork(fromNetwork, toNetwork)
      }
    }
  }
</script>