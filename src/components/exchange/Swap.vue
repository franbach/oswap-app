<template>  
  <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-random text-xl dark:text-gray-400"></i>
      <p class="text-sm dark:text-gray-400">Swap</p>
    </div>
    <!-- Token1 Selection Button -->
    <TokenSelect @click="selectToken('token1')" whichToken="token1" />
    <!-- Tokens Switch Button -->
    <TokenSwitch />
    <!-- Token2 Selection Button -->
    <TokenSelect @click="selectToken('token2')" whichToken="token2" />
    <!-- Reset tokens selection or Next -->
    <SwapTokenButtons />
  </div>
</template>

<script>
  import TokenSelect  from '@/components/TokenSelect';
  import TokenSwitch  from '@/components/TokenSwitch';
  import SwapTokenButtons from '@/components/exchange/Swap/SwapTokenButtons';

  export default {
    name: 'Swap',
    components: {
      TokenSelect,
      TokenSwitch,
      SwapTokenButtons
    },
    methods: {
      selectToken(token) {
        this.$emit('triggerModal', token)
      }
    }
  }
</script>