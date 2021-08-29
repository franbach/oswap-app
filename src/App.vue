<template>
  <div id="root" :class="darkmode ? 'dark' : ''" class="antialiased pt-18">
    <div id="header" :class="scrolled ? 'shadow-xl' : ''" class="flex flex-1 fixed inset-x-0 top-0 st5 bg-gradient-to-r dark:from-oswapDark-gray dark:to-slightDark from-gray-300 to-slightGray z-50">
      <Header />
    </div>

    <div id="body" class="flex w-full oswap-layout z-20 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <router-view />
    </div>

    <div id="footer" class="w-full h-full z-40 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <Footer @dark-mode="changeColor()" @walletMode="changeWallet()" :walletMode="this.walletmode" :colorMode="this.darkmode" />
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
      scrolled: false,
      darkmode: false,
      walletmode: false //false == metamask
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    const theme = localStorage.getItem("dark\_theme");
    const mode = localStorage.getItem("walletmode");
    if(mode){
      if(mode == "false"){
        this.walletmode = true

      }else
      this.walletmode = false
    }
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
    changeWallet(){
      this.walletmode = !this.walletmode
      localStorage.setItem("walletmode", this.walletmode.toString());
      console.log('this')

    },
    handleScroll () {
      this.scrolled = window.scrollY > 0;
    }
  },
};
</script>