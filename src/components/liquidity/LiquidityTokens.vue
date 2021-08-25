<template>  
  <div class="flex flex-col p-4 st5 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-tint text-xl"></i>
      <p class="text-sm">Liquidity</p>
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
      LiquidityTokenButtons,
    },
    methods: {
      selectToken(token) {
        this.$emit('triggerModal', token)
      }
    }
  }
</script>