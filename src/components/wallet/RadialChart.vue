<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="relative flex flex-none items-center justify-center" :style="`width: ${size}px; height: ${size}px;`">
      
      <p class="flex font-bold rounded-full" :style="`font-size: ${size / 5}px`" >
        Total
      </p>
<!-- <RadialChart :size="180" stroke="1.5" linecap="round" :sourceData="this.testData" /> -->
      <RadialChartProgress v-for="(source, index) in sourceData" :key="index" :name="createName(index)" :amount="source.amount" :linecap="linecap" :from="source.from" :to="source.to" :size="size" :stroke="stroke" :startAt="parseStart(sourceData, index)"/>

      <svg class="strokeBackground" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="size + 'px'" :height="size + 'px'">
        <defs>
          <linearGradient id="strokeBackgroundColor">
            <stop offset="0%" stop-color="#f3f3f330" />
            <stop offset="100%" stop-color="#f3f3f330" />
          </linearGradient>
        </defs>
        <circle class="strokeBackground" :cx="size / 2" :cy="size / 2" :r="size / 2 - (stroke / 2)" stroke-linecap="round"  :style="`stroke-width: ${stroke};`" />
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
      stroke: String,
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
          this.amounts.push(source[index].amount + this.amounts[index - 1]);
          return this.amounts[index - 1] * 360 / 100;
        }
      },
      createName(index) {
        return (new Date().getTime() + `_${index}`);
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