<template >
  <div id="walletState" class="pl-1 lg:pl-3">
    <!-- Wallet disconnected state styling -->
    <div v-if="walletConnected === false"  @click="connect()" class="flex st5 lg:w-44 items-center text-gray-500 space-x-1 lg:pr-2 p-1 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-100 cursor-pointer ring-1 ring-black ring-opacity-5">
      <div class="flex items-center p-1 st5 bg-gray-200 dark:bg-oswapDark-gray rounded-md">
        <i class="las la-wallet text-xl st5"></i>
      </div>
      <div class="lg:flex hidden st5 w-full items-center p-1 text-sm justify-center">
        <p>Connect Wallet</p>
      </div>
    </div>

    <!-- Wallet connected state styling -->
    <div v-if="walletConnected" @click="disconnect()" class="flex st5 lg:w-44 items-center space-x-1 lg:pr-2 p-1 rounded-lg bg-opacity-20 hover:bg-opacity-50 cursor-pointer border-oswapGreen-dark border glow-oswapGreen-light-md">
      <div class="flex items-center p-1 bg-oswapGreen rounded-md">
        <i class="las la-wallet text-xl st5 text-white dark:text-oswapDark-gray"></i>
      </div>
      <div class="lg:flex hidden w-full items-center p-1 text-sm justify-center">
        <p class="dark:text-oswapGreen">Wallet Connected</p>
      </div>
    </div>
  </div>
</template>

<script>

import wallet from '@/shared/wallet.js';
import { mapGetters } from 'vuex';

export default {
  name: 'Wallet',
  mixins: [wallet],
  mounted() {
    this.connectWallet()
  },
  data() {
    return {
      walletConnected: false
    }
  },
  computed: {
  
  },
  methods: {
    connect(){
      this.walletConnected = this.connectWallet()
    },
    disconnect(){
      this.walletConnected = this.disconnectWallet()
      console.log('hlelelel')
    }
    

    
  }
}
</script>