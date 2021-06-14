<template>
  <div class="relative flex flex-1 items-center rounded-xl focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen dark:text-gray-500 text-gray-400">
    <input type="text" v-model="input" :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none' : 'ring-black ring-opacity-5 focus:ring-oswapGreen ring-1 focus:outline-none'" class="flex flex-1 z-30 bg-gray-100 rounded-xl py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount...">
    <slot />
    <!-- display errors -->
    <div v-if="this.invalidInput" class="flex flex-col z-20 w-full pt-10 absolute space-y-2 py-2 my-2 top-0 left-0 bg-red-400 rounded-xl animate__animated animate__fadeIn">
      <div v-for="(error, index) in this.errors" :key="index" class="flex intems-start text-xs mx-2 text-gray-50 animate__animated animate__fadeIn">
        <i class="las la-times mt-1 mr-2"></i>{{error}}
      </div>
    </div>
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