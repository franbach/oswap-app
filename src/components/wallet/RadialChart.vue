<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="relative flex flex-none items-center justify-center" :style="`width: ${this.size}px; height: ${this.size}px;`">
      
      <p class="flex font-bold rounded-full" :style="`font-size: ${this.size / 5}px`" >
        Total
      </p>

      <RadialChartProgress v-for="(source, index) in this.sourceData" :key="index" :name="index" :amount="source.amount" :linecap="this.linecap" :from="source.from" :to="source.to" :size="this.size" :stroke="this.stroke" :startAt="this.parseStart(this.sourceData, index)"/>

      <svg class="strokeBackground" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="this.size + 'px'" :height="this.size + 'px'">
        <defs>
          <linearGradient id="strokeBackgroundColor">
            <stop offset="0%" stop-color="#f3f3f330" />
            <stop offset="100%" stop-color="#f3f3f330" />
          </linearGradient>
        </defs>
        <circle class="strokeBackground" :cx="this.size / 2" :cy="this.size / 2" :r="this.size / 2 - (this.stroke / 2)" stroke-linecap="round"  :style="`stroke-width: ${this.stroke};`" />
      </svg>

    </div>
  </div>
</template>

<script>
  import RadialChartProgress from '@/components/wallet/RadialChartProgress'

  export default {
    name: 'RadialChart',
    components: {
      RadialChartProgress
    },
    props: {
      size: Number,
      stroke: Number,
      linecap: String,
      sourceData: Object
    },
    data() {
      return {
        amounts: []
      }
    },
    mounted() {
    },
    methods: {
      parseStart(source, index) {
        if (index == 0) {
          this.amounts.push(source[index].amount);
          return 0
        } else {
          this.amounts.push(source[index].amount + source[index - 1].amount);
          return this.amounts[index - 1] * 360 / 100
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .strokeBackground {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    circle {
      fill: none;
      stroke: url(#strokeBackgroundColor);
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  }
</style>