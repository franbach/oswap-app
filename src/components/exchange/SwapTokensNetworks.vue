<template>
  <div>
    <div @click="toggle()" class="flex items-center cursor-pointer px-3 space-x-3 h-10 w-full dark:bg-oswapDark-gray bg-opacity-50 bg-gray-300 rounded-lg">
      <img :src="network.icon" alt="" class="h-6">
      <p class="dark:text-gray-400">
        {{network.name}}
      </p>
    </div>
    <SwapTokensList :opened="open" :network="network" />
  </div>
</template>

<script>
  import SwapTokensList from '@/components/exchange/SwapTokensList'

  export default {
    name: "SwapTokensNetworks",
    props: {
      network: Object,
      index: Number,
      open: Boolean,
    },
    components: {
      SwapTokensList
    },
    methods: {
      toggle() {
        this.$emit('toggle', this.index)
      },
    }

  }
</script>