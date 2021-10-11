<template>
  <defs class="svgPair">
    <linearGradient :id="`strokeGradientColor_${name}`">
      <stop offset="0%" :stop-color="from" />
      <stop offset="100%" :stop-color="to" />
    </linearGradient>
  </defs>
  
  <path class="svgPair" ref="svgPath" @mouseover="showTooltip" @mouseleave="closeTooltip" :id="name" :stroke-dasharray="`${percent}, 100`" :stroke-width="`${stroke}`" :stroke-linecap="`${linecap}`"
    :style="`stroke: url(#strokeGradientColor_${name}); transform: rotate(${startAt}deg);`"
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
  />

</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'RadialChartProgressItem',
    emits: ['showTooltip'],
    props: {
      name: String,
      amount: {
        type: Number,
        default: 1
      },
      percent: {
        type: Number,
        default: 1
      },
      startAt: {
        type: Number,
        default: 0
      },
      size: Number,
      stroke: String,
      from: String,
      to: String,
      linecap: String
    },
    setup() {
      const svgPath = ref(null)
      return {
        svgPath
      }
    },
    methods: {
      showTooltip() {
        let value = { name: this.name, value: this.amount,  percentage: this.percent };
        this.svgPath.style.strokeWidth = this.stroke * 1.25
        this.$emit('showTooltip', value)
      },
      closeTooltip() {
        this.svgPath.style.strokeWidth = this.stroke
        this.$emit('showTooltip')
      }
    }
  }
</script>

<style lang="scss" scoped>
  path {
    fill: none;
    transform-origin: 50% 50%;
    animation: progress 2s ease-out forwards;
  }

  path:hover {
    opacity: 0.5;
    transition: all 0.4s ease 0s;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
</style>