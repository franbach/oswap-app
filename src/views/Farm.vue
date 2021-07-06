<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center h-full xl:px-0 px-3 text-gray-500 pb-16">
    <transition name="fall" appear>
      <FarmHeader />
    </transition>
    <transition name="farm" appear>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <FarmPair v-for="(pool, index) in Pools" :key="index" :pool="pool" />
      </div>
    </transition>
  </div>
</template>

<script>
  import FarmHeader from "@/components/farm/FarmHeader"
  import FarmPair from '@/components/farm/FarmPair'

  const { Pools } = require("@/store/modules/farm/pools.js")

  export default {
    name: 'Farm',
    components: {
      FarmHeader,
      FarmPair
    },
    mounted: async function () {
      this.Pools = Pools;
    },
    data() {
      return {
        Pools
      }
    },
    methods: {}
  }
</script>