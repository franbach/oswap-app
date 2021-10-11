<template>
  <div id="wallet" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16">
    <div class="flex flex-col w-full ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12 text-gray-600 dark:text-gray-200">
      
      <div class="flex items-start space-x-3 mb-8">
        <i class="las la-wallet text-3xl dark:text-oswapGreen text-gray-600"></i>
        <div class="flex flex-col pt-1">
          <p class="text-xl">Wallet Dashboard</p>
          <p class="text-xs pl-1 text-gray-400">{{this.getUserAddress}}</p>
        </div>
      </div>
      
      <div class="flex w-full">
        <!-- Menu -->
        <div class="flex mr-4">
          <div class="flex h-60 p-1 flex-col rounded-full shadow-xl bg-slightGray dark:bg-slightDark text-gray-500 dark:text-gray-200">
            <button @click="setActive('home')" :class="btnActive == 'home' ? 'text-oswapGreen' : '' "  class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-700 hover:bg-opacity-10">
              <i class="las la-home text-2xl"></i>
            </button>
            <button @click="setActive('harmony')" class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-700 hover:bg-opacity-10">
              <svg :class="btnActive == 'harmony' ? 'text-oswapBlue-light' : 'dark:text-gray-200 text-gray-600' " class="h-6 fill-current" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.143 7c-2.124 0-3.857 1.738-3.913 3.869v4.317c-.392 0-.783.056-1.23.056-.447 0-.839 0-1.23.056v-4.43c0-2.13-1.789-3.868-3.969-3.812-2.068 0-3.745 1.738-3.801 3.813v10.317c.056 2.13 1.789 3.869 3.969 3.813 2.124-.056 3.801-1.738 3.801-3.813v-4.318c.391 0 .783-.056 1.23-.056.447 0 .838 0 1.23-.056v4.374c.056 2.13 1.789 3.869 3.969 3.813C23.323 24.887 25 23.204 25 21.13V10.869C25 8.739 23.267 7 21.143 7zM13.26 17.093l-.056 4.093a2.27 2.27 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-1.008c0-.897.727-1.795 1.957-2.3.838-.392 1.733-.616 2.683-.784zm10.174-2.187v6.28a2.306 2.306 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-4.54a13.844 13.844 0 003.298-.954c.447-.224.894-.449 1.286-.785zM10.913 8.57a2.27 2.27 0 012.292 2.299v4.542a13.845 13.845 0 00-3.298.953c-.447.224-.895.448-1.286.785v-6.28c0-1.234 1.006-2.299 2.292-2.299zm10.174 0a2.27 2.27 0 012.292 2.299v1.01c.056.952-.671 1.793-1.9 2.354-.84.393-1.734.617-2.684.785v-4.15a2.27 2.27 0 012.292-2.298z"/></svg>
            </button>
            <button @click="setActive('ethereum')" class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-700 hover:bg-opacity-10">
              <svg :class="btnActive == 'ethereum' ? 'text-indigo-400' : 'dark:text-gray-200 text-gray-600' " class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill-rule="evenodd"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/><g fill-rule="nonzero"><path fill-opacity=".298" d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"/><path fill-opacity=".801" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".298" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
            </button>
            <button @click="setActive('binance')" class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-700 hover:bg-opacity-10">
              <svg :class="btnActive == 'binance' ? 'text-yellow-500' : 'dark:text-gray-200 text-gray-600' " class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z"/></svg>
            </button>
            <button :class="btnActive == 'staking' ? 'text-oswapGreen' : 'dark:text-gray-200 text-gray-600' " @click="setActive('staking')" class="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-700 hover:bg-opacity-10">
              <i class="las la-coins text-2xl"></i>
            </button>
          </div>
        </div>
        <!-- Info -->
        <div class="flex w-full font-nunito">
          <WalletHome v-if="btnActive == 'home'"/>
          <WalletHarmony v-if="btnActive == 'harmony'" />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import WalletHome from '@/components/wallet/WalletHome'
  import WalletHarmony from '@/components/wallet/WalletHarmony'

  export default {
    name: 'Wallet',
    components: {
      WalletHome,
      WalletHarmony
    },
    computed: {
      ...mapGetters('wallet', ['getUserAddress'])
    },
    data() {
      return {
        btnActive: 'home'
      }
    },
    methods: {
      setActive(state) {
        this.btnActive = state
      }
    }
  }
</script>