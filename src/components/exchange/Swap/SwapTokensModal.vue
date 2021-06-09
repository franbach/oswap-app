<template>
  <!-- Backdrop Modal -->
  <div v-show="select.modal" @click="closeModal()" style="backdrop-filter: blur(3px)" class="fixed w-screen h-screen inset-0 z-20"></div>
  <!-- Modal -->
  <transition name="swap">
    <div v-show="select.modal" style="height: 600px;" class="flex flex-col center-component p-2 z-30 bg-white dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
      <div class="flex items-center mb-2 relative">
        <i class="las la-search absolute left-3 text-2xl text-gray-200 dark:text-gray-600"></i>
        <input type="text" v-model="search" @input="this.retrieveTokens(search)" class="flex flex-1 ring-1 focus:outline-none focus:ring-2 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-2xl py-2 items-center pl-11 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-200" placeholder="Search Token">
        <div @click="closeModal()" class="flex items-center rounded-full">
          <i class="las la-times text-2xl p-2 dark:text-gray-500 dark:hover:text-oswapGreen hover:text-oswapGreen cursor-pointer text-gray-300"></i>
        </div>
      </div>
      <div id="modalTokenList" class="flex rounded-2xl overflow-x-hidden">
        <perfect-scrollbar class="flex flex-1 flex-col space-y-2">
          <div class="flex flex-col bg-gray-50 dark:bg-oswapDark-gray rounded-2xl" v-for="(network, index) in this.retrieveTokens(search)" :key="index" >
            <!-- network name -->
            <div class="flex p-2 rounded-2xl items-center space-x-2">
              <img :src="network.icon" class="h-4" alt="">
              <p class="flex text-sm items-center dark:text-gray-300">{{network.name}}</p>
            </div>
            <!-- icons table -->
            <div class="flex flex-wrap w-full mt-2 px-2">
              <!-- icons -->
              <div @click="selectToken(token)" v-for="(token, idx) in network.tokens" :key="idx" class="flex flex-col space-y-2 w-1/5 h-16 rounded-xl items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer mb-2">
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
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'SwapTokensModal',
    data() {
      return {
        search: ''
      }
    },
    props: {
      select: Object
    },
    computed: {
      ...mapGetters('exchange', ['retrieveTokens']),
    },
    methods: {
      ...mapActions('exchange', ['setToken']),

      selectToken(token) {
        // Action for state.swap mutation
        // 'this.setToken' is a function in the 'exchange.js' state management.
        this.setToken({ tokenRef: this.select.token, token: token });
        
        this.closeModal();
      },

      closeModal() {
        // Resets search field
        this.search = ''
        // Close the modal
        this.select.modal = !this.select.modal
      }
    },
  }
</script>
