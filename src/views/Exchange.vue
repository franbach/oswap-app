<template>
  <div id="exchange" class="relative max-w-screen-xl mx-auto flex flex-1 items-center justify-center xl:px-0 px-3 text-gray-500">
    <!-- Steps between Components -->

    <!-- Swap -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('swap')" class="absolute">
        <Swap @triggerModal="triggerModal" />
      </div>
    </transition>

    <!-- Token Selection Modal -->
    <!-- Modal backdrop must be outside of transition tag otherwise it appears only when modal animation ends -->
    <div v-if="this.getStepState('swapmodal')" @click="goTo('swap')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-30"></div>
    <transition name="modal-fall" appear>
      <div v-if="this.getStepState('swapmodal')">
        <SwapModal :whichToken="whichToken" />
      </div>
    </transition>

    <!-- Swapper -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('swapper')" class="absolute">
        <Swapper :key="forceR" @reload="reload"/>
      </div>
    </transition>

  </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'
  import SwapModal from '@/components/exchange/SwapModal'
  import Swapper from '@/components/exchange/Swapper'

  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Exchange',
    components: {
      Swap,
      SwapModal,
      Swapper,
    },
    data() {
      return {
        whichToken: '',
        forceR: 0 
      }
    },
    metaInfo: {
       title: 'Foo Bar',
    
      charset: 'utf-8' ,
       name: 'viewport',
        content: 'width=device-width, initial-scale=1',
        title: 'Openswap Exchange',
        description: 'Openswap Decentralized Exchange on Harmony Blockchain. Harmony DEX',
        keywords: 'Dex, Decentralised Exchange, dex, blockchain, harmony, openswap, Uniswap Fork',
        robots: 'index, follow'
         
    
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
    methods: {
      ...mapActions('exchange', ['goTo']),
      reload(value){
       this.forceR++
      },
      // Open the modal for token selection.
      // It sends info to the modal of which token is being
      // selected(token1 or token2) through :whichToken binding.
      triggerModal(token) {
        this.whichToken = token
        this.goTo('swapmodal')
      }
    }
  }
</script>