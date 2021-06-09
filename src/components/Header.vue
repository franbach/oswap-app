<template>
  <header class="max-w-screen-xl mx-auto flex justify-between h-14 py-9 xl:px-0 px-3 items-center">
    <img alt="OpenSwap" src="../assets/oswap_logo.png" class="h-12">
    <!-- Navigation Start -->
    <div class="flex items-center space-x-2 text-gray-500">

      <router-link to="/" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-random text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Exchange</p>
      </router-link>

      <router-link to="/liquidity" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tint text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Liquidity</p>
      </router-link>

      <router-link to="/farm" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tractor text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Farm</p>
      </router-link>

      <!-- Menu 'More' (dropdown) -->
      <MoreButton />


      <!-- display oswap price -->
      <Oswap />


      <!-- Wallet Button  -->
      <Wallet/>

    </div>
    <!-- Navigation End -->
  </header>
</template>

<script>
  import Wallet from '@/components/header/Wallet'
  import MoreButton from '@/components/header/MoreButton'

  import Oswap from '@/components/header/OswapPrice'
  import store from "../store";
  
  export default {
    name: 'Header',
    components: {
      Wallet,
      MoreButton,
      Oswap
    },
    data() {
      return {        
      }
    },

    methods: {
    }
  }
</script>