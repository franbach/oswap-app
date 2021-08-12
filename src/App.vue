<template>
  <div id="root" :class="darkmode ? 'dark bg-wave-dark' : 'bg-wave'" class="antialiased pt-18 bg-no-repeat bg-bottom">
    <div id="header" class="flex flex-1 fixed inset-x-0 top-0 dark:bg-oswapDark-gray bg-gray-200 z-50">
      <Header />
    </div>

    <div id="body" class="flex w-full oswap-layout z-20">
      <router-view />
    </div>

    <div id="footer" class="w-full h-full z-40">
      <Footer @dark-mode="changeColor()" :colorMode="this.darkmode" />
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
  mounted() {
    const theme = localStorage.getItem("dark\_theme");
    if (theme) {
        if (theme == "true") {
            document.body.classList.remove('bg-gray-200');
            document.body.classList.add('bg-oswapDark-gray');
            this.darkmode = true;
        } else {
            this.darkmode = false;
        }
    }
  },
  methods: {
    changeColor() {
      this.darkmode = !this.darkmode;
      localStorage.setItem("dark\_theme", this.darkmode.toString());
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
