<template>
  <div class="relative">
    <div @click="toggleCustomRate" :class="checkCustom ? 'border-l-2 border-oswapGreen' : 'hover:bg-gray-50 dark:hover:bg-gray-500'" class="flex items-center justify-center cursor-pointer w-8 h-6 relative hover:bg-gray-50 dark:hover:bg-gray-500 dark:text-gray-300 dark:bg-slightDark bg-slightGray rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20 st5">
      <i class="las la-sliders-h text-lg absolute dark:text-gray-300"></i>
    </div>
    
    <div @click="toggleCustomRate" v-if="isOpen" class="fixed inset-0 z-50"></div>

    <transition
      enter-active-class="transform transition duration-200 ease-out"
      enter-from-class="-translate-y-3 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div class="absolute z-50 w-48 mt-2 right-0" v-if="isOpen">
        <div class="relative flex flex-col space-y-2 py-2 st5 border-l-2 border-oswapGreen shadow-lg rounded-lg p-1 px-2 bg-gray-100 dark:bg-gray-600">
          <div class="flex items-center space-x-2">
            <p class="dark:text-gray-300">Custom Rate</p>
          </div>
          <InputWithValidation @keyup.enter="toggleCustomRate" :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-lg'" :placeholder="'%'" :errorTop="'pt-8'">
            <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-md p-1 px-2">%</p>
          </InputWithValidation>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import InputWithValidation from '@/components/InputWithValidation'

  export default {
    name: 'SwapperRateCustom',
    components: {
      InputWithValidation,
    },
    props: {
      picked: String
    },
    data() {
      return {
        amount: "",
        errors: {},
        isOpen: false,
        tooltip: {
          name: 'slippage',
          position: 'top',
          color: '#f3f3f3',
          shift: 50,
          offset: 16,
          travel: 50,
          speed: 300
        },
      }
    },
    created() {
      window.addEventListener('keyup', this.doCommand);
    },
    unmounted() {
      window.removeEventListener('keyup', this.doCommand);
    },
    computed: {
      checkCustom() {
        if (this.picked != '' && this.picked != '0.1' && this.picked != '0.3' && this.picked != '0.5') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      doCommand(e) {
        if (e.code == 'Escape' && this.isOpen) {
          this.isOpen = !this.isOpen
        }
      },
      toggleCustomRate() {
        this.isOpen = !this.isOpen
        this.errors = {}
      },
      inputAmount(value){
        if (value == "") {
          this.errors['empty'] = 'Cannot be empty.';
        } else {
          delete this.errors['empty'];
          this.$emit('selectRate', value)
        }
        if (parseFloat(value) < 0.1) {
          this.errors['low'] = 'Too low!';
        } else {
          delete this.errors['low'];
          this.$emit('selectRate', value)
        }
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 0.75';
        } else {
          delete this.errors['format'];
          this.$emit('selectRate', value)
        }
        if (parseFloat(value) > 5) {
          this.errors['high'] = 'Be carefull with high values!';
        } else {
          delete this.errors['high'];
          this.$emit('selectRate', value)
        }
      }
    }
  }
</script>