<template>
  <footer class="relative max-w-screen-xl mx-auto text-gray-500 ss:justify-end xs:justify-center items-center flex h-24 p-3 py-8 xl:px-0 px-3">
    <div class="absolute xl:left-0 left-3 flex items-center ss:pt-4 ns:pt-0">
      <ColorMode @dark-mode="setColorMode()" :value="colorMode" />
    </div>
    <div class="relative xl:left-0 left-3 flex items-center ss:pt-4 ns:pt-0">
      <WalletMode @walletMode="walletMode()" :value="walletMode" />
    </div>
    <div class="flex flex-col items-center ss:pt-4 ns:pt-0 space-y-2">
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
  import WalletMode from '@/components/walletMode';
  export default {
    name: 'Footer',
    components: {
      ColorMode,
      WalletMode
    },
    props: {
      colorMode: Boolean,
      walletMode: Boolean,
    },
    methods: {
      setColorMode() {
        this.$emit('dark-mode');
      },
      walletMode() {
        this.$emit('walletMode');
        console.log('sec')
      }
    },
    computed: {
    currentRouteName() {
        return this.$route.name;
    }
}
  }
</script>