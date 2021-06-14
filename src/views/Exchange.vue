<template>
  <div id="exchange" class="relative max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500">
    <!-- Steps between Components -->

    <!-- Swap -->
    <transition name="swap" appear>
      <div v-if="this.getStepState('swap')" class="absolute">
        <Swap @triggerModal="triggerModal" />
      </div>
    </transition>

    <!-- Token Selection Modal -->
    <div v-if="this.getStepState('swapmodal')" @click="goTo('swap')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-20"></div>
    <transition name="modal" appear>
      <div v-if="this.getStepState('swapmodal')">
        <SwapModal :whichToken="whichToken" />
      </div>
    </transition>

    <!-- Swapper -->
    <transition name="swap" appear>
      <div v-if="this.getStepState('swapper')" class="absolute">
        <Swapper />
      </div>
    </transition>

  </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'
  import SwapModal from '@/components/exchange/SwapModal'
  import Swapper from '@/components/exchange/Swapper'

  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Exchange',
    components: {
      Swap,
      SwapModal,
      Swapper,
    },
    data() {
      return {
        whichToken: ''
      }
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
    methods: {
      ...mapActions('exchange', ['goTo']),

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