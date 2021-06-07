<template>
  <div v-if="(this.warning('highImpact').show || this.warning('error').show)" class="flex items-center w-96 p-3 mt-6 px-3 bg-red-50 dark:bg-gray-600 space-x-3 rounded-xl ring-1 ring-red-300 animate__animated animate__fadeIn">
    <div class="flex justify-start h-full">
      <i class="las la-exclamation-triangle text-2xl text-red-300"></i>
    </div>
    <div class="flex flex-col space-y-3">
      <div v-if="this.warning('highImpact').show" class="flex justify-start animate__animated animate__fadeIn">
        <p class="text-sm font-extralight text-red-300 break-all">{{this.warning('highImpact').msg}}</p>
      </div>
      <div v-if="this.warning('error').show" class="flex justify-start animate__animated animate__fadeIn">
        <p class="text-sm font-extralight break-all dark:text-gray-300">{{this.warning('error').msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Warning',
    components: {},
    computed: {
      ...mapGetters('exchange/swapper', ['warning'])
    },
    methods: {
    }
  }
</script>