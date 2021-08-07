<template>
  <footer class="relative max-w-screen-xl space-y-1 mx-auto text-gray-500 justify-center items-end md:items-center flex flex-col h-14 p-3 py-8 xl:px-0 px-3">
    <ColorMode @dark-mode="setColorMode()" :value="colorMode" />    
    <h1 class="text-xs text-gray-50 dark:text-oswapGreen pr-2 md:pr-0 ss:pt-6 xs:pt-0">{{ $route.name }}</h1>
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