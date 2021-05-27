<template>
  <div id="root" class="antialiased flex flex-col h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
    
    <div id="header" class="w-full">
      <Header />
    </div>
    
    <div id="body" class="w-full h-full">
      <router-view/>
    </div>

    <div id="footer" class="w-full">
      <Footer />
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
    }
  }
</script>