<template>
  <div id="migrate" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">
     <!--
    <transition name="horizontal" appear>
      <div class="flex flex-col space-y-4 items-center">
        <img src="@/assets/coming_soon2.png" class="w-64" alt="">
        <p class="text-2xl dark:text-oswapBlue-light uppercase">coming soon !</p>
      </div>
    </transition>
     -->
   <transition name="horizontal" appear>
      <Bridge @triggerModal="triggerModal"/>
    </transition>
    <div v-if="this.getStepState('swapmodal')">
        <BridgeModal :whichToken="whichToken" />
      </div>
   
  </div>
</template>

<script>
  import Bridge from '@/components/bridge/Bridge';
    import BridgeModal from '@/components/bridge/BridgeModal'
import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Migrate',
    components: {
      Bridge,
      BridgeModal
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
    methods: {
      ...mapActions('exchange', ['goTo']),
      triggerModal(token) {
        this.whichToken = token
        this.goTo('swapmodal')
      }
    }
  }
</script>