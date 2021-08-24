<template>
  <!-- Modal -->
  <div class="flex ss:h-ss xs:h-sm bg-slightGray dark:bg-slightDark center-component flex-col z-60 text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border border-black border-opacity-10">
    <!-- Header -->
    <div class="fixed z-40 flex flex-col shadow-xl rounded-t-3xl rounded-b-2xl inset-x-0 p-2 bg-slightGray dark:bg-slightDark focus-within:text-oswapGreen dark:focus-within:text-oswapGreen border-b border-black border-opacity-10">
      <div class="flex w-full h-10 pb-2 items-center justify-between">
        <p class="dark:text-gray-200 text-gray-500 pl-3">Select a Token</p>
        <div @click="goTo('swap')" class="flex h-10 items-center">
          <i class="las la-times text-2xl p-2 dark:text-gray-500 dark:hover:text-oswapGreen hover:text-oswapGreen cursor-pointer text-gray-300"></i>
        </div>
      </div>
      <div class="flex w-full h-10 items-center">
        <i class="absolute las la-search text-2xl pl-2"></i>
        <input type="text" v-model="search" @input="this.retrieveTokens(search)" class="flex w-full ring-1 focus:outline-none focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-200" placeholder="Search Token">
      </div>
    </div>
    <!-- Token list body -->
    <div id="modalTokenList" class="flex z-30 w-full rounded-b-3xl overflow-x-hidden" style="margin-top: 98px;">
      <perfect-scrollbar class="flex flex-col flex-1 divide-y divide-black divide-opacity-10 w-full overflow-hidden">
        <div class="flex text-gray-500 dark:text-gray-300" v-for="(network, index) in this.retrieveTokens(search)" :key="index" >
          <div class="w-full grid grid-cols-5 gap-2 p-2">
            <!-- network name -->
            <div class="flex h-4 col-span-5 px-2 py-4 rounded-b-2xl items-center space-x-2">
              <img :src="network.icon" class="h-4" alt="">
              <p class="flex text-sm items-center dark:text-gray-300">{{network.name}}</p>
            </div>
            <!-- icons table -->
            <div @click="selectToken(token)" v-for="(token, idx) in network.tokens" :key="idx" class="flex flex-col space-y-2 h-16 rounded-xl items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
              <img :src="token.imgSrc" alt="" class="h-8 w-8 rounded-full flex items-center justify-center">
              <p class="text-xs dark:text-gray-300">
                {{token.Symbol}}
              </p>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js';

  export default {
    name: 'SwapModal',
    data() {
      return {
        search: ''
      }
    },
    created() {
      window.addEventListener('keyup', this.doCommand);
    },
    unmounted() {
      window.removeEventListener('keyup', this.doCommand);
    },
    props: {
      whichToken: String
    },
    computed: {
      ...mapGetters('exchange', ['retrieveTokens']),
    },
    methods: {
      ...mapActions('exchange', ['setToken', 'goTo']),
      ...mapGetters('exchange', ['getToken']),
      
      doCommand(e) {
        if (e.code == 'Escape') { this.goTo('swap'); }
      },

      selectToken(token) {
        if (this.whichToken == 'token1') {
          if (this.getToken()['token2'] && this.getToken()['token2'].Symbol == token.Symbol) {
            toastMe('warning', {
              title: 'Token Selection',
              msg: `You already picked ${token.Symbol} ! Choose another token.`,
              link: false,
            })
          } else {
            this.setToken({ tokenRef: this.whichToken, token: token });
            // Resets search field
            this.search = ''
            // closes the modal
            this.goTo('swap');
          }
        }
        if (this.whichToken == 'token2') {
          if (this.getToken()['token1'] && this.getToken()['token1'].Symbol == token.Symbol) {
            toastMe('warning', {
              title: 'Token Selection',
              msg: `You already picked ${token.Symbol} ! Choose another token.`,
              link: false,
            })
          } else {
            this.setToken({ tokenRef: this.whichToken, token: token });
            // Resets search field
            this.search = ''
            // closes the modal
            this.goTo('swap');
          }
        }
      },
    },
  }
</script>
