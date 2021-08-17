<template>
  <div id="migrate" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">
    <transition name="horizontal" appear>
      <Bridge />
    </transition>
  </div>
</template>

<script>
  import Bridge from '@/components/bridge/Bridge';

  export default {
    name: 'Migrate',
    components: {
      Bridge
    }
  }
</script>