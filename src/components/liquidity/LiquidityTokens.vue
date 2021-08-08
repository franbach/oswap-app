<template>  
  <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 ss:w-80 xs:w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-tint text-xl dark:text-gray-400"></i>
      <p class="text-sm dark:text-gray-400">Liquidity</p>
    </div>
    <!-- Token1 Selection Button -->
    <TokenSelect @click="selectToken('token1')" whichToken="token1" />
    <!-- Token Link -->
    <TokenLink />
    <!-- Token2 Selection Button -->
    <TokenSelect @click="selectToken('token2')" whichToken="token2" />
    <!-- Reset tokens selection or Next -->
    <LiquidityTokenButtons />
  </div>
</template>

<script>
  import TokenSelect  from '@/components/TokenSelect';
  import TokenLink  from '@/components/TokenLink';
  import LiquidityTokenButtons from '@/components/liquidity/LiquidityTokenButtons';

  export default {
    name: 'LiquidityTokens',
    components: {
      TokenSelect,
      TokenLink,
      LiquidityTokenButtons
    },
    methods: {
      selectToken(token) {
        this.$emit('triggerModal', token)
      }
    }
  }
</script>