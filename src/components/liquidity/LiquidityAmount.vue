<template>
  <div class="flex flex-col flex-1 space-y-3">
    <div class="flex flex-1 space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="text-xs z-30 right-1 absolute bg-gray-200 dark:bg-gray-600 rounded-lg p-2">{{tokenInfo}}</p>
      </InputWithValidation>
      <div @click="setMax()" class="flex items-center bg-oswapGreen dark:bg-oswapGreen-dark hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen cursor-pointer p-3 rounded-xl text-gray-50 space-x-2">
        <i class="las la-wallet"></i>
        <p class="text-xs">MAX</p>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithValidation from '@/components/InputWithValidation';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'LiquidityAmount',
    components: {
      InputWithValidation
    },
    props: {
      tokenInfo: String
    },
    data() {
      return {
        amount: '0.0',
        errors: {}
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('liquidity/buttons', ['setBtnState']),

      inputAmount(value){
        // testing purposes
        if (value == '1') {
          this.setBtnState({approve: 'approve'})
        }
        if (value == '12') {
          this.setBtnState({approve: 'approving'})
        }
        if (value == '123') {
          this.setBtnState({approve: 'approved'})
        }
        if (value == '1234') {
          this.setBtnState({add: 'add'})
        }
        if (value == '12345') {
          this.setBtnState({add: 'adding'})
        }
        if (value == '123456') {
          this.setBtnState({add: 'added'})
        }
        if (value == '1234567') {
          this.setBtnState({remove: 'remove'})
        }
        if (value == '12345678') {
          this.setBtnState({remove: 'removing'})
        }
        if (value == '123456789') {
          this.setBtnState({remove: 'removed'})
        }
        /*
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
          this.$emit("amount", value);
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
        } else {
          delete this.errors['blank']
          this.$emit("amount", value);
        }
        if (parseFloat(value) > parseFloat(this.balance)) {
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
          this.$emit("amount", value);
        }
        */
      },

      setMax() {}
    }
  }
</script>