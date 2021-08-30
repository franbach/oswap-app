<template>  
  <div
    class="relative w-20 h-8 flex items-center bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent rounded-full p-1 duration-300 cursor-pointer"
    :class="{ '' : !getDarkMode }"
    :aria-checked="!getDarkMode.toString()"
    @click="this.switchTheme()"
  >
    <transition name="fade-in" appear>
      <p v-if="!getDarkMode" class="absolute center-y-component left-3 dark:text-gray-400 font-extralight text-sm">Light</p>
    </transition>
    <transition name="fade-in" appear>
      <p v-if="getDarkMode" class="absolute center-y-component right-3 dark:text-gray-400 font-extralight text-sm">Dark</p>
    </transition>
    <div
      class="flex bg-gray-50 dark:bg-oswapGreen w-6 h-6 items-center justify-center rounded-full shadow-md transform duration-300"
      :class="{ 'translate-x-12' : !getDarkMode }"
    > 
      <transition name="fade-in-and-rotate" appear>
        <i class="las la-sun text-lg text-gray-300 dark:text-gray-700"></i>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ColorMode',
    computed: {
      ...mapGetters('user', ['getDarkMode'])
    },
    methods: {
      ...mapActions('user', ['switchTheme']),
    }
  }
</script>