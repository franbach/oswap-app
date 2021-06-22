<template>
  <div class="tooltip-me-root" @mouseenter="showMe()" @mouseleave="unshowMe()">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tooltipMe',
    props: {
      name: String,
    },
    methods: {
      showMe() {
        let obj = this.$el.querySelector('[tooltip]')
        obj.classList.remove("tooltip-me-off")
        obj.classList.remove("tooltip-me-hide")
        obj.classList.add("tooltip-me-show")
      },
      unshowMe() {
        let obj = this.$el.querySelector('[tooltip]')
        obj.classList.remove("tooltip-me-show")
        obj.classList.add("tooltip-me-hide")
        obj.classList.add("tooltip-me-off")
      }
    }
  }
</script>

<style lang="scss">

  .tooltip-me-root {
    position: relative;
    cursor: default;
  }

</style>