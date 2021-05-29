<template>
  <div id="exchange" class="max-w-screen-xl mx-auto flex h-full xl:px-0 px-3 text-gray-500">
    <transition
      enter-active-class="transform transition duration-200 ease-out"
      enter-from-class="translate-x-4 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-4 opacity-0"
    appear>
      <div class="flex flex-1 flex-col pb-12">
        <div id="subheader" class="flex flex-col px-2 h-24 items-start">
          <p class="text-3xl dark:text-gray-300">Swap Tokens</p>
          <p class="text-xl text-gray-400">Chose tokens from different networks</p>
        </div>
        <div id="exchangeBody" class="flex h-full shadow-xl p-2 rounded-lg bg-gray-400 bg-opacity-5">
          <SwapDisplace :token1="token1" :token2="token2" />
          <SwapTokens />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import SwapDisplace from '@/components/exchange/SwapDisplace'
  import SwapTokens from '@/components/exchange/SwapTokens'

  export default {
    name: 'Exchange',
    props: {
      token1: Object,
      token2: Object
    },
    components: {
      SwapDisplace,
      SwapTokens
    }
  }
</script>
