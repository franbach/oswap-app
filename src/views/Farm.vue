<template>
  <div id="farm" class="max-w-screen-xl mx-auto xl:px-0 px-3 text-gray-500">
    <div class="flex justify-center p-4">
      <Collect></Collect>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="pool in Pools" :key="pool">
        <FarmPair :pool="pool" />
      </div>
    </div>
  </div>
</template>

<script>

import Collect from '@/components/farm/collect/Collect';
import FarmPair from '@/components/farm/FarmPair';
const { Pools } = require("@/store/modules/farm/pools.js")

export default {
  name: 'Farm',
  components: {
    Collect,
    FarmPair
  },
  mounted: async function () {
    this.Pools = Pools;
  },
  data() {
      return {
        Pools
      }
  }
}
</script>