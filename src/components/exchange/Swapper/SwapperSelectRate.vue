<template>
  <p @click="selectRate()" :class="this.picked === this.rate ? 'border-l-2 border-oswapGreen' : 'hover:bg-gray-50 dark:hover:bg-gray-500'" class="cursor-pointer p-1 px-2 rounded-lg text-xs dark:text-gray-300 dark:bg-gray-600 bg-gray-100">{{this.rate}}%</p>
</template>

<script>
  export default {
    name: 'SwapperSelectRate',
    props: {
      rate: String,
      picked: String
    },
    methods: {
      selectRate() {
        this.$emit('selectRate', this.rate)
      }
    }
  }
</script>