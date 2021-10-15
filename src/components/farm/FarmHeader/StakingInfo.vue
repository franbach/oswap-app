<template>
  <div class="flex flex-col w-full">
  
    <div class="flex space-x-2 items-center mb-6">
      <i class="las la-layer-group text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">OpenSwap Validators :</p>
    </div>

    <div class="grid grid-cols-1 gap-3 min-w-0 w-full text-gray-600 dark:text-gray-300">
      <router-link to="/validator/one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0" v-if="validator" class="flex flex-col w-full st5 rounded-2xl bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray py-3 px-4">
        <p class="text-sm mb-2">{{validator.oneHundred.name}}</p>
        <div class="flex space-x-3">
          <!-- total staked -->
          <div class="flex items-center space-x-2">
            <i class="las la-layer-group text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Total Staked:</p>
              <p class="text-sm text-el">{{validator.oneHundred.totalDelegated}}</p>
            </div>
          </div>
          <!-- expected return -->
          <div class="flex items-center space-x-2">
            <i class="las la-percent text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Expected Return:</p>
              <p class="text-sm text-el">{{validator.oneHundred.apr}}%</p>
            </div>
          </div>
        </div>
      </router-link>
      <router-link to="/validator/one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2" v-if="validator" class="flex flex-col w-full st5 rounded-2xl bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray py-3 px-4">
        <p class="text-sm mb-2">{{validator.fifteen.name}}</p>
        <div class="flex space-x-3">
          <!-- total staked -->
          <div class="flex items-center space-x-2">
            <i class="las la-layer-group text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Total Staked:</p>
              <p class="text-sm text-el">{{validator.fifteen.totalDelegated}}</p>
            </div>
          </div>
          <!-- expected return -->
          <div class="flex items-center space-x-2">
            <i class="las la-percent text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Expected Return:</p>
              <p class="text-sm text-el">{{validator.fifteen.apr}}%</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { ethers } from 'ethers';

  export default {
    name: 'StakingInfo',
    mixins: [openswap],
    data() {
      return {
        validator: null
      }
    },
    async mounted() {
      const requestOptions = (addr) => {
        return {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "hmyv2_getValidatorInformation",
            "params": [
                addr   
            ]
          }),
        }
      };

      // 15% node
      // one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2
      // 100% node
      // "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"

      const response100 = await fetch("https://rpc.s0.t.hmny.io", requestOptions("one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"));
      const data100 = await response100.json();

      const response15 = await fetch("https://rpc.s0.t.hmny.io", requestOptions("one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2"));
      const data15 = await response15.json();

      this.validator = {
        oneHundred: {
          name: data100.result.validator.name,
          totalDelegated: this.formatToMillion(data100.result['total-delegation']),
          apr: (data100.result.lifetime.apr * 100).toFixed(2)
        },
        fifteen: {
          name: data15.result.validator.name,
          totalDelegated: this.formatToBillion(data15.result['total-delegation']),
          apr: (data15.result.lifetime.apr * 100).toFixed(2)
        }
      }
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      },
      formatToMillion(string) {
        let parsed = string.toLocaleString('fullwide', { useGrouping: false }).replace(/0+$/, '');
        return ethers.utils.commify(parsed)
                           .match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
      },
      formatToBillion(string) {
        let parsed = string.toLocaleString('fullwide', { useGrouping: false }).replace(/0+$/, '');
        return ethers.utils.commify(parsed)
                           .match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>