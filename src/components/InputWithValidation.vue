<template>
  <div class="relative flex flex-1 items-center rounded-xl focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen dark:text-gray-500 text-gray-400">
    <input type="text" v-model="input" :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none' : 'ring-black ring-opacity-5 focus:ring-oswapGreen ring-1 focus:outline-none'" class="flex flex-1 z-20 bg-gray-100 rounded-xl py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount...">
    <slot />
    <!-- display errors -->
    <transition name="invalid-input-body">
      <div v-if="this.invalidInput" class="flex z-10 w-full pt-10 absolute py-2 my-2 top-0 left-0 bg-red-400 rounded-xl">
        <transition-group tag="div" name="invalid-input-list" class="relative flex flex-col space-y-2">
          <div v-for="(error, index) in this.errors" :key="index" class="text-xs text-gray-50 mx-3 flex">
            {{error}}
          </div>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'InputWithValidation',
    props: {
      input: String,
      errors: Object,
    },
    watch: {
      input(value) {
        this.$emit('catchInput', value)
      }
    },
    computed: {
      invalidInput() {
        if (Object.keys(this.errors).length > 0) {
          return true
        } else { 
          return false
        }
      }
    }
  }
</script>