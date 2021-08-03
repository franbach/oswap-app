<template>
  <footer class="relative max-w-screen-xl space-y-1 mx-auto text-gray-500 justify-center items-end md:items-center flex flex-col h-14 p-3 py-8 xl:px-0 px-3 bg-gray-200 dark:bg-oswapDark-gray">
    <div class="absolute xl:left-0 left-3 flex items-center space-x-1">
      <i @click="setColorMode()" class="las la-lightbulb text-2xl dark:hover:text-oswapGreen dark:text-gray-500 text-oswapGreen cursor-pointer"></i>
      <p class="text-sm dark:text-oswapGreen">{{colorMode}}</p>
    </div>
    <h1 class="text-sm dark:text-oswapGreen pr-3 md:pr-0">OpenSwap Exchange</h1>
    <div class="flex items-center space-x-3 pr-3 md:pr-0">
      <a href="">
        <i class="lab la-twitter text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
      </a>
      <a href="">
        <i class="lab la-telegram text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
      </a>
      <a href="">
        <i class="lab la-instagram text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
      </a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      colorMode: String
    },
    methods: {
      setColorMode() {
        this.$emit('dark-mode');
      }
    }
  }
</script>