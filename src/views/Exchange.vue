<template>
  <div id="exchange" class="max-w-screen-xl mx-auto flex items-center justify-center h-full xl:px-0 px-3 text-gray-500">
    <Swap />
  </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'

  export default {
    name: 'Exchange',
    components: {
      Swap,
    },
  }
</script>