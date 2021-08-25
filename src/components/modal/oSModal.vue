<template>
  <transition name="fade-in" appear>
    <div v-if="show" @click="closeClickOutside()" class="fixed w-screen h-screen inset-0 z-150 bg-slightDark bg-opacity-40">
      <div @mouseenter="setBackLeave()" @mouseleave="setBackEnter()" :class="position" class="flex flex-1 flex-col rounded-3xl shadow-2xl bg-gray-100 dark:bg-slightDark border-l border-oswapGreen" style="min-width: 320px; min-height: 160px;">
        <!-- Header -->
        <div class="flex items-center justify-between h-12 px-3 text-gray-500 dark:text-gray-200">
          <!-- Title -->
          <div class="flex text-sm pl-1">
            {{title}}
          </div>
          <!-- Close Icon -->
          <button @click="close()" class="flex text-lg pr-1">
            <i class="las la-times hover:text-oswapGreen"></i>
          </button>
        </div>
        <!-- Body -->
        <div class="flex flex-1 text-gray-500 dark:text-gray-200">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'oSModal',
    props: {
      name: String,
      title: String,
      position: String
    },
    data() {
      return {
        show: false,
        overBack: true
      }
    },
    created() {
      window.addEventListener('keyup', this.doCommand);
    },
    mounted() {
      window.addEventListener("oSShow", (event) => {
        if (event.detail.name == this.name) {
          this.show = true;
        }
      });
      window.addEventListener("oSClose", (event) => {
        if (event.detail.name == this.name) {
          this.show = false;
          this.overBack = false;
        }
      });
    },
    unmounted() {
      window.removeEventListener('oSShow', window);
      window.removeEventListener('oSClose', window);
      window.removeEventListener('keyup', this.doCommand);
    },
    methods: {
      close() {
        this.show = false
        this.overBack = true
      },
      closeClickOutside() {
        if (this.overBack) {
          this.close()
        }
      },
      setBackLeave() {
        this.overBack = false
      },
      setBackEnter() {
        this.overBack = true
      },
      doCommand(e) {
        if (e.code == 'Escape' && this.show) {
          this.show = false
          this.overBack = true
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .top-left {
    position: absolute;
    top: 80px;
    left: 80px;
  }
  .top-center {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  .top-right {
    position: absolute;
    top: 80px;
    right: 80px;
  }
  .left-center {
    position: absolute;
    top: 50%;
    left: 80px;
    transform: translate(0%, -50%);
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .right-center {
    position: absolute;
    top: 50%;
    right: 80px;
    transform: translate(0%, -50%);
  }
  .left-bottom {
    position: absolute;
    bottom: 80px;
    left: 80px;
  }
  .bottom-center {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  .right-bottom {
    position: absolute;
    bottom: 80px;
    right: 80px;
  }
</style>