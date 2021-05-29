<template>
  
  <div id="exchangeBodyLeft" class="flex flex-col w-56">
    <div class="flex relative">
      <div class="flex flex-none items-center justify-center rounded-lg border-oswapGreen glow-oswapGreen-lg border-2 h-24 w-24 dark:bg-oswapDark-gray bg-opacity-50 bg-gray-300">
        Token 1
      </div>
      <div class="flex flex-col absolute pl-28 px-3 dark:text-oswapBlue-light text-oswapGreen-dark">
        <p>Network:</p>
        <p class="dark:text-gray-300 text-gray-500 text-sm">BSC Bridged Token</p>
        <p>Token:</p>
        <p class="dark:text-gray-300 text-gray-500 text-sm">BNB</p>
      </div>
    </div>
    <div class="flex items-center justify-center h-16 w-24">
      <i class="las la-exchange-alt text-4xl text-oswapBlue-light transform rotate-90"></i>
    </div>
    <div class="flex relative">
      <div class="flex flex-none items-center justify-center rounded-lg border-oswapGreen glow-oswapGreen-lg border-2 h-24 w-24 dark:bg-oswapDark-gray bg-opacity-50 bg-gray-300">
        Token 2
      </div>
      <div class="flex flex-col absolute pl-28 px-3 dark:text-oswapBlue-light text-oswapGreen-dark">
        <p>Network:</p>
        <p class="dark:text-gray-300 text-gray-500 text-sm">Harmony</p>
        <p>Token:</p>
        <p class="dark:text-gray-300 text-gray-500 text-sm">OSWAP</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SwapDisplace'
  }
</script>