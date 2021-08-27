<template>
  <div v-if="this.getFromNetwork && this.getToNetwork" @click="this.updateBalances()"
    class="flex items-center justify-center h-10 w-10 text-oswapGreen cursor-pointer hover:bg-slightGray dark:hover:bg-slightDark rounded-xl">
    <i class="las la-exchange-alt text-2xl"></i>
  </div>

  <!-- disabled -->
  <div v-else class="flex items-center justify-center h-10 w-10 text-gray-300 dark:text-gray-500 select-none">
    <i class="las la-exchange-alt text-2xl"></i>
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
      ...mapActions('migrate', ['switchNetwork']),
      updateBalances(){
        this.switchNetwork()
        this.$emit('updateBalances')
      }
    }
  }
</script>