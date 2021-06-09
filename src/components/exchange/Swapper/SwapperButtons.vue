<template>
  <div class="flex pt-3">
    <!-- Active buttons if tokens selected -->
    <div class="flex flex-1 items-center justify-between">
      <!-- back to Swap -->
      <div @click="goTo('swap')" class="flex items-center space-x-2 rounded-full group hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 pr-3 cursor-pointer">
        <i class="las la-arrow-left text-lg p-2 text-gray-200 dark:text-gray-600 rounded-full bg-oswapGreen dark:bg-oswapBlue-light dark:group-hover:bg-oswapGreen group-hover:bg-oswapGreen-dark"></i>
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
      </div>

      <!-- Move to the next phase button -->
      <div @click="goTo('swap')" class="flex items-center space-x-2 rounded-full group hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 pl-3 cursor-pointer">
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">next</p>
        <i class="las la-arrow-right text-lg p-2 text-gray-200 dark:text-gray-600 rounded-full bg-oswapGreen dark:bg-oswapBlue-light dark:group-hover:bg-oswapGreen group-hover:bg-oswapGreen-dark"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperButtons',
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
    }
  }
</script>