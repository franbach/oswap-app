<template>
  <svg class="strokeAmount" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="this.size + 'px'" :height="this.size + 'px'">
    <defs>
      <linearGradient :id="`strokeGradientColor_${this.name}`">
        <stop offset="0%" :stop-color="this.from" />
        <stop offset="100%" :stop-color="this.to" />
      </linearGradient>
    </defs>
    <circle :id="this.name" :cx="this.size / 2" :cy="this.size / 2" :r="this.size / 2 - (this.stroke / 2)" :stroke-linecap="this.linecap" :style="`stroke: url(#strokeGradientColor_${this.name}); stroke-width: ${this.stroke}; transform: rotate(${this.startAt}deg)`" />
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
      stroke: Number,
      from: String,
      to: String,
      linecap: String
    },
    watch: {
      amount() {
        this.updateCounter();
      },
      output() {
        if (this.output > this.amount) {
          clearInterval(this.counter);
        }
      }
    },
    data() {
      return {
        circle: null,
        radius: null,
        circumference: null,
        counter: null,
        output: 0,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.circle = document.getElementById(this.name);
        this.radius = this.circle.r.baseVal.value;
        this.circumference = (2 * Math.PI) * this.radius;
  
        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = `${this.circumference}`;
        this.circle.style.stroke = this.stroke;
  
        this.updateCounter();
      })
    },
    methods: {
      updateCounter() {
        let speed = 200
        let increment = this.amount / speed

        this.counter = setInterval(() => {
          let offset = this.circumference - this.output / 100 * this.circumference;
          this.circle.style.strokeDashoffset = offset

          this.output = this.output + increment
        }, increment)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .strokeAmount {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;

    circle {
      fill: none;
      transition: 0.35s stroke-dashoffset;
      // axis compensation
      transform-origin: 50% 50%;
    }
  }
</style>