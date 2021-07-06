<template>
  <!-- Swap disabled -->
  <transition tag="div" name="swap-btn" class="inline-block absolute right-0">
    <div v-if="state == 'disabled'" class="flex items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <p class="text-sm text-gray-300 dark:text-gray-600">Swap</p>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Swap Ready -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-0">
    <div v-if="state == 'ready'" class="flex items-center group border border-oswapGreen-dark dark:hover:bg-oswapGreen hover:bg-oswapGreen space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-pointer">
      <p class="text-sm text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Swap</p>
      <i class="las la-random text-xl text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
    </div>
  </transition>

  <!-- Swap Executing -->
  <transition tag="div" name="swap-btn" class="inline-block absolute right-0">
    <div v-if="state == 'executing'" class="flex items-center border border-oswapGreen-dark space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-wait">
      <p class="text-sm text-oswapGreen-dark">Swap</p>
      <i class="las la-sync text-xl animate-spin text-oswapGreen-dark"></i>
    </div>
  </transition>

  <!-- Swap Executed -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-0">
    <div v-if="state == 'executed'" class="flex items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <p class="text-sm text-oswapGreen">Swap</p>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>
  export default {
    name: 'SwapperApprove',
    props: {
      state: String
    }
  }
</script>