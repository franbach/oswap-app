<template>
  <transition tag="div" name="warning-body" class="flex overflow-hidden mt-3 items-start w-full px-3 bg-red-50 dark:bg-gray-600 space-x-3 rounded-xl ring-1 ring-red-300">
    <div v-if="this.haveWarnings">
      <div class="flex justify-start my-3">
        <i class="las la-exclamation-triangle text-xl text-red-300"></i>
      </div>

      <!-- display warnings -->
      <transition-group tag="div" name="warning-body-item" class="flex flex-col space-y-2 my-3 overflow-hidden">
        <div v-for="(warning, index) in this.warnings" :key="index" class="flex justify-start">
          <p class="text-sm font-extralight text-red-300 break-words">
            {{warning}}
          </p>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Warning',
    props: {
      warnings: Object
    },
    computed: {
      haveWarnings() {
        if (Object.keys(this.warnings).length > 0) {
          return true
        } else { 
          return false
        }
      }
    }
  }
</script> 