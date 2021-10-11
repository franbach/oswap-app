<template>
  <!-- shows if not selected any network V-IF -->
  <div v-if="!getToNetwork">
  
      <div class="flex flex-1 h-10 w-32 items-center justify-center ring-1 ring-black dark:ring-gray-600 ring-opacity-10 hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer overflow-hidden rounded-xl space-x-2">
        <p class="text-sm dark:text-gray-200">To</p>
        <i class="las la-angle-down dark:text-gray-200"></i>
      </div>

  
  </div>
  
  <!-- shows if network is selected V-ELSE -->
  <div v-else >

      <div class="flex flex-1 h-10 w-32 min-w-0 items-center justify-center text-gray-500 dark:text-gray-300 border border-oswapGreen-dark dark:border-oswapGreen px-3 rounded-xl space-x-2 overflow-hidden hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
        <img :src="getToNetwork.icon" class="h-4" alt="">
        <p class="text-xs text-el">{{getToNetwork.name}}</p>
      </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js';

  export default {
    name: 'To',
    data() {
      return {}
    },
    computed: {
      ...mapGetters('migrate', ['getNetworks', 'getToNetwork', 'getFromNetwork']),
    },
    methods: {
      ...mapActions('migrate', ['setToNetwork']),

      selectNetwork(network) {
          this.setToNetwork(network)
      }
    }
  }
</script>