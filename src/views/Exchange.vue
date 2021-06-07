<template>
  <div id="exchange" class="relative max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500">
    <!-- Transaction Toaster -->

    <!-- Token Selection -->
    <Swap />

    <!-- Warning Messages -->
    <Warning />

    <!-- Calculates for Swapping -->
    <!-- <Swapper /> -->
  </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'
  import Swapper from '@/components/exchange/Swapper'
  import Warning from '@/components/exchange/Warning'

  export default {
    name: 'Exchange',
    components: {
      Swap,
      Swapper,
      Warning
    },
  }
</script>