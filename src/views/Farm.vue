<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex justify-center xl:px-0 px-3 text-gray-500">
    <Collect></Collect>
  </div>
</template>

<script>

  import Collect from '@/components/farm/collect/Collect'

export default {
  name: 'Farm',
  components: {
    Collect,
  },
  data() {
      return {
      }
  }
}
</script>