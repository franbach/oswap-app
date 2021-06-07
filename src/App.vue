<template>
  <div id="root" :class="darkmode ? 'dark' : ''" class="antialiased flex flex-col h-screen bg-gray-200">
    <div id="header" class="w-full dark:bg-oswapDark-gray">
      <Header />
    </div>
    
    <div id="body" class="w-full h-full dark:bg-oswapDark-gray">
      <router-view/>
    </div>

    <div id="footer" class="w-full dark:bg-oswapDark-gray">
      <Footer @dark-mode="changeColor()" :colorMode="darkmode ? 'Dark Mode' : 'Light Mode'"/>
    </div>
  </div>
</template>

<script>

  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  export default {
    name: 'OpenSwap',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        darkmode: false,
      }
    },
    methods: {
      changeColor() {
        this.darkmode = !this.darkmode
      }
    }
  }
</script>