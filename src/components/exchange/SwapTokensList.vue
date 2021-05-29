<template>
  <div v-show="opened" class="flex space-x-3 text-gray-500 py-4 px-1">
    <div v-for="(token, index) in network.assets" :key="index" >
      <div @click="setTokens(network.name, token.ticker)" class="flex flex-col space-y-2 cursor-pointer justify-center dark:hover:bg-oswapDark-gray hover:bg-gray-300 bg-opacity-50 p-2 rounded-lg">
        <div class="flex justify-center">
          <img :src="token.icon" alt="" class="h-8">
        </div>
        <p class="text-oswapBlue-light">{{token.ticker}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SwapTokensList',
    props: {
      opened: Boolean,
      network: Object
    },
    methods: {
      setTokens(network, token) {   
      }
    }

  }
</script>