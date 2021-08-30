<template>  
  <div
    class="relative w-32 h-8 flex items-center bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent rounded-full p-1 duration-300 cursor-pointer"
    :class="{ '': getWalletType == 'metamask' }"
    :aria-checked="(getWalletType == 'metamask').toString()"
    @click="switchWalletType"
  >
    <transition name="fade-in" appear>
      <p v-if="getWalletType == 'metamask' " class="absolute center-y-component left-6 dark:text-gray-400 font-extralight text-sm">Harmony</p>
    </transition>
    <transition name="fade-in" appear>
      <p v-if="getWalletType == 'oneWallet' " class="absolute center-y-component right-4 dark:text-gray-400  font-extralight text-sm">Metamask</p>
    </transition>
    <div
      class="flex w-8 h-6 pl-3 items-center justify-center transform duration-300"
      :class="{ 'translate-x-20': getWalletType == 'metamask' }"
    >
      <transition name="fade-out-and-rotate" appear>
        <img v-if="getWalletType == 'metamask'" src="@/assets/Metamask.png" alt="" class="h-5">
      </transition>
      <transition name="fade-in-and-rotate" appear>
        <img v-if="getWalletType == 'oneWallet'" src="@/assets/Harmony.png" alt="" class="h-5">
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'walletMode',
    computed: {
      ...mapGetters('wallet', ['getWalletType'])
    },
    methods: {
      ...mapActions('wallet', ['switchWalletType']),
    }
  }
</script>