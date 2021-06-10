<template>
  <div class="flex flex-col mt-3 rounded-xl">
    <div class="flex items-center space-x-3">
      <div class="relative flex flex-1 items-center">
        <input type="text" v-model="amount" @input="inputValid()" class="flex flex-1 ring-1 bg-gray-100 focus:outline-none text-oswapGreen focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount...">
        <p class="text-xs right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2 text-oswapGreen-dark">{{this.getToken()['token1'].Symbol}}</p>
      </div>
      <div class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 space-x-2">
        <i class="las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
    <div class="flex items-center space-x-1 px-1 pt-2">
      <p class="text-xs dark:text-gray-300">1</p>
      <p class="text-xs text-oswapGreen">{{this.getToken()['token1'].Symbol}}</p>
      <p class="text-xs dark:text-gray-300">=</p>
      <p class="text-xs dark:text-gray-300">2.234441</p>
      <p class="text-xs text-oswapGreen">{{this.getToken()['token2'].Symbol}}</p>
    </div>
  </div>
</template>

<script>
  import { toastMe } from '@/components/toaster/toaster.js'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperAmount',
    components: {},
    data() {
      return {
        amount: ''
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),

      // Just for testing the component Toaster
      inputValid() {
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = '0x5152b185a39c7d454910266d0ab7db10c892a762665151aa952e922367101bf3'

        if (this.amount == 'test') {
          toastMe('success', {
            title: 'Transaction ID',
            msg: transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
    }
  }
</script>