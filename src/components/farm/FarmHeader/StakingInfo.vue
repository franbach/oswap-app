<template>
  <div class="flex flex-col w-full">
  
    <div class="flex space-x-2 items-center mb-6">
      <i class="las la-layer-group text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">OpenSwap Validators :</p>
    </div>

    <div class="grid grid-cols-1 gap-3 min-w-0 w-full text-gray-600 dark:text-gray-300">
      <div class="flex flex-col w-full rounded-3xl dark:bg-slightDark bg-slightGray p-3">
        <p v-if="validator" class="text-sm text-el">{{validator.oneHundred.totalDelegated}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import { ethers } from 'ethers';


  export default {
    name: 'StakingInfo',
    data() {
      return {
        validator: null
      }
    },
    async mounted() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "hmyv2_getValidatorInformation",
          "params": [
              "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"   
          ]
        }),
      };

      const response = await fetch("https://rpc.s0.t.hmny.io", requestOptions);
      const data = await response.json();

      let number = data.result['total-delegation'].toLocaleString('fullwide', { useGrouping: false }).replace(/0+$/, '').slice(0, 7)

      console.log("THIS IS THE RESULT ----------------> ", new Intl.NumberFormat().format(number));

      this.validator = {
        oneHundred: {
          totalDelegated: data.result['total-delegation']
        },
        twentyFive: {

        }
      }
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>