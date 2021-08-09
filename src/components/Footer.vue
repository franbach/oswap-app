<template>
  <footer class="relative max-w-screen-xl mx-auto text-gray-500 ss:justify-end xs:justify-center items-center flex h-24 p-3 py-8 xl:px-0 px-3">
    <ColorMode @dark-mode="setColorMode()" :value="colorMode" />
    <div class="flex flex-col items-center space-y-2">
      <h1 class="text-sm dark:text-oswapGreen">{{ $route.name }}</h1>
      <div class="flex items-center space-x-3">
        <a href="https://twitter.com/open_fi">
          <i class="lab la-twitter text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
        <a href="https://t.me/OpenSwap_Harmony">
          <i class="lab la-telegram text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
        <a href="https://www.reddit.com/r/OpenSwap_Harmony/">
          <i class="lab la-reddit text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
        <a href="https://discord.gg/hznnXUxert">
          <i class="lab la-discord text-xl hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
  import ColorMode from '@/components/ColorMode';

  export default {
    name: 'Footer',
    components: {
      ColorMode
    },
    props: {
      colorMode: Boolean
    },
    methods: {
      setColorMode() {
        this.$emit('dark-mode');
      }
    },
    computed: {
    currentRouteName() {
        return this.$route.name;
    }
}
  }
</script>