<template>
  <div id="exchange" class="relative max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500">
    <!-- Transaction Toaster -->

    <!-- Steps between Components -->
    <transition-group name="swap" appear>
      <!-- Token Selection -->
      <div v-if="this.getStepState('swap')" key="swap" class="absolute">
        <Swap />
      </div>

      <!-- Calculates for Swapping -->
      <div v-else-if="this.getStepState('swapper')" key="swapper" class="absolute">
        <Swapper />
      </div>
    </transition-group>

    <!-- Warning Messages -->
    <Warning/>
  </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'
  import Swapper from '@/components/exchange/Swapper'
  import Warning from '@/components/exchange/Warning'

  import { mapGetters } from 'vuex';

  export default {
    name: 'Exchange',
    components: {
      Swap,
      Swapper,
      Warning
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
  }
</script>