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
        var network = this.getNetworks();
        console.log(network[1])
        if(this.getTokenOrigin(this.getToken()['token1']) == 'bsc'){
          this.selectNetwork(network[1], network[0])
        }else{
          this.selectNetwork(network[2], network[0])
        }
        
    },
    methods: {
      ...mapActions('migrate', ['setFromNetwork', 'setToNetwork', 'resetNetworks']),
      ...mapGetters('migrate', ['getNetworks', 'getToken']),
      getTokenOrigin(token){
        if(token.bscAddress != undefined){
          return 'bsc'
        }
        if(token.ethAddress != undefined){
          return 'eth'
        }
      },
      selectNetwork(networkFrom, networkTo) {
        if (this.getToNetwork && this.getToNetwork.name === networkFrom.name) {
          toastMe('warning', {
            title: 'Network Selection',
            msg: `You already picked ${networkFrom.name} ! Choose another.`,
            link: false,
          })
        } else {
          this.resetNetworks()
          this.setFromNetwork(networkFrom)
          this.setToNetwork(networkTo)
        }
      }
    }
  }
</script>