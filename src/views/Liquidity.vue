<template>
  <div id="liquidity" class="relative max-w-screen-xl mx-auto flex flex-1 items-center justify-center xl:px-0 px-3 text-gray-500">
    <!-- Select Tokens -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('settokens')" class="absolute">
        <LiquidityTokens @triggerModal="triggerModal" />
      </div>
    </transition>
    <!-- Token Selection Modal -->
    <!-- Modal backdrop must be outside of transition tag otherwise it appears only when modal animation ends -->
    <div v-if="this.getStepState('selectmodal')" @click="goTo('settokens')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-30"></div>
    <transition name="modal-fall" appear>
      <div v-if="this.getStepState('selectmodal')">
        <LiquidityModal :whichToken="whichToken" />
      </div>
    </transition>
    <!-- Add/Remove Liquidity -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('addremoveliquidity')" class="absolute">
        <AddRemoveLiquidity />
      </div>
    </transition>
  </div>
</template>

<script>
  import LiquidityTokens from '@/components/liquidity/LiquidityTokens';
  import LiquidityModal from '@/components/liquidity/LiquidityModal';
  import AddRemoveLiquidity from '@/components/liquidity/AddRemoveLiquidity';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Liquidity',
    components: {
      LiquidityTokens,
      LiquidityModal,
      AddRemoveLiquidity
    },
    data() {
      return {
        whichToken: ''
      }
    },
    computed: {
      ...mapGetters('liquidity/buttons', ['getStepState'])
    },
    methods: {
      ...mapActions('liquidity/buttons', ['goTo']),

      // Open the modal for token selection.
      // It sends info to the modal of which token is being
      // selected(token1 or token2) through :whichToken binding.
      triggerModal(token) {
        this.whichToken = token
        this.goTo('selectmodal')
      }
    }
  }
</script>
