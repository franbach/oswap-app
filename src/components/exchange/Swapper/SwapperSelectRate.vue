<template>
  <p @click="selectRate()" :class="this.picked === this.rate ? 'ring-4 ring-gray-50 dark:ring-oswapDark-gray dark:bg-oswapGreen bg-oswapGreen-dark' : 'dark:bg-oswapGreen-dark bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen'" class="cursor-pointer text-gray-50 p-1 px-2 rounded-lg text-xs dark:text-gray-50">{{this.rate}}%</p>
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