<template>
  <svg class="strokeAmount" viewBox="0 0 36 36" :width="size + 'px'" :height="size + 'px'">

    <defs>
      <linearGradient :id="`strokeGradientColor_${name}`">
        <stop offset="0%" :stop-color="from" />
        <stop offset="100%" :stop-color="to" />
      </linearGradient>
    </defs>

    <path :id="name" :stroke-dasharray="`${amount}, 100`" :stroke-width="`${stroke}`" :stroke-linecap="`${linecap}`"
      :style="`stroke: url(#strokeGradientColor_${name}); transform: rotate(${startAt}deg);`"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
  </svg>
</template>

<script>
  export default {
    name: 'RadialChartProgress',
    props: {
      name: Number,
      amount: {
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
  }
</script>

<style lang="scss" scoped>
  .strokeAmount {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;

    path {
      fill: none;
      transform-origin: 50% 50%;
      animation: progress 2s ease-out forwards;
    }
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
</style>