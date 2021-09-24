<template>
  <!-- line -->
  <div class="flex w-full h-12 items-center justify-between">
    <div class="flex">
      <!-- dot -->
      <div class="flex items-center justify-center h-12 mr-3">
        <div :class="token.Symbol[0] == 'e' ? 'bg-indigo-600' : (token.Symbol[0] == 'b' ? 'bg-yellow-500' : 'bg-oswapGreen')  " class="flex h-4 w-4 rounded-full"></div>
      </div>
      <!-- asset symbol -->
      <div class="flex items-center justify-center">
        <p class="text-sm">{{token.Symbol}}</p>
      </div>
      <!-- asset network -->
      <div class="flex items-center justify-center ml-3">
        <p class="text-sm text-gray-400">{{token.network}}</p>
      </div>
    </div>

    <div class="flex">
      <!-- asset total -->
      <div class="flex items-center justify-center ml-3">
        <p class="text-sm">{{token.total}} {{token.Symbol}}</p>
      </div>
      <!-- asset total worth -->
      <div class="flex items-center justify-center ml-3">
        <p class="text-sm font-bold">$ {{token.totalWorth}}</p>
      </div>
      <!-- buy more -->
      <button class="flex items-center justify-center ml-3 rounded-full border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
        <p class="text-sm p-1 px-3">buy more</p>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TokenItem',
    props: {
      token: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>