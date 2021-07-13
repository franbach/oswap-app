<template>
  <!-- back to Swap -->
  <div @click="back" class="flex items-center space-x-2 rounded-full group hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 pr-3 cursor-pointer">
    <i class="las la-arrow-left text-lg p-2 text-gray-200 dark:text-gray-600 rounded-full bg-oswapGreen dark:bg-oswapBlue-light dark:group-hover:bg-oswapGreen group-hover:bg-oswapGreen-dark"></i>
    <p class="text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SwapperBackButton',
    methods: {
      ...mapActions('exchange', ['goTo']),
      ...mapActions('exchange/swapper', ['resetButton']),

      back() {
        this.resetButton('approve');
        this.resetButton('swap');

        this.goTo('swap');
      }
    }
  }
</script>