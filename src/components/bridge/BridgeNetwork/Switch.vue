<template>
  <div v-if="this.getFromNetwork && this.getToNetwork" @click="this.switchNetwork"
    class="flex items-center justify-center h-10 w-10 text-oswapGreen cursor-pointer hover:bg-slightGray dark:hover:bg-slightDark rounded-xl">
    <i class="las la-angle-right text-2xl"></i>
  </div>

  <!-- disabled -->
  <div v-else class="flex items-center justify-center h-10 w-10 text-gray-300 dark:text-gray-500 select-none">
    <i class="las la-angle-right text-2xl"></i>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Switch',
    computed: {
      ...mapGetters('migrate', ['getFromNetwork', 'getToNetwork'])
    },
    methods: {
      ...mapActions('migrate', ['switchNetwork'])
    }
  }
</script>