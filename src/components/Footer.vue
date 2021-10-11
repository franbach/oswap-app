<template>
  <footer class="relative max-w-screen-xl mx-auto text-gray-500 ss:justify-end sm:justify-center items-center flex h-24 p-3 py-8 xl:px-0 px-3">
    <div class="absolute xl:left-0 left-3 flex items-center ss:pt-4 ns:pt-0">
      <ColorMode />
    </div>
    <div class="absolute left-28 flex items-center ss:pt-4 ns:pt-0">
      <WalletMode />
    </div>
    <div class="flex flex-col ss:items-end sm:items-center ss:pt-4 ns:pt-0 ss:space-y-1 xs:space-y-2">
      <h1 class="ss:text-ns xs:text-sm dark:text-oswapGreen">{{ $route.name }} v2.2.0</h1>
      <div class="flex ss:space-x-1 sm:space-x-3 ss:text-xs xs:text-xl">
        <a href="https://twitter.com/OpenSwap_one">
          <i class="lab la-twitter hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
        <a href="https://t.me/OpenSwap_Harmony">
          <i class="lab la-telegram hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:.text-oswapGreen-light"></i>
        </a>
        <a href="https://www.reddit.com/r/OpenSwap_Harmony/">
          <i class="lab la-reddit hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
        </a>
        <a href="https://discord.gg/hznnXUxert">
          <i class="lab la-discord hover:text-oswapGreen-dark dark:text-oswapGreen dark:hover:text-oswapGreen-light"></i>
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
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  }
</script>