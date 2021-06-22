<template>
  <div :tooltip="`tooltip_${name}`" :style="cssProps" class="tooltip-me tooltip-me-position tooltip-me-off">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tooltipMeContent',
    props: {
      name: String,
      color: String,
      position: String,
      offset: String,
      shift: {
        type: String,
        default: '50'
      },
    },
    computed: {
      cssProps() {
        if (this.position == 'top') {
          return {
            '--top': '',
            '--right': '',
            '--left': '50%',
            '--bottom': '100%',
            '--offset': `0px 0px ${this.offset + "px"} 0px`,
            '--translate': `translate(-${this.shift}%)`,
            '--baseColor': this.color,
            '--colorT': this.color,
            '--colorR': 'transparent',
            '--colorB': 'transparent',
            '--colorL': 'transparent',
            '--arrowT': '100%',
            '--arrowR': '',
            '--arrowB': '',
            '--arrowL': this.shift !== '-50' ? this.shift + "%" : '-50%',
            '--translateArrow': 'translate(-50%)',
            '--animation_hide': 'top-hide',
            '--animation_show': 'top-show'
          }
        }
        if (this.position == 'right') {
          return {
            '--top': '50%',
            '--right': '',
            '--left': '100%',
            '--bottom': '',
            '--offset': `0px 0px 0px ${this.offset + "px"}`,
            '--translate': `translate(0, -${this.shift}%)`,
            '--baseColor': this.color,
            '--colorT': 'transparent',
            '--colorR': this.color,
            '--colorB': 'transparent',
            '--colorL': 'transparent',
            '--arrowT': this.shift !== '-50' ? this.shift + "%" : '-50%',
            '--arrowR': '100%',
            '--arrowB': '',
            '--arrowL': '',
            '--translateArrow': 'translate(0, -50%)',
            '--animation_hide': 'right-hide',
            '--animation_show': 'right-show'
          }
        }
        if (this.position == 'bottom') {
          return {
            '--top': '100%',
            '--right': '',
            '--left': '50%',
            '--bottom': '',
            '--offset': `${this.offset + "px"} 0px 0px 0px`,
            '--translate': `translate(-${this.shift}%)`,
            '--baseColor': this.color,
            '--colorT': 'transparent',
            '--colorR': 'transparent',
            '--colorB': this.color,
            '--colorL': 'transparent',
            '--arrowT': '',
            '--arrowR': '',
            '--arrowB': '100%',
            '--arrowL': this.shift !== '-50' ? this.shift + "%" : '-50%',
            '--translateArrow': 'translate(-50%)',
            '--animation_hide': 'bottom-hide',
            '--animation_show': 'bottom-show'
          }
        }
        if (this.position == 'left') {
          return {
            '--top': '50%',
            '--right': '100%',
            '--left': '',
            '--bottom': '',
            '--offset': `0px ${this.offset + "px"} 0px 0px`,
            '--translate': `translate(0, -${this.shift}%)`,
            '--baseColor': this.color,
            '--colorT': 'transparent',
            '--colorR': 'transparent',
            '--colorB': 'transparent',
            '--colorL': this.color,
            '--arrowT': this.shift !== '-50' ? this.shift + "%" : '-50%',
            '--arrowR': '',
            '--arrowB': '',
            '--arrowL': '100%',
            '--translateArrow': 'translate(0, -50%)',
            '--animation_hide': 'left-hide',
            '--animation_show': 'left-show'
          }
        }
        return true;
      }
    },
  }
</script>

<style lang="scss">

  // Base
  .tooltip-me {
    position: absolute;
    pointer-events: none;
    z-index: 999;
    background-color: var(--baseColor);
  }

  // Arrow
  .tooltip-me::after {
    content: ' ';
    width: 0px;
    height: 0px;
    border-top: 10px solid var(--colorT);
    border-left: 10px solid var(--colorL);
    border-bottom:10px solid var(--colorB);
    border-right: 10px solid var(--colorR);
    position: absolute;
    top: var(--arrowT);
    right: var(--arrowR);
    bottom: var(--arrowB);
    left: var(--arrowL);
    transform: var(--translateArrow);
  }

  // Positioning
  .tooltip-me-position {
    top: var(--top);
    left: var(--left);
    right: var(--right);
    bottom: var(--bottom);
    margin: var(--offset);
    transform: var(--translate);
  }

  // Animation Control
  .tooltip-me-off {
    visibility: hidden;
  }
  .tooltip-me-hide {
    animation: var(--animation_hide);
    animation-duration: 700ms;
  }
  .tooltip-me-show {
    animation: var(--animation_show);
    animation-duration: 700ms;
  }

  // Animation for Top
  @keyframes top-show {
    // delay
    0%  { visibility: hidden; opacity: 0; }
    50% { visibility: hidden; opacity: 0; }
    50.1% {
      visibility: hidden;
      opacity: 0;
      bottom: calc(var(--bottom) - 25%);
    }
    100% { 
      visibility: visible;
      opacity: 1;
      bottom: var(--bottom)
    }
  }

  @keyframes top-hide {
    // delay
    0%  { visibility: visible; opacity: 1; }
    50% { visibility: visible; opacity: 1; }
    50.1% { 
      visibility: visible;
      opacity: 1;
      bottom: var(--bottom);
    }
    100% { 
      visibility: hidden;
      opacity: 0;
      bottom: calc(var(--bottom) - 25%);
    }
  }

  // Animation for Bottom
  @keyframes bottom-show {
    // delay
    0%  { visibility: hidden; opacity: 0; }
    50% { visibility: hidden; opacity: 0; }
    50.1% { 
      visibility: hidden;
      opacity: 0;
      top: calc(var(--top) - 25%);
    }
    100% { 
      visibility: visible;
      opacity: 1;
      top: var(--top)
    }
  }

  @keyframes bottom-hide {
    // delay
    0%  { visibility: visible; opacity: 1; }
    50% { visibility: visible; opacity: 1; }
    50.1% { 
      visibility: visible;
      opacity: 1;
      top: var(--top);
    }
    100% { 
      visibility: hidden;
      opacity: 0;
      top: calc(var(--top) - 25%);
    }
  }

  // Animation for Left
  @keyframes left-show {
    // delay
    0%  { visibility: hidden; opacity: 0; }
    50% { visibility: hidden; opacity: 0; }
    50.1% { 
      visibility: hidden;
      opacity: 0;
      right: calc(var(--right) - 25%);
    }
    100% { 
      visibility: visible;
      opacity: 1;
      right: var(--right)
    }
  }

  @keyframes left-hide {
    // delay
    0%  { visibility: visible; opacity: 1; }
    50% { visibility: visible; opacity: 1; }
    50.1% { 
      visibility: visible;
      opacity: 1;
      right: var(--right);
    }
    100% { 
      visibility: hidden;
      opacity: 0;
      right: calc(var(--right) - 25%);
    }
  }

  // Animation for Right
  @keyframes right-show {
    // delay
    0%  { visibility: hidden; opacity: 0; }
    50% { visibility: hidden; opacity: 0; }
    50.1% { 
      visibility: hidden;
      opacity: 0;
      left: calc(var(--left) - 25%);
    }
    100% { 
      visibility: visible;
      opacity: 1;
      left: var(--left)
    }
  }

  @keyframes right-hide {
    // delay
    0%  { visibility: visible; opacity: 1; }
    50% { visibility: visible; opacity: 1; }
    50.1% { 
      visibility: visible;
      opacity: 1;
      left: var(--left);
    }
    100% { 
      visibility: hidden;
      opacity: 0;
      left: calc(var(--left) - 25%);
    }
  }
</style>