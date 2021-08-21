<template>
  <div class="flex flex-col st5-all p-4 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-pallet text-xl dark:text-gray-200"></i>
      <p class="text-sm dark:text-gray-200">Bridge</p>
    </div>
    <div class="flex flex-col space-y-3">
      <BridgeNetworkSelect  v-if="(this.getToken()['token1'])" :token="this.getToken()['token1']" />

      <BridgeTokenSelect @click="selectToken('token1')" whichToken="token1" />
      <div class="flex flex-1 items-center space-x-3">
        <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-10">{{tokenSymbol}}</p>
        </InputWithValidation>

        <div class="flex flex-1 items-center justify-end group-scope">
          <div @click="setMax()" class="flex h-10 items-center group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer px-3 rounded-xl space-x-2">
            <i class="las la-wallet text-xl dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100"></i>
            <p class="dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
          </div>
        </div>
      </div>
      <div class="flex w-full pl-2">
        <p class="text-xs dark:text-gray-400">Available: {{balance}}</p>
      </div>
      <div class="flex items-center justify-between">
        <!-- Active buttons if tokens selected -->
        <div v-if="(this.getToken()['token1'])" class="flex flex-1 items-center">
          <!-- Reset Tokens Button -->
          <div @click="this.resetSelection()" class="flex items-center pr-4 rounded-full hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer">
            <i class="las la-undo-alt text-lg p-2 text-red-400 rounded-full"></i>
            <p class="text-sm text-gray-500 dark:text-oswapBlue-light">reset</p>
          </div>
        </div>

        <!-- Disables buttons if tokens not selected -->
        <div v-else class="flex flex-1 items-center cursor-default select-none">
          <!-- Reset Tokens Button -->
          <div class="flex items-center pr-4 rounded-full bg-opacity-100">
            <i class="las la-undo-alt text-lg p-2 rounded-full text-gray-300 dark:text-gray-600"></i>
            <p class="text-sm text-gray-300 dark:text-gray-600">reset</p>
          </div>
        </div>

        <div class="flex h-full w-28 relative">
          <BridgeButton :token="this.getToken()['token1']" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import BridgeNetworkSelect from '@/components/bridge/BridgeNetworkSelect';
  import BridgeTokenSelect from '@/components/bridge/BridgeTokenSelect';
  import BridgeButton from '@/components/bridge/BridgeButton';
  import InputWithValidation from '@/components/InputWithValidation';
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Bridge',
    mixins: [openswap],
    components: {
      BridgeNetworkSelect,
      BridgeTokenSelect,
      BridgeButton,
      InputWithValidation
    },
    data() {
      return {
        amount: '0.0',
        balance: 0,
        errors: {},
        tokenSymbol: ' ? ',
        token: null
      }
    },
    mounted: async function() {
      if (this.getToken()['token1'] != undefined) {
        this.token = this.getToken()['token1']
        this.getTokenBalance()
      }
    },
    methods: {
      ...mapGetters('migrate', ['getToken']),
      ...mapActions('migrate', ['resetTokens']),

      selectToken(token) {
        this.$emit('triggerModal', token)
      },

      resetSelection() {
        this.resetTokens();
        this.tokenSymbol = ' ? '
      },

      getTokenBalance: async function(){
        if (this.getToken()['token1'].bscAddress != undefined) {
          console.log("bsc token")
          this.tokenSymbol = this.getToken()['token1'].Symbol
          this.balance = await this.getBSCTokenBalance(this.getToken()['token1'])
        }
        if (this.getToken()['token1'].ethAddress != undefined) {
          console.log("eth token")
          this.tokenSymbol = this.getToken()['token1'].Symbol
          this.balance = await this.getETHTokenBalance(this.getToken()['token1'])
        }
      },

      setMax(){
        this.amount = this.balance
      }
    }
  }
</script>