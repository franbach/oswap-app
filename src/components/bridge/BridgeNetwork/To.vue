<template>
  <!-- shows if not selected any network V-IF -->
  <div v-if="!getToNetwork">
    <tooltip-me>
      <div class="flex flex-1 h-10 w-32 items-center justify-center ring-1 ring-black dark:ring-gray-600 ring-opacity-10 hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer overflow-hidden rounded-xl space-x-2">
        <p class="text-sm dark:text-gray-200">To</p>
        <i class="las la-angle-down dark:text-gray-200"></i>
      </div>
      <tooltip-me-content :options="tooltip" class="flex w-44 rounded-xl shadow-xl ring-1 ring-black dark:ring-gray-600 ring-opacity-25 bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300">
        <div class="flex flex-1 flex-col text-xs">
          <div v-for="(network, index) in getNetworks" :key="index" class="flex flex-1 cursor-pointer">
            <div @click="selectNetwork(network)" class="flex flex-1 items-center space-x-3 p-3 group hover:bg-slightGray dark:hover:bg-oswapDark-gray rounded-xl">
              <img :src="network.icon" class="h-4" alt="">
              <p>{{network.name}}</p>
            </div>
          </div>
        </div>
      </tooltip-me-content>
    </tooltip-me>
  </div>
  
  <!-- shows if network is selected V-ELSE -->
  <div v-else >
    <tooltip-me>
      <div class="flex flex-1 h-10 w-32 min-w-0 items-center justify-center text-gray-500 dark:text-gray-300 border border-oswapGreen-dark dark:border-oswapGreen px-3 rounded-xl space-x-2 overflow-hidden hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
        <img :src="getToNetwork.icon" class="h-4" alt="">
        <p class="text-xs text-el">{{getToNetwork.name}}</p>
      </div>
      <tooltip-me-content :options="tooltip" class="flex w-44 rounded-xl shadow-xl ring-1 ring-black dark:ring-gray-600 ring-opacity-10 bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300">
        <div class="flex flex-1 flex-col text-xs">
          <div v-for="(network, index) in getNetworks" :key="index" class="flex flex-1 cursor-pointer">
            <div @click="selectNetwork(network)" class="flex flex-1 items-center space-x-3 p-3 group hover:bg-slightGray dark:hover:bg-oswapDark-gray rounded-xl">
              <img :src="network.icon" class="h-4" alt="">
              <p>{{network.name}}</p>
            </div>
          </div>
        </div>
      </tooltip-me-content>
    </tooltip-me>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js';

  export default {
    name: 'To',
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'bottom',
          color: 'rgba(24, 213, 187, 1)',
          hover: true,
          arrow: false,
          speed: 200,
          shift: 63
        },
      }
    },
    computed: {
      ...mapGetters('migrate', ['getNetworks', 'getToNetwork', 'getFromNetwork']),
    },
    methods: {
      ...mapActions('migrate', ['setToNetwork']),

      selectNetwork(network) {
        if (this.getFromNetwork && this.getFromNetwork.name === network.name) {
          toastMe('warning', {
            title: 'Network Selection',
            msg: `You already picked ${network.name} ! Choose another.`,
            link: false,
          })
        } else {
          this.setToNetwork(network)  
        }
      }
    }
  }
</script>