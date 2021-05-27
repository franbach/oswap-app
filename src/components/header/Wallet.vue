<template>
  <div id="walletState">
    <!-- Wallet disconnected state styling -->
    <div v-show="connected === false" class="flex w-44 items-center text-gray-500 space-x-1 pr-2 p-1 rounded-lg bg-gray-50 bg-opacity-20 hover:bg-opacity-50 cursor-pointer shadow ring-2 ring-black ring-opacity-5">
      <div class="flex items-center p-1 bg-gray-200 rounded-md">
        <i class="las la-wallet text-xl"></i>
      </div>
      <div class="flex w-full items-center p-1 text-sm justify-center">
        <p>
          Connect Wallet
        </p>
      </div>
    </div>

    <!-- Wallet connected state styling -->
    <div v-show="connected" class="flex w-44 items-center space-x-1 pr-2 p-1 rounded-lg bg-opacity-20 hover:bg-opacity-50 cursor-pointer border shadow-lg ring-2 ring-oswapGreen ring-opacity-20">
      <div class="flex items-center p-1 bg-oswapGreen rounded-md">
        <i class="las la-wallet text-xl text-white"></i>
      </div>
      <div class="flex w-full items-center p-1 text-sm justify-center">
        <p>
          Wallet Connected
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Wallet',
  props: {
    connected: Boolean,
  }
}
</script>