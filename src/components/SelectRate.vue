<template>
  <p @click="selectRate()" :class="this.picked === this.rate ? 'border-l-2 border-oswapGreen' : this.hover + ' ' + this.darkHover" class="cursor-pointer st5 p-1 px-2 rounded-lg text-xs">{{this.rate}}%</p>
</template>

<script>
  export default {
    name: 'SelectRate',
    props: {
      rate: String,
      picked: String,
      hover: String,
      darkHover: String,
    },
    methods: {
      selectRate() {
        this.$emit('selectRate', this.rate)
      }
    }
  }
</script>