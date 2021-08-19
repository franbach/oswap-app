<template>
  <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 ss:w-80 xs:w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-pallet text-xl dark:text-gray-400"></i>
      <p class="text-sm dark:text-gray-400">Bridge</p>
    </div>
    <div class="flex flex-col space-y-3">
      <BridgeTokenSelect @click="selectToken('token1')" whichToken="token1" />
      <div class="flex items-center space-x-3">
        <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">ONE</p>
        </InputWithValidation>

        <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 xs:space-x-2">
          <i class="ss:hidden xs:block las la-wallet text-lg"></i>
          <p class="text-xs">MAX</p>
        </div>
      </div>
      <div class="flex w-full pl-2">
        <p class="text-xs dark:text-gray-400">Available: 218.702645 ONE</p>
      </div>
      <div class="flex">
        <!-- Active buttons if tokens selected -->
        <div v-if="true" class="flex flex-1 items-center justify-between">
          <!-- Reset Tokens Button -->
          <div @click="this.resetTokens()" class="flex items-center pr-4 rounded-full hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
            <i class="las la-undo-alt text-lg p-2 text-red-400 rounded-full"></i>
            <p class="text-sm text-gray-500 dark:text-oswapBlue-light">reset</p>
          </div>
          <div class="flex h-full w-28 relative">
            <BridgeButton :token="this.getToken()['token1']" />
          </div>
        </div>

        <!-- Disables buttons if tokens not selected -->
        <div v-else class="flex flex-1 items-center justify-between cursor-default select-none">
          <!-- Reset Tokens Button -->
          <div class="flex items-center pr-4 rounded-full bg-opacity-100">
            <i class="las la-undo-alt text-lg p-2 rounded-full text-gray-300 dark:text-gray-600"></i>
            <p class="text-sm text-gray-300 dark:text-gray-600">reset</p>
          </div>

          <!-- Move to the next phase button -->
          <div class="flex items-center space-x-2 rounded-full bg-opacity-100 pl-3">
            <p class="text-sm text-gray-300 dark:text-gray-600">next</p>
            <i class="las la-arrow-right text-lg p-2 text-gray-200 dark:text-gray-700 rounded-full bg-gray-300 dark:bg-gray-600"></i>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import BridgeTokenSelect from '@/components/bridge/BridgeTokenSelect';
  import BridgeButton from '@/components/bridge/BridgeButton';
  import InputWithValidation from '@/components/InputWithValidation';
  import { mapGetters } from 'vuex';
  export default {
    name: 'Bridge',
    components: {
      BridgeTokenSelect,
      BridgeButton,
      InputWithValidation
    },
    data() {
      return {
        amount: '0.0',
        errors: {}
      }
    },
    methods: {
      ...mapGetters('migrate', ['getToken']),
      selectToken(token) {
        this.$emit('triggerModal', token)
      }
    }
  }
</script>