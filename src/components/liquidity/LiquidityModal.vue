<template>
  <!-- Modal -->
  <div class="flex ss:h-ss xs:h-sm center-component flex-col p-2 z-60 bg-white dark:bg-gray-700 ss:w-80 xs:w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="fixed flex left-2 right-2 h-10 dark:text-gray-600 text-gray-200 focus-within:text-oswapGreen dark:focus-within:text-oswapGreen">
      <div class="flex w-full h-10 items-center">
        <i class="absolute las la-search text-2xl pl-2"></i>
        <input type="text" v-model="search" @input="this.retrieveTokens(search)" class="flex w-full ring-1 focus:outline-none focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-2xl py-2 items-center pl-10 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-200" placeholder="Search Token">
      </div>
      <div @click="goTo('settokens')" class="flex flex-1 h-10 items-center">
        <i class="las la-times text-2xl p-2 dark:text-gray-500 dark:hover:text-oswapGreen hover:text-oswapGreen cursor-pointer text-gray-300"></i>
      </div>
    </div>
    <div id="modalTokenList" class="flex w-full rounded-2xl mt-12 overflow-x-hidden">
      <perfect-scrollbar class="grid grid-cols-1 w-full rounded-2xl gap-2 overflow-hidden">
        <div class="flex bg-gray-50 dark:bg-oswapDark-gray rounded-2xl" v-for="(network, index) in this.retrieveTokens(search)" :key="index" >
          <div class="w-full grid grid-cols-5 gap-2 p-2">
            <!-- network name -->
            <div class="flex h-4 col-span-5 p-2 rounded-2xl items-center space-x-2">
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
    name: 'LiquidityModal',
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
      ...mapActions('exchange', ['setToken']),
      ...mapActions('liquidity/buttons', ['goTo']),
      ...mapGetters('exchange', ['getToken']),
      
      doCommand(e) {
        if (e.code == 'Escape') { this.goTo('settokens'); }
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
            this.goTo('settokens');
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
            this.goTo('settokens');
          }
        }
      },
    },
  }
</script>
