<template>  
  <div
    class="relative w-20 h-8 flex items-center bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent rounded-full p-1 duration-300 cursor-pointer"
    :class="{ '': value }"
    :aria-checked="value.toString()"
    @click="toggle"
  >
    <p v-if="value" class="absolute center-y-component left-3 text-oswapGreen font-extralight text-sm">met</p>
    <p v-if="!value" class="absolute center-y-component right-3 font-extralight text-sm">one</p>
    <div
      class="flex bg-gray-50 dark:bg-oswapGreen w-6 h-6 items-center justify-center rounded-full shadow-md transform duration-300"
      :class="{ 'translate-x-12': value }"
    >
      <i class="las la-sun text-lg text-gray-300 dark:text-gray-700"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'walletMode',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      ...mapActions('wallet', ['setWalletType']),
      toggle() {
        this.$emit('walletMode')
        console.log('firs')
      }
    }
  }
</script>