<template>
  <div id="root" :class="darkmode ? 'dark' : ''" class="antialiased pt-18">
    <div
      id="header"
      class="flex flex-1 fixed inset-x-0 top-0 dark:bg-oswapDark-gray bg-gray-200 z-50"
    >
      <Header />
    </div>

    <div
      id="body"
      class="flex w-full oswap-layout dark:bg-oswapDark-gray bg-gray-200 z-20"
    >
      <router-view />
    </div>

    <div id="footer" class="w-full dark:bg-oswapDark-gray bg-gray-200 z-30">
      <Footer
        @dark-mode="changeColor()"
        :colorMode="darkmode ? 'Dark Mode' : 'Light Mode'"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'OpenSwap',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      darkmode: false,
    };
  },
  methods: {
    changeColor() {
      this.darkmode = !this.darkmode;
      if (this.darkmode) {
        document.body.classList.remove('bg-gray-200');
        document.body.classList.add('bg-oswapDark-gray');
      } else {
        document.body.classList.add('bg-gray-200');
      }
    },
  },
};
</script>

<style lang="scss">
.oswap-layout {
  /* viewport height - header - footer */
  min-height: calc(100vh - 72px - 64px);
}
</style>
