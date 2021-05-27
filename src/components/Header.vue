<template>
  <header class="max-w-screen-xl mx-auto flex justify-between h-14 py-9 xl:px-0 px-3 items-center">
    <img alt="Vue logo" src="../assets/oswap_logo.png" class="h-12">
    <!-- Navigation Start -->
    <div class="flex items-center space-x-3 text-gray-500">

      <router-link to="/" class="flex items-center space-x-2 p-2 px-3 rounded-lg group bg-gray-50 bg-opacity-0 hover:bg-opacity-20 focus:outline-none focus:ring-1 focus:ring-black active:bg-oswapGreen-light focus:ring-opacity-20">
        <i class="las la-random text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light">Exchange</p>
      </router-link>

      <router-link to="/liquidity" class="flex items-center space-x-2 p-2 px-3 rounded-lg group bg-gray-50 bg-opacity-0 hover:bg-opacity-20 focus:outline-none focus:ring-1 focus:ring-black active:bg-oswapGreen-light focus:ring-opacity-20">
        <i class="las la-tint text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light">Liquidity</p>
      </router-link>

      <router-link to="/farm" class="flex items-center space-x-2 p-2 px-3 rounded-lg group bg-gray-50 bg-opacity-0 hover:bg-opacity-20 focus:outline-none focus:ring-1 focus:ring-black active:bg-oswapGreen-light focus:ring-opacity-20">
        <i class="las la-tractor text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light">Farm</p>
      </router-link>

      <!-- Menu 'More' (dropdown) -->
      <MoreButton />

      <!-- Oswap token info -->
      <div class="flex items-center space-x-2 pr-3 bg-gray-50 bg-opacity-0 hover:bg-opacity-20 p-2 px-3 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-black">
        <img alt="Vue logo" src="../assets/oswap_asset.png" class="h-6">
        <p class="text-xs">$1.00</p>
      </div>

      <!-- Wallet Button  -->
      <Wallet @click="connectWallet()" :connected="walletConnected"/>

    </div>
    <!-- Navigation End -->
  </header>
</template>

<script>
  import Wallet from '@/components/header/Wallet'
  import MoreButton from '@/components/header/MoreButton'

  export default {
    name: 'Header',
    components: {
      Wallet,
      MoreButton
    },
    data() {
      return {
        walletConnected: false,
      }
    },
    methods: {
      connectWallet() {
        this.walletConnected = !this.walletConnected;
      }
    }
  }
</script>