<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="relative flex flex-none items-center justify-center" :style="`width: ${size}px; height: ${size}px;`">
      
      <p class="flex font-bold rounded-full" :style="`font-size: ${size / 5}px`" >{{Math.round(amount.toFixed(2))}}%</p>

      <svg class="strokeAmount" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="size + 'px'" :height="size + 'px'">
        <defs>
          <linearGradient :id="`strokeGradientColor_${name}`">
            <stop offset="0%" :stop-color="from" />
            <stop offset="100%" :stop-color="to" />
          </linearGradient>
        </defs>
        <circle :id="name" :cx="size / 2" :cy="size / 2" :r="size / 2 - (stroke / 2)" stroke-linecap="round" :style="`stroke: url(#strokeGradientColor_${name}); stroke-width: ${stroke}; transform: rotate(${startAt}deg)`" />
      </svg>

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
  export default {
    name: 'ProgressCircleStatic',
    props: {
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
      to: String
    },
    watch: {
      amount() {
        this.updateCounter();
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
      this.$nextTick(() => {
        this.circle = document.getElementById(this.name);
        this.radius = this.circle.r.baseVal.value;
        this.circumference = (2 * Math.PI) * this.radius;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = `${this.circumference}`;
        this.circle.style.stroke = this.stroke;

        this.updateCounter();
      });
    },
    methods: {
      updateCounter() {
        let offset = this.circumference - this.amount / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset
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
      transform: rotate(0deg);
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