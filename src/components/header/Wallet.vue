
<template >
  <div id="walletState" class="pl-3" @click="connectWallet()">
    <!-- Wallet disconnected state styling -->
    <div v-show="walletConnected === false" class="flex w-44 items-center text-gray-500 space-x-1 pr-2 p-1 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-100 cursor-pointer ring-1 ring-black ring-opacity-5">
      <div class="flex items-center p-1 bg-gray-200 dark:bg-oswapDark-gray rounded-md">
        <i class="las la-wallet text-xl"></i>
      </div>
      <div class="flex w-full items-center p-1 text-sm justify-center">
        <p>
          Connect Wallet
        </p>
      </div>
    </div>

    <!-- Wallet connected state styling -->
    <div v-show="walletConnected" class="flex w-44 items-center space-x-1 pr-2 p-1 rounded-lg bg-opacity-20 hover:bg-opacity-50 cursor-pointer border-oswapGreen-dark border glow-oswapGreen-light-md">
      <div class="flex items-center p-1 bg-oswapGreen rounded-md">
        <i class="las la-wallet text-xl text-white dark:text-oswapDark-gray"></i>
      </div>
      <div class="flex w-full items-center p-1 text-sm justify-center">
        <p class="dark:text-oswapGreen">
          Wallet Connected
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import wallet from '../../shared/wallet.js'

export default {
  name: 'Wallet',
  mixins: [wallet],
  mounted(){
    this.connectWallet();
  },
  data() {
    return {
      walletConnected: false
    }
  }
}
</script>