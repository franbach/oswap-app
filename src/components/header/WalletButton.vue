<template >
  <div id="walletState" class="pl-1 lg:pl-3">
    <!-- Wallet disconnected state styling -->
    <div v-if="getUserSignedIn === false"  @click="connect()" class="flex st5 lg:w-44 items-center text-gray-500 space-x-1 lg:pr-2 p-1 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-100 cursor-pointer ring-1 ring-black ring-opacity-5">
      <div class="flex flex-none relative h-8 w-8 items-center justify-center st5 bg-gray-200 dark:bg-oswapDark-gray rounded-full">
        <i class="absolute las la-wallet text-xl st5"></i>
      </div>
      <div class="flex st5 w-full items-center p-1 text-sm justify-center">
        <p class="lg:flex hidden">Connect Wallet</p>
        <i class="las la-unlink text-xl flex lg:hidden pr-1"></i>
      </div>
    </div>

    <!-- Wallet connected state styling -->
    <div v-if="getUserSignedIn" class="flex st5 lg:w-44 items-center space-x-1 lg:pr-2 p-1 rounded-full bg-opacity-20 hover:bg-opacity-50 cursor-pointer border-oswapGreen-dark border glow-oswapGreen-light-md hover:bg-white dark:hover:bg-gray-700">
      <router-link to="/wallet" class="flex flex-none relative h-8 w-8 items-center justify-center st5 bg-oswapGreen rounded-full hover:bg-yellow-400">
        <transition name="fade-in-and-rotate" appear>
          <i class="absolute las la-wallet text-xl st5 text-white dark:text-oswapDark-gray"></i>
        </transition>
      </router-link>
      <div @click="disconnect()" class="flex w-full items-center p-1 text-sm justify-center dark:text-oswapGreen">
        <p class="lg:flex hidden">Wallet Connected</p>
        <i class="las la-link text-xl flex lg:hidden pr-1"></i>
      </div>
    </div>
  </div>
</template>

<script>

import wallet from '@/shared/wallet.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WalletButton',
  mixins: [wallet],
  async mounted() {
    let wallet = localStorage.getItem("walletmode");
    if(wallet !== undefined){
      await this.autoConnect()
    }
  },
  data() {
    return {
      walletConnected: false
    }
  },
  computed: {
    ...mapGetters('wallet', ['getUserSignedIn'])
  },
  methods: {
    ...mapActions('wallet', ['switchWalletType']),
    
    connect: async function() {
     let wallet = localStorage.getItem("walletmode");
      if(wallet !== null){
        if (wallet == '0') {
          this.connectMetamaskWallet()
        }else{
          this.connectOneWallet()
        }
      }else{
        this.connectMetamaskWallet()
      }
    },
    autoConnect:async function(){
     let wallet = localStorage.getItem("walletmode");
      if(wallet !== null){
        if (wallet == '0') {
          this.connectMetamaskWallet()
        }else{
          this.connectOneWallet()
        }
      }
    },
    disconnect(){
      this.walletConnected = this.disconnectWallet()
    }
  }
}
</script>