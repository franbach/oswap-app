<template>
  <!-- Approve Ready -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="state == 'active'" class="flex items-center border group dark:hover:bg-oswapGreen hover:bg-oswapGreen border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full group dark:bg-oswapDark-gray bg-gray-100 cursor-pointer">
      <p class="text-sm text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approve</p>
      <i class="las la-check-circle text-xl text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
    </div> 
  </transition>

  <!-- Approve Loading -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="state == 'loading'" class="flex items-center border border-oswapGreen-dark space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-wait">
      <p class="text-sm text-oswapGreen-dark">Approve</p>
      <i class="las la-sync text-xl animate-spin text-oswapGreen-dark"></i>
    </div>
  </transition>

  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="state == 'disabled'" class="flex items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
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