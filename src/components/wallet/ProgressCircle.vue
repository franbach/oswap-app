<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="relative flex flex-none items-center justify-center" :style="`width: ${this.size}px; height: ${this.size}px;`">
      
      <p class="flex font-bold rounded-full" :style="`font-size: ${this.size / 5}px`" >{{Math.round(this.output.toFixed(2))}}%</p>

      <svg class="strokeAmount" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="this.size + 'px'" :height="this.size + 'px'">
        <defs>
          <linearGradient :id="`strokeGradientColor_${this.name}`">
            <stop offset="0%" :stop-color="this.from" />
            <stop offset="100%" :stop-color="this.to" />
          </linearGradient>
        </defs>
        <circle :id="this.name" :cx="this.size / 2" :cy="this.size / 2" :r="this.size / 2 - (this.stroke / 2)" stroke-linecap="round" :style="`stroke: url(#strokeGradientColor_${this.name}); stroke-width: ${this.stroke};`" />
      </svg>

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
  export default {
    name: 'ProgressCircle',
    props: {
      amount: {
        type: Number,
        default: 1
      },
      size: Number,
      stroke: Number,
      from: String,
      to: String
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
        name: new Date().getTime(),
        circle: null,
        radius: null,
        circumference: null,
        counter: null,
        output: 0
      }
    },
    mounted() {
      this.circle = document.getElementById(this.name);
      this.radius = this.circle.r.baseVal.value;
      this.circumference = this.radius * 2 * Math.PI;

      this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
      this.circle.style.strokeDashoffset = `${this.circumference}`;
      this.circle.style.stroke = this.stroke;

      this.updateCounter();
    },
    methods: {
      updateCounter() {
        this.counter = setInterval(() => {
          let speed  = 200
          let increment = this.amount / speed

          let offset = this.circumference - this.output / 100 * this.circumference;
          this.circle.style.strokeDashoffset = offset

          this.output = this.output + increment
        }, 10)
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
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  }

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